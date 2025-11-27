
import React from 'react';
import { ViewState } from '../types';
import { 
  LayoutDashboard, 
  Target, 
  Database, 
  Calculator, 
  BookOpen, 
  Bot, 
  BarChart3,
  Menu,
  X,
  Book
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, setIsOpen }) => {
  const navItems = [
    { view: ViewState.HOME, label: 'Executive Summary', icon: LayoutDashboard },
    { view: ViewState.FRAMEWORK, label: 'Measurement Framework', icon: Target },
    { view: ViewState.KPI_LIBRARY, label: 'KPI Library', icon: Database },
    { view: ViewState.CALCULATOR, label: 'ROI Calculator', icon: Calculator },
    { view: ViewState.CASE_STUDY, label: 'Real-World Example', icon: BarChart3 },
    { view: ViewState.PLAYBOOK, label: 'Adoption Playbook', icon: BookOpen },
    { view: ViewState.AI_ADVISOR, label: 'AI ROI Advisor', icon: Bot },
    { view: ViewState.GLOSSARY, label: 'Glossary of Terms', icon: Book },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-40 transition-transform duration-300 ease-in-out w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static flex-shrink-0 flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex-shrink-0">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AI ROI Guide
          </h1>
          <p className="text-xs text-slate-500 mt-1">Enterprise Measurement</p>
        </div>
        
        {/* Navigation - Flex 1 allows this to grow and scroll */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                ${currentView === item.view 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer - Pinned to bottom naturally via flex layout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <p className="text-xs text-slate-400 text-center">
            Based on the "Guide to AI ROI Measurement"
          </p>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
