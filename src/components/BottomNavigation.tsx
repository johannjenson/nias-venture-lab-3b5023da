
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Search, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Don't render the navigation bar on desktop
  if (!isMobile) {
    return null;
  }

  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: Calendar, 
      label: 'Github Event', 
      href: '/events/an-evening-with-github-cofounder-tom-preston-werner' 
    },
    { 
      icon: Search, 
      label: 'Resources', 
      href: '/resources' 
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/login' 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href} 
            className={`flex flex-col items-center ${
              location.pathname === item.href 
                ? 'text-primary' 
                : 'text-gray-500'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
