import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Swimlane = ({ id, title, tasks, isValidDropTarget = true, activeTaskStatus = null }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  // Debug logging
  if (isOver) {
    console.log(`🎯 Hovering over swimlane: ${id}`, { isValidDropTarget, activeTaskStatus });
  }

  // Determine drop zone styling based on validity
  const getDropZoneStyle = () => {
    if (!isOver) return 'bg-[#F4F5F6]';
    
    if (isValidDropTarget) {
      return 'bg-green-50 border-2 border-green-300 border-dashed';
    } else {
      return 'bg-red-50 border-2 border-red-300 border-dashed';
    }
  };

  const titleMap = {
    todo: 'TO DO',
    'in-progress': 'IN PROGRESS', 
    review: 'REVIEW',
    done: 'DONE',
  };

  return (
    <div className="h-full">
      {/* Column Header */}
      <div className="bg-white border-b border-[#E6E8EC] px-6 py-4">
        <h2 className="text-sm font-semibold text-[#353945] tracking-wide">
          {titleMap[id] || title}
        </h2>
      </div>
      
      {/* Tasks Area */}
      <div
        ref={setNodeRef}
        className={`p-6 min-h-screen ${getDropZoneStyle()} transition-all duration-200`}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-[#B1B5C4] text-sm py-12">
            No tasks
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={`${task.id}-${task.status}`} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Swimlane;
