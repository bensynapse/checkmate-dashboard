# Checkmate Dashboard

A full-stack web application for tracking and analyzing product validation tasks where agents compare supplier products to Amazon listings.

## Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: MySQL
- **Frontend**: React with TypeScript
- **Charts**: Recharts
- **UI**: Material-UI

## 🚀 Features

- **Real-time Dashboard**: Monitor agent performance and task completion
- **Multi-Agent Support**: Track multiple agents working on different validation tasks
- **Validation Analytics**: 
  - Match/Mismatch rate tracking
  - Common mismatch patterns analysis
  - Agent efficiency metrics
  - Sheet-based performance breakdown
- **Interactive Charts**: Visual representation of trends and performance metrics
- **MySQL Database**: Persistent storage for validation data
- **Date Filtering**: Filter all metrics by custom date ranges
- **Export Capabilities**: Export data for reports

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

2. Import sample data:
   ```bash
   mysql -u root -p checkmate_db < data.sql
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
   DB_DATABASE=checkmate_db
   PORT=3001
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will be available at http://localhost:3001

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

   The frontend will be available at http://localhost:3000

## API Endpoints

### Analytics Endpoints
- `GET /api/analytics/overview` - Overview metrics (KPIs)
- `GET /api/analytics/agent-performance` - Agent performance metrics
- `GET /api/analytics/task-trends?granularity={day|week|month}` - Task trends over time
- `GET /api/analytics/sheet-summary` - Summary by sheet
- `GET /api/analytics/errors` - Error patterns
- `GET /api/analytics/activity-heatmap` - Agent activity heatmap
- `GET /api/analytics/match-rate` - Validation match rates
- `GET /api/analytics/mismatch-patterns` - Common mismatch patterns
- `GET /api/analytics/agent-efficiency` - Agent efficiency metrics
- `GET /api/analytics/agent-sheet-matrix` - Performance by agent/sheet combination

All endpoints support optional query parameters:
- `startDate` - ISO date string (e.g., "2025-01-01")
- `endDate` - ISO date string

## Dashboard Components

### KPI Cards
- Total Tasks Completed (20,306 completed validations)
- Active Agents Count (3 agents: Agent 5, 6, and 7)
- Average Completion Time (21 seconds)
- Error Rate Percentage (0.21%)

### Charts
- **Task Trends**: Multi-agent line chart showing individual agent performance over time
- **Validation Match Rate**: Pie chart showing match/mismatch/partial rates
- **Agent Performance**: Bar chart comparing agent productivity
- **Agent Efficiency**: Dual-axis chart showing tasks per hour and handle time
- **Sheet Distribution**: Progress tracking for VINYASA, JSB, and REVIX sheets
- **Mismatch Patterns**: Top validation issues (Price Difference, SKU Not Found, etc.)

### Tables
- **Agent Performance Details**: Sortable table with completion rates and average times
- **Error Patterns**: List of timeout errors and validation issues

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

## Validation System Overview

This dashboard tracks a validation system where:
- **Agents** manually compare supplier products (Summit Racing, etc.) to Amazon listings
- **Sheets** represent different suppliers (VINYASA, JSB, REVIX)
- **Tasks** are individual product validations with match/mismatch results
- **Allocations** track which agent is working on which task

## Future Enhancements

- Real-time updates using WebSockets
- Export functionality for CSV/PDF reports
- User authentication and role-based access
- Advanced filtering options
- Mobile-responsive optimizations
- Dark mode support
- Automated validation suggestions based on patterns

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for efficient product validation tracking