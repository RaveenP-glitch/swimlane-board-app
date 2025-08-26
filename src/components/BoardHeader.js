'use client';

const BoardHeader = () => {
  return (
    <div className="bg-white border-b border-[#E6E8EC] px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left side - TO DO button and actions */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#E6E8EC] text-[#353945] px-6 py-2 rounded-full text-sm font-medium">
            TO DO
          </button>
          <button className="text-[#353945] p-2 hover:bg-gray-100 rounded">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="text-[#353945] p-2 hover:bg-gray-100 rounded">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;

