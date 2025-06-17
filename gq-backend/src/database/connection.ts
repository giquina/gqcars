import { Pool, PoolClient } from 'pg';
import { config } from '../config';
import { logger } from '../utils/logger';

class DatabaseManager {
  private pool: Pool;
  private isConnected: boolean = false;

  constructor() {
    this.pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.pool.on('connect', () => {
      logger.info('New client connected to PostgreSQL database');
    });

    this.pool.on('error', (err) => {
      logger.error('PostgreSQL pool error:', err);
      this.isConnected = false;
    });

    this.pool.on('remove', () => {
      logger.info('Client removed from PostgreSQL pool');
    });
  }

  async connect(): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      this.isConnected = true;
      logger.info('Successfully connected to PostgreSQL database');
    } catch (error) {
      logger.error('Failed to connect to PostgreSQL database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      this.isConnected = false;
      logger.info('Disconnected from PostgreSQL database');
    } catch (error) {
      logger.error('Error disconnecting from PostgreSQL database:', error);
      throw error;
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    const client = await this.pool.connect();
    try {
      const start = Date.now();
      const result = await client.query(text, params);
      const duration = Date.now() - start;
      
      logger.debug('Database query executed', {
        query: text,
        duration: `${duration}ms`,
        rows: result.rowCount
      });

      return result;
    } catch (error) {
      logger.error('Database query error:', {
        query: text,
        params,
        error: error.message
      });
      throw error;
    } finally {
      client.release();
    }
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error('Transaction rolled back:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      logger.error('Database health check failed:', error);
      return false;
    }
  }

  getPool(): Pool {
    return this.pool;
  }

  isHealthy(): boolean {
    return this.isConnected;
  }
}

// Create and export singleton instance
export const database = new DatabaseManager();

// Export connection for direct access if needed
export { Pool, PoolClient } from 'pg';