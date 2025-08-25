import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Swimlane = ({ id, title, tasks, count }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const statusColors = {
    todo: 'bg-gray-50 border-gray-200',
    'in-progress': 'bg-blue-50 border-blue-200',
    review: 'bg-yellow-50 border-yellow-200',
    done: 'bg-green-50 border-green-200',
  };

  const headerColors = {
    todo: 'text-gray-700',
    'in-progress': 'text-blue-700',
    review: 'text-yellow-700',
    done: 'text-green-700',
  };

  return (
    <div className="flex-1 min-w-80">
      <div className={`rounded-lg border-2 ${statusColors[id]} ${isOver ? 'border-blue-400 bg-blue-50' : ''} transition-colors`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className={`font-semibold text-sm ${headerColors[id]}`}>
              {title}
            </h2>
            <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 border">
              {count}
            </span>
          </div>
        </div>
        
        <div
          ref={setNodeRef}
          className="p-4 min-h-96 max-h-screen overflow-y-auto"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-8">
                No tasks
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default Swimlane;
