# Database Setup Instructions

## Prerequisites
- MySQL 8.0 or higher installed
- Access to MySQL root or a user with database creation privileges

## Setup Steps

1. **Import the database schema**:
   ```bash
   mysql -u root -p < ../schema.sql
   ```

2. **Import the sample data** (optional):
   ```bash
   mysql -u root -p ape < ../data.sql
   ```

3. **Update the .env file** with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password_here
   DB_DATABASE=ape
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the backend server**:
   ```bash
   npm run start:dev
   ```

## API Endpoints

The backend provides the following analytics endpoints:

- `GET /api/analytics/overview` - Overview metrics (KPIs)
- `GET /api/analytics/agent-performance` - Agent performance metrics
- `GET /api/analytics/task-trends?granularity=day` - Task trends over time
- `GET /api/analytics/sheet-summary` - Summary by sheet
- `GET /api/analytics/errors` - Error patterns
- `GET /api/analytics/activity-heatmap` - Agent activity heatmap

All endpoints support optional query parameters:
- `startDate` - ISO date string (e.g., "2025-01-01")
- `endDate` - ISO date string
- `granularity` - (for task-trends only) "day" | "week" | "month"
- `agentId` - (for activity-heatmap only) numeric agent ID