
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Bookmark, Calendar, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BottomNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);
  
  // Don't render the navigation bar on desktop
  if (!isMobile) {
    return null;
  }

  const upcomingEvents = [
    { 
      label: 'GitHub Founder Event', 
      href: '/events/an-evening-with-github-cofounder-tom-preston-werner' 
    },
    { 
      label: 'VNTR Investor Forum', 
      href: '/events/vntr-investor-forum' 
    },
  ];

  const navItems = [
    { 
      icon: HomeIcon, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: Bookmark, 
      label: 'Resources', 
      href: '/resources' 
    },
    { 
      icon: Calendar,
      label: 'Upcoming',
      href: '#',
      hasSubmenu: true
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          item.hasSubmenu ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <button className={`flex flex-col items-center ${
                  location.pathname.includes('/events/') 
                    ? 'text-primary' 
                    : 'text-gray-500'
                }`}>
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-1 flex items-center">
                    {item.label}
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mb-12">
                {upcomingEvents.map((event) => (
                  <DropdownMenuItem key={event.href} asChild>
                    <Link 
                      to={event.href}
                      className="w-full text-sm"
                    >
                      {event.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
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
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
