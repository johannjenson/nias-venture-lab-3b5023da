import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackScrollDepth } from '@/lib/analytics';

/**
 * Hook to track page views on route changes
 */
export const usePageTracking = () => {
  const location = useLocation();
  const prevPathRef = useRef<string>('');

  useEffect(() => {
    // Only track if path actually changed
    if (location.pathname !== prevPathRef.current) {
      trackPageView(location.pathname + location.search);
      prevPathRef.current = location.pathname;
    }
  }, [location]);
};

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 90%)
 */
export const useScrollTracking = () => {
  const location = useLocation();
  const trackedMilestonesRef = useRef<Set<number>>(new Set());
  const milestones = [25, 50, 75, 90];

  useEffect(() => {
    // Reset tracked milestones on route change
    trackedMilestonesRef.current = new Set();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone && 
          !trackedMilestonesRef.current.has(milestone)
        ) {
          trackedMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone, location.pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
};

/**
 * Combined analytics hook for use in App.tsx
 */
export const useAnalytics = () => {
  usePageTracking();
  useScrollTracking();
};
