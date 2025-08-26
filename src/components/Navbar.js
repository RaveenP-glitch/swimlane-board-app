'use client';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[#E6E8EC] px-8 py-4 flex items-center justify-between">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center space-x-6">
        <div className="text-[#3772FF] font-semibold text-lg">
          BoardApp
        </div>
      </div>

      {/* Right side - Search, Notifications, User */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[#777E91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="block w-60 pl-10 pr-3 py-2 border border-[#E6E8EC] rounded-lg leading-5 bg-[#F4F5F6] placeholder-[#B1B5C4] focus:outline-none focus:ring-1 focus:ring-[#3772FF] focus:border-[#3772FF] text-sm text-[#353945]"
          />
        </div>

        {/* Create New Workspace Button */}
        <button className="bg-[#3772FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2563EB] transition-colors flex items-center space-x-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 2a.5.5 0 01.5.5V7H13a.5.5 0 010 1H8.5v4.5a.5.5 0 01-1 0V8H3a.5.5 0 010-1h4.5V2.5A.5.5 0 018 2z" clipRule="evenodd" />
          </svg>
          <span>Create new workspace</span>
        </button>

        {/* Menu Options */}
        <button className="text-[#777E91] hover:text-[#353945] p-2 rounded">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="14" cy="8" r="1.5" />
          </svg>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="text-[#777E91] hover:text-[#353945] p-2 rounded relative">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a3 3 0 00-3 3v2.5a2 2 0 01-.6 1.4L3.8 8.5a.5.5 0 00.4.8h7.6a.5.5 0 00.4-.8L11.6 7.9a2 2 0 01-.6-1.4V4a3 3 0 00-3-3z" />
              <path d="M6.5 12a1.5 1.5 0 003 0H6.5z" />
            </svg>
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#FF5C00] rounded-full"></div>
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#353945] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M8 0a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5v.5c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-.5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4z" />
              <path d="M3 10.5A1.5 1.5 0 001.5 12v2c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-2A1.5 1.5 0 0013 10.5h-10z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

