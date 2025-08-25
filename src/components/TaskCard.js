import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: task.id });
  
  // Debug logging
  if (isDragging) {
    console.log(`🔥 Dragging task: ${task.title} (ID: ${task.id})`);
  }

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  const statusColors = {
    todo: '#AEE753',
    'in-progress': '#F90430',
    review: '#3772FF',
    done: '#353945',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, month };
  };

  const { day, month } = formatDate(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-xl border border-[#E6E8EC] p-4 cursor-grab active:cursor-grabbing hover:shadow-sm transition-all ${
        isDragging ? 'shadow-lg border-blue-300 bg-blue-50' : ''
      }`}
    >
      {/* Status indicator and title */}
      <div className="flex items-start space-x-3 mb-3">
        <div 
          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
          style={{ backgroundColor: statusColors[task.status] }}
        />
        <h3 className="font-medium text-[#353945] text-sm leading-tight flex-1">
          {task.title}
        </h3>
        <button className="text-[#B1B5C4] hover:text-gray-600">
          <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
            <circle cx="2" cy="2" r="1.5"/>
            <circle cx="8" cy="2" r="1.5"/>
            <circle cx="14" cy="2" r="1.5"/>
          </svg>
        </button>
      </div>
      
      {/* Description */}
      <p className="text-[#B1B5C4] text-xs mb-4 leading-relaxed">
        {task.description}
      </p>
      
      {/* Bottom section with icons and user */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Link icon */}
          <div className="flex items-center text-[#777E91]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path fillRule="evenodd" d="M3.757 1.757a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.829l-.707.707a.5.5 0 01-.707-.707l.707-.707a1 1 0 000-1.415L5.879 2.464a1 1 0 00-1.415 0L3.05 3.879a1 1 0 000 1.414l.707.707a.5.5 0 01-.707.707l-.707-.707a2 2 0 010-2.829L3.757 1.757zM6.95 6.95a.5.5 0 01.707 0l.707.707a2 2 0 010 2.829l-1.414 1.414a2 2 0 01-2.829 0L2.707 10.485a2 2 0 010-2.829l.707-.707a.5.5 0 01.707.707l-.707.707a1 1 0 000 1.415l1.414 1.414a1 1 0 001.415 0l1.414-1.414a1 1 0 000-1.415l-.707-.707a.5.5 0 010-.707z"/>
            </svg>
            <span className="ml-1 text-xs">2</span>
          </div>
          
          {/* Comment icon */}
          <div className="flex items-center text-[#777E91]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path fillRule="evenodd" d="M6 1a5 5 0 00-4.546 7.142L.5 10.5l2.358-.954A5 5 0 106 1zm0 1a4 4 0 013.264 8.293l-.293-.146-1.5.6.6-1.5-.146-.293A4 4 0 016 2z"/>
              <circle cx="4" cy="6" r=".5"/>
              <circle cx="6" cy="6" r=".5"/>
              <circle cx="8" cy="6" r=".5"/>
            </svg>
            <span className="ml-1 text-xs">2</span>
          </div>
          
          {/* Calendar icon */}
          <div className="flex items-center text-[#777E91]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path fillRule="evenodd" d="M3 1a.5.5 0 01.5.5V2h5v-.5a.5.5 0 011 0V2h.5A1.5 1.5 0 0111 3.5v6A1.5 1.5 0 019.5 11h-7A1.5 1.5 0 011 9.5v-6A1.5 1.5 0 012.5 2H3v-.5A.5.5 0 013 1zM2.5 3A.5.5 0 002 3.5v6a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-6A.5.5 0 009.5 3h-7z"/>
              <path d="M3.5 4.5a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5H4a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5h-.5z"/>
            </svg>
            <span className="ml-1 text-xs">{month}. {day}</span>
          </div>
        </div>
        
        {/* User avatars */}
        <div className="flex items-center -space-x-1">
          <div className="w-5 h-5 rounded-full bg-[#353945] border border-white flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
              <path d="M4 0a2 2 0 00-2 2v.5c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5V2a2 2 0 00-2-2zM1.5 4.5A1.5 1.5 0 000 6v1.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5V6a1.5 1.5 0 00-1.5-1.5h-5z"/>
            </svg>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#353945] border border-white flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
              <path d="M4 0a2 2 0 00-2 2v.5c0 .28.22.5.5.5h3c.28 0 .5-.22.5-.5V2a2 2 0 00-2-2zM1.5 4.5A1.5 1.5 0 000 6v1.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5V6a1.5 1.5 0 00-1.5-1.5h-5z"/>
            </svg>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#E6E8EC] border border-white flex items-center justify-center">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="#353945">
              <path fillRule="evenodd" d="M3 0a.5.5 0 01.5.5V2.5H5a.5.5 0 010 1H3.5v2a.5.5 0 01-1 0v-2H.5a.5.5 0 010-1h2V.5A.5.5 0 013 0z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Priority/Status tag */}
      <div className="mt-3 flex items-center justify-between">
        <div className="bg-[#F4F5F6] px-2 py-1 rounded text-xs text-[#B1B5C4] flex items-center">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="mr-1">
            <path fillRule="evenodd" d="M4 0L5.5 2.5H8L6 4.5L7 8L4 6L1 8L2 4.5L0 2.5H2.5L4 0Z"/>
          </svg>
          {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
        </div>
        <span className="text-[#B1B5C4] text-xs">{task.assignee}</span>
      </div>
    </div>
  );
};

export default TaskCard;
