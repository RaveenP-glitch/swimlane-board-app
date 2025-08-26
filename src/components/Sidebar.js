'use client';

const Sidebar = () => {
  return (
    <div className="w-[288px] bg-white border-r border-[#E6E8EC] min-h-screen relative">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-[#F4F5F6]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#3772FF] rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
            </svg>
          </div>
          <span className="text-[#353945] font-semibold text-lg">BoardApp</span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="p-4">
        <div className="space-y-2">
          {/* Root Folder */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-[#B1B5C4] uppercase tracking-wide mb-3">
              Root Folder
            </h3>
            
            {/* Navigation Items */}
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-[#353945] hover:bg-[#F4F5F6] rounded-lg transition-colors">
                <div className="w-5 h-5 bg-[#353945] rounded flex-shrink-0"></div>
                <span className="text-sm">Dashboard</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-[#777E91] hover:bg-[#F4F5F6] rounded-lg transition-colors">
                <div className="w-5 h-5 bg-[#777E91] rounded flex-shrink-0"></div>
                <span className="text-sm">Projects</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-[#777E91] hover:bg-[#F4F5F6] rounded-lg transition-colors">
                <div className="w-5 h-5 bg-[#777E91] rounded flex-shrink-0"></div>
                <span className="text-sm">Tasks</span>
              </button>
            </div>
          </div>

          {/* Teams Section */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-[#B1B5C4] uppercase tracking-wide mb-3">
              Teams
            </h3>
            
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-[#777E91] hover:bg-[#F4F5F6] rounded-lg transition-colors">
                <div className="w-5 h-5 bg-[#FFA800] rounded flex-shrink-0"></div>
                <span className="text-sm">Design Team</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-[#777E91] hover:bg-[#F4F5F6] rounded-lg transition-colors">
                <div className="w-5 h-5 bg-[#3772FF] rounded flex-shrink-0"></div>
                <span className="text-sm">Development</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Section at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#F4F5F6]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#353945] rounded-full flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[#353945] truncate">John Doe</div>
            <div className="text-xs text-[#777E91] truncate">john.doe@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
