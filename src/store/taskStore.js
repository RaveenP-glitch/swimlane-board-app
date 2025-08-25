import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
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
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        }));
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
      name: 'task-storage', // localStorage key
      partialize: (state) => ({ tasks: state.tasks }), // Only persist tasks
    }
  )
);

export default useTaskStore;
