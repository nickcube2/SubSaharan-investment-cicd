# Docker Deployment Guide

## Overview

This project includes Docker support for containerized deployment. The Docker setup uses multi-stage builds to create an optimized production image with Next.js 16 standalone output.

## Quick Start

### Development with Docker

```bash
# Build and run the container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop the container
docker-compose down
```

### Production Deployment

```bash
# Build the Docker image
docker build -t sub-saharan-app:latest .

# Run the container
docker run -p 3000:3000 sub-saharan-app:latest

# Or use docker-compose
docker-compose up -d
```

## Docker Configuration

### Dockerfile

The Dockerfile uses a multi-stage build process:

1. **deps stage**: Installs dependencies
2. **builder stage**: Builds the Next.js application
3. **runner stage**: Creates a minimal production image

### Environment Variables

You can pass environment variables to the container:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  sub-saharan-app:latest
```

Or in docker-compose.yml:

```yaml
services:
  web:
    environment:
      - NODE_ENV=production
      - CUSTOM_VAR=value
```

## Image Size Optimization

The Docker image is optimized using:

- Alpine Linux base (minimal footprint)
- Multi-stage builds
- Next.js standalone output
- .dockerignore to exclude unnecessary files

## Security

- Runs as non-root user (nextjs:nodejs)
- Minimal attack surface with Alpine Linux
- Production-only dependencies

## Troubleshooting

### Build Issues

If you encounter build errors:

```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Port Conflicts

If port 3000 is already in use:

```bash
# Use a different port
docker run -p 8080:3000 sub-saharan-app:latest
```

Or update docker-compose.yml:

```yaml
ports:
  - "8080:3000"
```

## Production Considerations

### Reverse Proxy (Optional)

For production, consider using Nginx as a reverse proxy. Uncomment the nginx service in docker-compose.yml and create an nginx.conf file.

### Health Checks

Add health checks to docker-compose.yml:

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Logging

Configure Docker logging:

```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t sub-saharan-app:latest .
      
      - name: Push to registry
        run: |
          docker tag sub-saharan-app:latest your-registry/sub-saharan-app:latest
          docker push your-registry/sub-saharan-app:latest
```

## Next.js 16 Features

This Docker setup is optimized for Next.js 16 with:

- Turbopack bundler
- Standalone output mode
- React 19 support
- Enhanced routing and caching

## Resources

- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js 16 Documentation](https://nextjs.org/docs)
