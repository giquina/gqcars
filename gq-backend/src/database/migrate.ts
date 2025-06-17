import fs from 'fs';
import path from 'path';
import { database } from './connection';
import { logger } from '../utils/logger';

export class DatabaseMigrator {
  async runMigrations(): Promise<void> {
    try {
      logger.info('Starting database migrations...');
      
      // Connect to database
      await database.connect();
      
      // Read and execute schema file
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
      
      // Split by semicolon to execute individual statements
      const statements = schemaSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      logger.info(`Executing ${statements.length} migration statements...`);
      
      for (const statement of statements) {
        try {
          await database.query(statement);
          logger.debug('Executed migration statement successfully');
        } catch (error: any) {
          logger.error('Failed to execute migration statement:', {
            statement: statement.substring(0, 100) + '...',
            error: error.message
          });
          throw error;
        }
      }
      
      logger.info('Database migrations completed successfully');
      
      // Seed initial data
      await this.seedInitialData();
      
    } catch (error) {
      logger.error('Database migration failed:', error);
      throw error;
    }
  }
  
  private async seedInitialData(): Promise<void> {
    try {
      logger.info('Seeding initial data...');
      
      // Check if services already exist
      const existingServices = await database.query(
        'SELECT COUNT(*) as count FROM services'
      );
      
      if (existingServices.rows[0].count > 0) {
        logger.info('Services already exist, skipping seed data');
        return;
      }
      
      // Seed service types
      const services = [
        {
          name: 'Personal Close Protection',
          type: 'close_protection',
          description: 'Professional personal protection services for high-profile individuals',
          base_price: 500.00,
          price_per_hour: 75.00,
          price_per_day: 800.00,
          requirements: {
            minAgents: 1,
            specializations: ['close_protection'],
            securityLevel: 'high'
          }
        },
        {
          name: 'Private Hire Chauffeur',
          type: 'private_hire',
          description: 'Luxury chauffeur services with professional drivers',
          base_price: 200.00,
          price_per_hour: 50.00,
          price_per_day: 400.00,
          requirements: {
            minAgents: 1,
            specializations: ['driving'],
            vehicleRequired: true
          }
        },
        {
          name: 'VIP Transport Security',
          type: 'vip_transport',
          description: 'Secure transportation with professional security escort',
          base_price: 800.00,
          price_per_hour: 120.00,
          price_per_day: 1200.00,
          requirements: {
            minAgents: 2,
            specializations: ['close_protection', 'driving'],
            securityLevel: 'maximum'
          }
        },
        {
          name: 'Corporate Security',
          type: 'corporate_security',
          description: 'Professional security services for corporate events and executives',
          base_price: 600.00,
          price_per_hour: 85.00,
          price_per_day: 1000.00,
          requirements: {
            minAgents: 2,
            specializations: ['corporate'],
            securityLevel: 'high'
          }
        },
        {
          name: 'Event Security',
          type: 'event_security',
          description: 'Comprehensive security coverage for private events',
          base_price: 400.00,
          price_per_hour: 60.00,
          price_per_day: 600.00,
          requirements: {
            minAgents: 2,
            specializations: ['event_security'],
            securityLevel: 'standard'
          }
        },
        {
          name: 'Wedding Security',
          type: 'wedding_security',
          description: 'Discreet security services for wedding celebrations',
          base_price: 350.00,
          price_per_hour: 55.00,
          price_per_day: 500.00,
          requirements: {
            minAgents: 1,
            specializations: ['event_security'],
            securityLevel: 'standard'
          }
        }
      ];
      
      for (const service of services) {
        await database.query(
          `INSERT INTO services (name, type, description, base_price, price_per_hour, price_per_day, requirements) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            service.name,
            service.type,
            service.description,
            service.base_price,
            service.price_per_hour,
            service.price_per_day,
            JSON.stringify(service.requirements)
          ]
        );
      }
      
      logger.info('Initial service data seeded successfully');
      
    } catch (error) {
      logger.error('Failed to seed initial data:', error);
      throw error;
    }
  }
  
  async checkDatabaseHealth(): Promise<boolean> {
    try {
      // Check if all required tables exist
      const requiredTables = [
        'users', 'clients', 'agents', 'services', 'bookings', 
        'quotes', 'payments', 'conversations', 'messages', 
        'notifications', 'emergency_alerts', 'audit_logs',
        'refresh_tokens', 'file_uploads'
      ];
      
      for (const table of requiredTables) {
        const result = await database.query(
          `SELECT EXISTS (
             SELECT FROM information_schema.tables 
             WHERE table_schema = 'public' 
             AND table_name = $1
           )`,
          [table]
        );
        
        if (!result.rows[0].exists) {
          logger.error(`Required table '${table}' does not exist`);
          return false;
        }
      }
      
      logger.info('Database health check passed - all tables exist');
      return true;
      
    } catch (error) {
      logger.error('Database health check failed:', error);
      return false;
    }
  }
}

// Export instance for use in other modules
export const migrator = new DatabaseMigrator();

// CLI execution
if (require.main === module) {
  migrator.runMigrations()
    .then(() => {
      logger.info('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration failed:', error);
      process.exit(1);
    });
}