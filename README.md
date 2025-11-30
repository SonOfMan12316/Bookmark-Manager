# Bookmark-Manager
Bookmark and manage your favorite websites, a simple tool to help you quickly save and revisit the links that matter most.

## Setup

### Install Dependencies

First, install all dependencies for root, frontend, and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### Development

Run both frontend and backend development servers:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Frontend only (port 5173)
npm run dev

# Backend only (port 3001)
npm run dev:backend
```

## Project Structure

- `frontend/` - React + Vite frontend application
- `backend/` - NestJS + Express backend
  - `src/` - NestJS application
- `api/` - Vercel serverless functions for deployment