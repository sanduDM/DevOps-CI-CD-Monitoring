# DevOps, CI/CD & Monitoring

![CI Pipeline](https://github.com/sanduDM/DevOps-CI-CD-Monitoring/actions/workflows/ci.yml/badge.svg)

A Node.js app with an automated CI/CD pipeline using GitHub Actions and Docker, deployed to staging and production on AWS EC2, with basic monitoring.

Flow: GitHub → Build → Test → Docker → Deploy → Monitor

## Tools Used
- Node.js (Express)
- Git and GitHub
- GitHub Actions
- Docker and GitHub Container Registry
- AWS EC2

## Git Workflow
- `main`: production
- `develop`: staging
- Changes go from `develop` into `main` through a pull request

## Pipelines

| Workflow | File | What it does |
|---|---|---|
| CI Pipeline | `ci.yml` | Installs dependencies, runs tests, builds the Docker image, runs a smoke test |
| Publish and Deploy | `docker-publish.yml` | Pushes the image to GitHub Container Registry and deploys it |
| Uptime Monitor | `monitor.yml` | Checks the live app every 15 minutes |

## Environments

| Environment | Branch | Port | Approval |
|---|---|---|---|
| Staging | `develop` | 3001 | Automatic |
| Production | `main` | 3000 | Manual |

## Monitoring
- Request logs with timestamps (`docker logs app-production`)
- `/live` endpoint returns status and uptime
- `/health` endpoint checks the database connection
- Docker `HEALTHCHECK` in the Dockerfile
- Scheduled uptime check with GitHub Actions
- Resource usage with `docker stats`

## Run Locally
```bash
cd app
npm install
npm test
npm start
```
Open http://localhost:3000

## Run with Docker
```bash
docker build -t devops-demo .
docker run -d -p 3000:3000 devops-demo
```

