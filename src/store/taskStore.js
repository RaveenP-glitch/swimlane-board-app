import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initial mock tasks
const initialTasks = [
  {
    "id": "1",
    "title": "Design System Setup",
    "description": "Create a comprehensive design system with reusable components",
    "status": "todo",
    "priority": "high",
    "assignee": "Sarah Chen",
    "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "dueDate": "2024-01-15",
    "tags": ["Design", "UI/UX"]
  },
  {
    "id": "2",
    "title": "API Integration", 
    "description": "Integrate REST API endpoints for user authentication",
    "status": "in-progress",
    "priority": "high",
    "assignee": "Mike Johnson",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "dueDate": "2024-01-20",
    "tags": ["Backend", "API"]
  },
  {
    "id": "3",
    "title": "Database Migration",
    "description": "Migrate legacy database to new schema",
    "status": "review",
    "priority": "high",
    "assignee": "David Kim",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    "dueDate": "2024-01-18",
    "tags": ["Database"]
  },
  {
    "id": "4",
    "title": "Mobile App Testing",
    "description": "Comprehensive testing of mobile application",
    "status": "done",
    "priority": "medium",
    "assignee": "Lisa Wang",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    "dueDate": "2024-01-10",
    "tags": ["Testing", "Mobile"]
  }
];

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      searchQuery: '',
      
      // Initialize tasks from mock data
      initializeTasks: (mockTasks) => {
        set({ tasks: mockTasks });
      },
      
      // Update search query
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      // Get filtered tasks based on search query
      getFilteredTasks: () => {
        const { tasks, searchQuery } = get();
        if (!searchQuery) return tasks;
        
        return tasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
      
      // Move task to different status (swimlane)
      moveTask: (taskId, newStatus) => {
        console.log(`🔄 Store: Moving task ${taskId} to ${newStatus}`);
        set((state) => {
          const taskIndex = state.tasks.findIndex(task => task.id === taskId);
          if (taskIndex === -1) {
            console.log('❌ Task not found');
            return state;
          }
          
          const oldStatus = state.tasks[taskIndex].status;
          console.log(`✅ Store: Updated task "${state.tasks[taskIndex].title}" from "${oldStatus}" to "${newStatus}"`);
          
          // Create a completely new tasks array to ensure React detects the change
          const updatedTasks = [
            ...state.tasks.slice(0, taskIndex),
            { ...state.tasks[taskIndex], status: newStatus },
            ...state.tasks.slice(taskIndex + 1)
          ];
          
          console.log('📦 Store: Updated tasks array created');
          return { ...state, tasks: updatedTasks };
        });
      },
      
      // Add new task
      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
        }));
      },
      
      // Update task
      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        }));
      },
      
      // Delete task
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== taskId)
        }));
      }
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

export default useTaskStore;
