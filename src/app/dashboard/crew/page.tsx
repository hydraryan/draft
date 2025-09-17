// src/app/dashboard/crew/page.tsx
'use client';

import Link from 'next/link';
import {
  FaCalendarAlt, FaFileAlt, FaBullhorn, FaUserCircle,
  FaUpload, FaEdit, FaCheck, FaPlus, FaTimes,
  FaVideo, FaMicrophoneAlt, FaPalette, FaTools,
  FaTasks, FaUserClock, FaComments, FaCheckCircle,
  FaChevronLeft, FaChevronRight, FaPencilAlt, FaTimesCircle
} from 'react-icons/fa';
import { ReactNode, useState } from 'react';
import { RowDataPacket } from 'mysql2';

// Reusable card component for the dashboard features
interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  content?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const DashboardCard = ({ title, icon, content, onClick, className, children }: DashboardCardProps) => (
  <div onClick={onClick} className={`flex transform cursor-pointer flex-col rounded-xl border-2 border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:scale-105 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="text-3xl text-white">{icon}</div>
      <h3 className="font-bebas-neue text-2xl uppercase text-white tracking-wider">{title}</h3>
    </div>
    {content && <p className="text-gray-300 text-sm">{content}</p>}
    {children}
  </div>
);

// New component for current shooting details (top priority)
const ShootingDetailsBanner = () => (
  <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
    <h2 className="text-3xl md:text-5xl font-anton uppercase tracking-wider text-white mb-2">Current Shoot</h2>
    <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
      <div className="flex flex-col">
        <span className="text-white/70">Scene:</span>
        <span className="font-bold">Scene 12B - Interior</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Time:</span>
        <span className="font-bold">9:00 AM - 1:00 PM</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Actors:</span>
        <span className="font-bold">Cast User 1, Cast User 2</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white/70">Props Needed:</span>
        <span className="font-bold">Backpack, Desk Lamp</span>
      </div>
    </div>
  </div>
);

// New Modal for Uploads
interface UploadModalProps {
  onClose: () => void;
}

const UploadModal = ({ onClose }: UploadModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white w-full max-w-lg mx-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-2xl font-bold">Upload Files</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <p className="text-gray-400 mb-4">Select a document to upload.</p>
      <input type="file" className="w-full border border-white/20 rounded p-2" />
      <button className="mt-4 w-full bg-netflix-red rounded py-2 font-bold hover:bg-red-700">Upload</button>
    </div>
  </div>
);

// New Modal component for showing events
interface EventModalProps {
  date: number;
  events: { time: string; title: string; }[];
  onClose: () => void;
}

const EventModal = ({ date, events, onClose }: EventModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-900 w-full max-w-lg mx-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-2xl font-bold">Events for September {date}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
          <FaTimesCircle size={24} />
        </button>
      </div>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="border-l-4 border-green-600 pl-4 py-2 bg-gray-100 rounded-lg">
              <p className="font-semibold">{event.time}</p>
              <p className="text-sm">{event.title}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No events scheduled.</p>
        )}
      </div>
    </div>
  </div>
);

// Shooting Schedule with Live Calendar
interface LiveCalendarProps {
  onDateClick: (day: number) => void;
  shootDays: number[];
}

const LiveCalendar = ({ onDateClick, shootDays }: LiveCalendarProps) => {
  const [currentDate] = useState(new Date());
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4 text-white font-semibold">
        <button className="text-lg text-gray-400 hover:text-white"><FaChevronLeft /></button>
        <span>{month} {year}</span>
        <button className="text-lg text-gray-400 hover:text-white"><FaChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 text-center font-bold text-gray-400">
        {days.map(day => <span key={day}>{day}</span>)}
      </div>
      <div className="grid grid-cols-7 text-center mt-2">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`pad-${i}`} className="p-2"></div>)}
        {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
          <div
            key={day}
            onClick={() => onDateClick(day)}
            className={`p-2 rounded-lg cursor-pointer transition-colors
              ${shootDays.includes(day) ? 'bg-netflix-red text-white font-bold' : 'hover:bg-white/10'}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CrewDashboardPage() {
  const userName = "Crew User";
  const userRole = "Cinematographer";
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [view, setView] = useState('calendar');
  const shootDays = [16]; // Dummy shoot days
  const eventsForDay: { [key: number]: { time: string; title: string; }[] } = { 16: [{ time: "9:00 AM", title: "Shoot: Scene 12B" }] };

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <header className="flex items-center justify-between pb-8 border-b-2 border-white/10">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-gray-400" />
          <div>
            <p className="text-xl md:text-2xl font-semibold">{userName}</p>
            <p className="text-sm text-gray-400">{userRole}</p>
          </div>
        </div>
        <Link href="/">
          <button className="rounded-full bg-netflix-red px-6 py-2 font-bold uppercase text-white shadow-lg transition duration-300 hover:bg-red-700">
            Logout
          </button>
        </Link>
      </header>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ShootingDetailsBanner />
          <DashboardCard
            title="Announcements"
            icon={<FaBullhorn />}
            content="Updates from the director: 'Bring additional lights tomorrow.'"
          />
        </div>
        
        <div className="md:col-span-1">
          <DashboardCard
            title="Shooting Schedule"
            icon={<FaCalendarAlt />}
            className="h-full"
          >
            <div className="mt-4 flex justify-between">
              <button onClick={() => setView('calendar')} className={`rounded px-4 py-2 text-sm ${view === 'calendar' ? 'bg-white/20' : 'text-gray-400 hover:bg-white/10'}`}>Calendar</button>
              <button onClick={() => setView('list')} className={`rounded px-4 py-2 text-sm ${view === 'list' ? 'bg-white/20' : 'text-gray-400 hover:bg-white/10'}`}>List</button>
            </div>
            {view === 'calendar' ? (
              <LiveCalendar onDateClick={handleDateClick} shootDays={shootDays} />
            ) : (
              <p className="mt-4 text-sm text-gray-400">List view is not yet implemented.</p>
            )}
          </DashboardCard>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-anton text-3xl uppercase text-white tracking-wider mb-4">Crew Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Upload Files"
            icon={<FaUpload />}
            content="Upload call sheets, rehearsal notes, and other documents."
            onClick={() => setShowUploadModal(true)}
          />
          <DashboardCard 
            title="Inventory & Props"
            icon={<FaTools />}
            content="Manage equipment and track props. Status: In Use / Missing / Available."
          />
          <DashboardCard 
            title="Scene Checklist"
            icon={<FaCheckCircle />}
            content="Mark scenes as Ready, In Progress, or Completed."
          />
          <DashboardCard 
            title="Scene-wise Notes"
            icon={<FaPencilAlt />}
            content="Technical notes for each scene (e.g., 'Need reshoot due to sound issue')."
          />
          <DashboardCard 
            title="Task Assignments"
            icon={<FaTasks />}
            content="View tasks and deadlines assigned by the Admin."
          />
          <DashboardCard 
            title="Crew Chat"
            icon={<FaComments />}
            content="Department-specific private chat/forum for communication."
          />
        </div>
      </div>
      
      {selectedDate !== null && (
        <EventModal
          date={selectedDate}
          events={eventsForDay[selectedDate] || []}
          onClose={() => setSelectedDate(null)}
        />
      )}

      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </div>
  );
}