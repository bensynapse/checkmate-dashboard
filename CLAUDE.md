# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Checkmate Dashboard is a full-stack web application for monitoring agent productivity and performance metrics. It consists of:
- **Backend**: NestJS API with TypeScript and TypeORM (MySQL)
- **Frontend**: React with TypeScript, Material-UI, and Recharts

## Essential Development Commands

### Backend Development (run from `/backend`)
```bash
npm run start:dev     # Start with hot reload (recommended for development)
npm run build         # Build for production
npm run lint          # Run ESLint with auto-fix
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Generate test coverage report
```

### Frontend Development (run from `/frontend`)
```bash
npm start            # Start development server on port 3001
npm run build        # Build for production
npm test             # Run tests
```

### Running a Single Test
```bash
# Backend
npm test -- path/to/file.spec.ts        # Run specific test file
npm test -- --testNamePattern="pattern"  # Run tests matching pattern

# Frontend  
npm test -- path/to/file.test.tsx       # Run specific test file
```

## Architecture Overview

### Backend Architecture
The backend follows NestJS modular architecture with:
- **Analytics Module**: Core business logic in `/backend/src/analytics/`
- **Entities**: TypeORM entities in `/backend/src/entities/` (Agent, Allocation, Log, Session, Task)
- **Mock Services**: Available for testing without database connection
- **API Pattern**: RESTful endpoints under `/api/analytics/*`

Key architectural decisions:
- Service-oriented architecture with dependency injection
- TypeORM for database abstraction (currently commented out in app.module.ts)
- Mock data services for development without database

### Frontend Architecture
The frontend uses component-based React architecture with:
- **Components**: Organized by feature in `/frontend/src/components/`
  - Charts: Recharts-based visualizations
  - Dashboard: Main container component
  - KPICards: Metric display components
  - Tables: Data grid components
- **Services**: API communication layer in `/frontend/src/services/`
- **Material-UI**: Theming and component library

### API Endpoints
Main analytics endpoints:
- `GET /api/analytics/overview` - KPI metrics overview
- `GET /api/analytics/agent-performance` - Agent performance data
- `GET /api/analytics/task-trends` - Task completion trends
- `GET /api/analytics/sheet-summary` - Sheet-based summaries
- `GET /api/analytics/errors` - Error pattern analysis
- `GET /api/analytics/activity-heatmap` - Activity visualization

### Database Schema
MySQL database (`ape`) with main entities:
- Agent: Agent information and metadata
- Allocation: Task allocations to agents
- Log: Activity logs and events
- Session: Agent session tracking
- Task: Task definitions and status

## Development Tips

1. **Database Connection**: Backend is currently configured to run without database. To enable:
   - Uncomment TypeORM configuration in `/backend/src/app.module.ts`
   - Configure database credentials in `.env` file

2. **Testing Strategy**:
   - Backend: Use `*.spec.ts` files for unit tests
   - Frontend: Use `*.test.tsx` files for component tests
   - Mock services are available for testing without external dependencies

3. **Code Quality**:
   - Both projects have TypeScript strict mode enabled
   - ESLint is configured with TypeScript support
   - Backend allows `any` types (be mindful of type safety)

4. **Port Configuration**:
   - Frontend: Port 3001
   - Backend: Port 3000 (configurable via PORT env variable)