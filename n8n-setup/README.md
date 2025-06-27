# n8n Local Docker Setup

This setup provides a production-ready n8n installation with PostgreSQL database, Redis for caching, and proper volume management.

## Features

- ✅ **Production Database**: PostgreSQL instead of SQLite
- ✅ **Performance**: Redis for caching and session management
- ✅ **Persistence**: Proper volume mounting for data persistence
- ✅ **Security**: Environment-based configuration
- ✅ **Scalability**: Easy to scale and backup
- ✅ **Monitoring**: Built-in metrics endpoint

## Quick Start

### Prerequisites
1. Docker Desktop must be installed and running
2. WSL2 enabled (for Windows)

### Start n8n
1. Double-click `start-n8n.bat` or run:
   ```bash
   docker-compose up -d
   ```

2. Open your browser to: http://localhost:5678

3. Create your admin account on first visit

### Stop n8n
1. Double-click `stop-n8n.bat` or run:
   ```bash
   docker-compose down
   ```

## Configuration

### Environment Variables
Edit `.env` file to customize:
- Database credentials
- Redis password
- n8n settings
- Performance tuning

### Key Settings
- **Database**: PostgreSQL (production-ready)
- **Execution Mode**: Main process (good for development)
- **Data Retention**: 7 days (configurable)
- **Binary Data**: Filesystem storage
- **Metrics**: Enabled for monitoring

## Directory Structure
```
n8n-setup/
├── docker-compose.yml    # Main configuration
├── .env                  # Environment variables
├── workflows/           # Exported workflows
├── credentials/         # Backup credentials
├── start-n8n.bat       # Quick start script
├── stop-n8n.bat        # Quick stop script
└── README.md           # This file
```

## Advanced Usage

### View Logs
```bash
docker-compose logs -f n8n
```

### Backup Data
```bash
# Backup workflows
docker-compose exec n8n n8n export:workflow --all --output=/home/node/.n8n/workflows/

# Backup database
docker-compose exec postgres pg_dump -U n8n n8n > backup.sql
```

### Update n8n
```bash
docker-compose pull
docker-compose up -d
```

### Reset Everything (CAUTION!)
```bash
docker-compose down -v
docker-compose up -d
```

## Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running
- Check WSL2 is enabled
- Restart Docker Desktop if needed

### Port Conflicts
- Default port is 5678
- Change in docker-compose.yml if needed

### Performance Issues
- Increase Docker Desktop memory allocation
- Check disk space for volumes

### Database Connection Issues
- Wait 30 seconds after startup
- Check PostgreSQL container health

## Useful Commands

```bash
# Check service status
docker-compose ps

# View all logs
docker-compose logs

# Restart specific service
docker-compose restart n8n

# Enter n8n container
docker-compose exec n8n /bin/sh

# Enter database
docker-compose exec postgres psql -U n8n -d n8n
```

## Production Recommendations

### Security
1. Change default passwords in `.env`
2. Enable HTTPS with reverse proxy
3. Use strong database passwords
4. Regular security updates

### Performance
1. Allocate adequate Docker resources
2. Monitor disk usage
3. Regular database maintenance
4. Consider execution mode for workflows

### Backup Strategy
1. Regular database backups
2. Export workflows periodically
3. Backup volume data
4. Test restore procedures

## Getting Started with n8n

### First Steps
1. Create your admin account
2. Explore the workflow templates
3. Set up your first automation
4. Configure necessary credentials

### Popular Integrations
- Google Workspace
- Microsoft 365
- Slack/Discord
- Database connections
- HTTP/REST APIs
- File operations

### Best Practices
1. Use meaningful workflow names
2. Add descriptions to nodes
3. Handle errors gracefully
4. Test workflows thoroughly
5. Monitor execution logs

## Support

- Official Documentation: https://docs.n8n.io
- Community Forum: https://community.n8n.io
- GitHub Issues: https://github.com/n8n-io/n8n

Happy Automating! 🚀
