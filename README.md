# Executive Insights Dashboard - Agent Production

A comprehensive dashboard for monitoring agent productivity and performance metrics.

## Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: MySQL
- **Frontend**: React with TypeScript
- **Charts**: Recharts
- **UI**: Material-UI

## Features

- **KPI Overview**: Real-time metrics including total tasks completed, active agents, average completion time, and error rate
- **Task Trends**: Visualize task completion trends over time with customizable granularity (day/week/month)
- **Agent Performance**: Compare agent productivity with detailed metrics
- **Sheet Distribution**: View task distribution across different sheets
- **Error Monitoring**: Track error patterns and frequency
- **Date Filtering**: Filter all metrics by custom date ranges
- **Export Capabilities**: Export data for reports (implementation pending)

## Project Structure

```
checkmate-dashboard/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── entities/       # Database entities
│   │   ├── analytics/      # Analytics module
│   │   └── app.module.ts   # Main app module
│   └── .env               # Environment configuration
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── services/       # API services
│       └── App.tsx        # Main app component
├── schema.sql             # Database schema
└── data.sql              # Sample data
```

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- MySQL 8.0+ installed and running
- MySQL user with database creation privileges

### Database Setup

1. Create the database and import schema:
   ```bash
   mysql -u root -p < schema.sql
   ```

2. (Optional) Import sample data:
   ```bash
   mysql -u root -p ape < data.sql
   ```

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Update `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password_here
   DB_DATABASE=ape
   PORT=3000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will be available at http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at http://localhost:3001

## API Endpoints

- `GET /api/analytics/overview` - Overview metrics (KPIs)
- `GET /api/analytics/agent-performance` - Agent performance metrics
- `GET /api/analytics/task-trends?granularity={day|week|month}` - Task trends over time
- `GET /api/analytics/sheet-summary` - Summary by sheet
- `GET /api/analytics/errors` - Error patterns
- `GET /api/analytics/activity-heatmap` - Agent activity heatmap

All endpoints support optional query parameters:
- `startDate` - ISO date string (e.g., "2025-01-01")
- `endDate` - ISO date string

## Dashboard Components

### KPI Cards
- Total Tasks Completed
- Active Agents Count
- Average Completion Time
- Error Rate Percentage

### Charts
- **Task Trends**: Line chart showing allocation and completion trends
- **Agent Performance**: Bar chart comparing agent productivity
- **Sheet Distribution**: Pie chart showing task distribution by sheet

### Tables
- **Agent Performance Details**: Sortable table with completion rates and average times
- **Error Patterns**: List of errors with occurrence counts and last seen timestamps

## Development

### Running in Production

Backend:
```bash
cd backend
npm run build
npm run start:prod
```

Frontend:
```bash
cd frontend
npm run build
# Serve the build folder with any static file server
```

## Future Enhancements

- Real-time updates using WebSockets
- Export functionality for CSV/PDF reports
- User authentication and role-based access
- Advanced filtering options
- Mobile-responsive optimizations
- Dark mode support