import Redis from 'redis';
import { config } from '../config';
import { logger } from '../utils/logger';

class RedisManager {
  private client: Redis.RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = Redis.createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
      password: config.redis.password,
      socket: {
        reconnectStrategy: (retries) => {
          logger.warn(`Redis reconnection attempt #${retries}`);
          return Math.min(retries * 50, 500);
        }
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      logger.info('Redis client connected');
    });

    this.client.on('ready', () => {
      this.isConnected = true;
      logger.info('Redis client ready');
    });

    this.client.on('error', (err) => {
      logger.error('Redis error:', err);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      this.isConnected = false;
      logger.info('Redis connection ended');
    });

    this.client.on('reconnecting', () => {
      logger.info('Redis client reconnecting');
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      logger.info('Successfully connected to Redis');
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      this.isConnected = false;
      logger.info('Disconnected from Redis');
    } catch (error) {
      logger.error('Error disconnecting from Redis:', error);
      throw error;
    }
  }

  // Basic Key-Value Operations
  async set(key: string, value: string, expiryInSeconds?: number): Promise<void> {
    try {
      if (expiryInSeconds) {
        await this.client.setEx(key, expiryInSeconds, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error('Redis SET error:', { key, error });
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error('Redis GET error:', { key, error });
      throw error;
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      logger.error('Redis DEL error:', { key, error });
      throw error;
    }
  }

  async exists(key: string): Promise<number> {
    try {
      return await this.client.exists(key);
    } catch (error) {
      logger.error('Redis EXISTS error:', { key, error });
      throw error;
    }
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      return await this.client.expire(key, seconds);
    } catch (error) {
      logger.error('Redis EXPIRE error:', { key, seconds, error });
      throw error;
    }
  }

  // Hash Operations
  async hSet(key: string, field: string, value: string): Promise<number> {
    try {
      return await this.client.hSet(key, field, value);
    } catch (error) {
      logger.error('Redis HSET error:', { key, field, error });
      throw error;
    }
  }

  async hGet(key: string, field: string): Promise<string | undefined> {
    try {
      return await this.client.hGet(key, field);
    } catch (error) {
      logger.error('Redis HGET error:', { key, field, error });
      throw error;
    }
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    try {
      return await this.client.hGetAll(key);
    } catch (error) {
      logger.error('Redis HGETALL error:', { key, error });
      throw error;
    }
  }

  async hDel(key: string, field: string): Promise<number> {
    try {
      return await this.client.hDel(key, field);
    } catch (error) {
      logger.error('Redis HDEL error:', { key, field, error });
      throw error;
    }
  }

  // List Operations
  async lPush(key: string, value: string): Promise<number> {
    try {
      return await this.client.lPush(key, value);
    } catch (error) {
      logger.error('Redis LPUSH error:', { key, error });
      throw error;
    }
  }

  async rPop(key: string): Promise<string | null> {
    try {
      return await this.client.rPop(key);
    } catch (error) {
      logger.error('Redis RPOP error:', { key, error });
      throw error;
    }
  }

  async lRange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.client.lRange(key, start, stop);
    } catch (error) {
      logger.error('Redis LRANGE error:', { key, start, stop, error });
      throw error;
    }
  }

  // Set Operations
  async sAdd(key: string, member: string): Promise<number> {
    try {
      return await this.client.sAdd(key, member);
    } catch (error) {
      logger.error('Redis SADD error:', { key, member, error });
      throw error;
    }
  }

  async sMembers(key: string): Promise<string[]> {
    try {
      return await this.client.sMembers(key);
    } catch (error) {
      logger.error('Redis SMEMBERS error:', { key, error });
      throw error;
    }
  }

  async sRem(key: string, member: string): Promise<number> {
    try {
      return await this.client.sRem(key, member);
    } catch (error) {
      logger.error('Redis SREM error:', { key, member, error });
      throw error;
    }
  }

  // Session Management
  async setSession(sessionId: string, data: any, expiryInSeconds: number = 3600): Promise<void> {
    const sessionKey = `session:${sessionId}`;
    await this.set(sessionKey, JSON.stringify(data), expiryInSeconds);
  }

  async getSession(sessionId: string): Promise<any | null> {
    const sessionKey = `session:${sessionId}`;
    const data = await this.get(sessionKey);
    return data ? JSON.parse(data) : null;
  }

  async deleteSession(sessionId: string): Promise<number> {
    const sessionKey = `session:${sessionId}`;
    return await this.del(sessionKey);
  }

  // Caching helpers
  async cache(key: string, data: any, expiryInSeconds: number = 300): Promise<void> {
    await this.set(`cache:${key}`, JSON.stringify(data), expiryInSeconds);
  }

  async getCache(key: string): Promise<any | null> {
    const data = await this.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }

  async clearCache(pattern: string): Promise<number> {
    const keys = await this.client.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      return await this.client.del(keys);
    }
    return 0;
  }

  // Rate limiting
  async incrementCounter(key: string, windowInSeconds: number = 60): Promise<number> {
    const pipeline = this.client.multi();
    pipeline.incr(key);
    pipeline.expire(key, windowInSeconds);
    const results = await pipeline.exec();
    return results[0] as number;
  }

  // Real-time features support
  async publish(channel: string, message: any): Promise<number> {
    try {
      return await this.client.publish(channel, JSON.stringify(message));
    } catch (error) {
      logger.error('Redis PUBLISH error:', { channel, error });
      throw error;
    }
  }

  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    try {
      await this.client.subscribe(channel, (message) => {
        try {
          const parsedMessage = JSON.parse(message);
          callback(parsedMessage);
        } catch (error) {
          logger.error('Error parsing Redis message:', { channel, message, error });
        }
      });
    } catch (error) {
      logger.error('Redis SUBSCRIBE error:', { channel, error });
      throw error;
    }
  }

  // Health check
  async ping(): Promise<string> {
    try {
      return await this.client.ping();
    } catch (error) {
      logger.error('Redis PING error:', error);
      throw error;
    }
  }

  isHealthy(): boolean {
    return this.isConnected;
  }

  getClient(): Redis.RedisClientType {
    return this.client;
  }
}

// Create and export singleton instance
export const redis = new RedisManager();

export default redis;