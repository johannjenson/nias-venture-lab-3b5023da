
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { HomeIcon, Briefcase, Calendar, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RequestInviteModal from "./RequestInviteModal";

const BottomNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if the URL has a 'join=true' parameter
    if (searchParams.get('join') === 'true') {
      setShowRequestModal(true);
    }
  }, [searchParams]);
  
  // Don't render the navigation bar on desktop
  if (!isMobile) {
    return null;
  }

  const upcomingEvents = [
    { label: "Biban25 Art Gala Dinner", href: "/events/biban25-art-gala-dinner" },
  ];

  const pastEvents = [
    { label: "FII9 Recap", href: "/events/fii9-recap" },
    { label: "FII9 Night Caps", href: "/events/night-cap" },
    { label: "180 Studios Evening", href: "/events/studios180-event" },
    { label: "GitHub Founder Evening", href: "/events/an-evening-with-github-cofounder-tom-preston-werner" },
    { label: "VNTR Investor Forum", href: "/events/vntr-investor-forum" },
    { label: "Business Forum", href: "/events/nias-business-forum" },
    { label: "LEAP Dinner", href: "/events/leap-dinner" },
    { label: "Suhoor Dinner", href: "/events/suhoor-dinner" },
    { label: "Fireside Chats", href: "/events/fireside-chats" },
  ];

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  const navItems = [
    { 
      icon: HomeIcon, 
      label: 'Home', 
      href: '/' 
    },
    { 
      icon: Calendar,
      label: 'Upcoming',
      href: '#',
      hasSubmenu: true,
      submenu: upcomingEvents
    },
    { 
      icon: Calendar,
      label: 'Past',
      href: '#',
      hasSubmenu: true,
      submenu: pastEvents
    },
    { 
      icon: Briefcase, 
      label: 'Apply', 
      href: '/work-with-nias' 
    },
  ];

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-[100]"
        style={{ position: 'fixed', margin: 0, padding: 0 }}
      >
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navItems.map((item) => (
            item.hasSubmenu ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 ${
                      location.pathname.includes('/events/') 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5" strokeWidth={2.5} />
                      {location.pathname.includes('/events/') && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium flex items-center gap-0.5">
                      {item.label}
                      <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  side="top" 
                  className="mb-2 bg-white border border-gray-200 shadow-lg rounded-xl min-w-[200px] animate-in fade-in-0 zoom-in-95 max-h-[60vh] overflow-y-auto"
                  sideOffset={8}
                >
                  {item.submenu?.map((event) => (
                    <DropdownMenuItem 
                      key={event.href} 
                      asChild
                      className="rounded-lg cursor-pointer"
                    >
                      <Link 
                        to={event.href}
                        className="w-full text-sm py-3 px-4 hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={handleNavClick}
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
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 ${
                  location.pathname === item.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
                onClick={handleNavClick}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" strokeWidth={2.5} />
                  {location.pathname === item.href && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          ))}
        </div>
      </nav>
      
      <RequestInviteModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
      />
    </>
  );
};

export default BottomNavigation;
