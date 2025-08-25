# Task Management Dashboard

A modern, responsive swimlane-based task management dashboard built with Next.js, TailwindCSS, and Zustand for state management.

## Features

- **Swimlane Dashboard**: Tasks organized by status (To Do, In Progress, Review, Done)
- **Drag & Drop**: Move tasks between swimlanes with smooth drag-and-drop functionality
- **Real-time Search**: Filter tasks by title, description, or assignee
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices (768px+)
- **Data Persistence**: Tasks are automatically saved to localStorage
- **Modern UI**: Clean, professional interface with TailwindCSS styling
- **Mock Data**: Pre-populated with realistic task data for demonstration

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **@dnd-kit** - Modern drag and drop library
- **JavaScript** - No TypeScript dependencies

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard

## Key Features

### Drag & Drop
- Tasks can be dragged between any swimlane
- Visual feedback during dragging
- Automatic status updates when dropped
- Touch-friendly for mobile devices

### Search Functionality
- Real-time filtering as you type
- Searches across task title, description, and assignee
- Clear search button for easy reset
- Shows count of filtered results

### Data Persistence
- All task changes are automatically saved to localStorage
- Data persists across browser sessions
- Graceful handling of localStorage unavailability

### Responsive Design
- Desktop: 4-column layout with horizontal scrolling
- Tablet: 2-column grid layout
- Mobile: Single column stacked layout
- Optimized touch targets for mobile interaction
