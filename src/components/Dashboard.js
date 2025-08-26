'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';

import useTaskStore from '@/store/taskStore';
import Swimlane from './Swimlane';
import Sidebar from './Sidebar';
import TaskCard from './TaskCard';
import Navbar from './Navbar';
import BoardHeader from './BoardHeader';

const Dashboard = () => {
  const { 
    tasks, 
    moveTask, 
    searchQuery
  } = useTaskStore();

  const [activeTask, setActiveTask] = useState(null);

  // Define the status flow order - tasks can only move to adjacent states
  const statusFlow = ['reject', 'todo', 'in-progress', 'review', 'done'];
  
  // Helper function to check if a move is valid (only to adjacent states)
  const isValidMove = (currentStatus, targetStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    const targetIndex = statusFlow.indexOf(targetStatus);
    
    if (currentIndex === -1 || targetIndex === -1) return false;
    
    // Allow moves only to adjacent positions (one before or one after)
    const distance = Math.abs(currentIndex - targetIndex);
    return distance === 1;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Filter tasks based on search query and organize by status
  const tasksByStatus = useMemo(() => {
    // Filter tasks based on search query
    const filteredTasks = searchQuery
      ? tasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : tasks;

    // Organize by status
    return {
      reject: filteredTasks.filter(task => task.status === 'reject'),
      todo: filteredTasks.filter(task => task.status === 'todo'),
      'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
      review: filteredTasks.filter(task => task.status === 'review'),
      done: filteredTasks.filter(task => task.status === 'done'),
    };
  }, [tasks, searchQuery]);

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task);
    console.log('🚀 Drag started:', task?.title, 'ID:', active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    console.log('🎯 Drag ended - Active:', active?.id, 'Over:', over?.id);

    if (!over) {
      console.log('❌ No drop target found');
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // Find the task being dragged
    const draggedTask = tasks.find(task => task.id === activeId);
    if (!draggedTask) {
      console.log('❌ Active task not found:', activeId);
      return;
    }

    console.log('📋 Task found:', draggedTask.title, 'Current status:', draggedTask.status);
    console.log('🎯 Drop target:', overId);

    // If dropped on a swimlane, check if it's a valid move
    if (['reject', 'todo', 'in-progress', 'review', 'done'].includes(overId)) {
      if (draggedTask.status !== overId) {
        // Check if the move is to an adjacent state only
        if (isValidMove(draggedTask.status, overId)) {
          console.log(`✅ Valid move: "${draggedTask.title}" from "${draggedTask.status}" to "${overId}"`);
          moveTask(activeId, overId);
          console.log('🔄 Move task called successfully');
          console.log('🎨 UI should update immediately');
        } else {
          console.log(`🚫 Invalid move: Tasks can only move to adjacent states. "${draggedTask.status}" → "${overId}" is not allowed`);
          const currentIndex = statusFlow.indexOf(draggedTask.status);
          const validMoves = [];
          if (currentIndex > 0) validMoves.push(statusFlow[currentIndex - 1]);
          if (currentIndex < statusFlow.length - 1) validMoves.push(statusFlow[currentIndex + 1]);
          console.log(`Valid moves from "${draggedTask.status}":`, validMoves);
        }
      } else {
        console.log('ℹ️ Task already in target status');
      }
    } else {
      console.log('❌ Invalid drop target:', overId);
      console.log('Valid targets are:', ['todo', 'in-progress', 'review', 'done']);
    }
  };

  // Helper function to determine if a swimlane is a valid drop target
  const isValidDropTarget = (swimlaneId) => {
    if (!activeTask) return true; // No active drag, all lanes are visually normal
    return isValidMove(activeTask.status, swimlaneId);
  };

  const swimlanes = [
    { id: 'reject', title: 'Reject', tasks: tasksByStatus.reject },
    { id: 'todo', title: 'To Do', tasks: tasksByStatus.todo },
    { id: 'in-progress', title: 'In Progress', tasks: tasksByStatus['in-progress'] },
    { id: 'review', title: 'Review', tasks: tasksByStatus.review },
    { id: 'done', title: 'Done', tasks: tasksByStatus.done },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Board Header with TO DO button and search */}
          <BoardHeader />

          {/* Main Board */}
          <div className="bg-[#F4F5F6] min-h-screen">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-5 divide-x divide-[#E6E8EC]">
                {swimlanes.map((swimlane) => (
                  <Swimlane
                    key={`${swimlane.id}-${swimlane.tasks.length}-${swimlane.tasks.map(t => t.id).join(',')}`}
                    id={swimlane.id}
                    title={swimlane.title}
                    tasks={swimlane.tasks}
                    isValidDropTarget={isValidDropTarget(swimlane.id)}
                    activeTaskStatus={activeTask?.status}
                  />
                ))}
              </div>
              <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
