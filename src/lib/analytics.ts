/**
 * Google Analytics Tracking Utility
 * Comprehensive engagement and conversion tracking for nias.io
 */

// Extend window to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Event categories
export type EventCategory = 
  | 'cta_click'
  | 'form_submit'
  | 'form_start'
  | 'form_step'
  | 'page_view'
  | 'scroll_depth'
  | 'external_link'
  | 'navigation'
  | 'modal_open'
  | 'modal_close'
  | 'download'
  | 'video'
  | 'social';

// CTA locations for tracking
export type CTALocation = 
  | 'hero'
  | 'hero_secondary'
  | 'network_section'
  | 'work_with_nias_section'
  | 'explore_section'
  | 'expansion_capital_section'
  | 'footer'
  | 'navigation'
  | 'event_page'
  | 'gathering_card'
  | 'modal';

// CTA names for tracking
export type CTAName = 
  | 'for_institutional_platforms'
  | 'for_founders_advisors'
  | 'explore_vision_2030'
  | 'request_access'
  | 'request_membership'
  | 'family_office'
  | 'work_with_nias'
  | 'vision_2030'
  | 'real_estate'
  | 'submit_application'
  | 'download_guide'
  | 'join_network'
  | 'request_event_invite'
  | 'gathering_view'
  | 'contact_form'
  | 'for_founders'
  | 'for_strategic_partners'
  | 'client_login'
  | 'team'
  | 'clients_partners'
  | 'privacy_policy'
  | 'terms_of_use'
  | 'linkedin'
  | 'instagram'
  | 'saudi_budget_announcement';

// Form types for tracking
export type FormType = 
  | 'network_request'
  | 'event_invite'
  | 'company_application'
  | 'fund_application'
  | 'advisor_application'
  | 'expansion_capital'
  | 'real_estate_inquiry'
  | 'contact_form'
  | 'newsletter';

// Event parameters interface
interface BaseEventParams {
  category: EventCategory;
}

interface CTAClickParams extends BaseEventParams {
  category: 'cta_click';
  cta_name: CTAName;
  cta_location: CTALocation;
  destination?: string;
}

interface FormSubmitParams extends BaseEventParams {
  category: 'form_submit';
  form_type: FormType;
  form_location?: string;
  success: boolean;
}

interface FormStartParams extends BaseEventParams {
  category: 'form_start';
  form_type: FormType;
  form_location?: string;
}

interface FormStepParams extends BaseEventParams {
  category: 'form_step';
  form_type: FormType;
  step_number: number;
  step_name?: string;
}

interface PageViewParams extends BaseEventParams {
  category: 'page_view';
  page_path: string;
  page_title?: string;
}

interface ScrollDepthParams extends BaseEventParams {
  category: 'scroll_depth';
  percent: number;
  page_path: string;
}

interface ExternalLinkParams extends BaseEventParams {
  category: 'external_link';
  link_url: string;
  link_text?: string;
  location?: CTALocation;
}

interface NavigationParams extends BaseEventParams {
  category: 'navigation';
  nav_item: string;
  nav_location: 'header' | 'footer' | 'bottom_nav';
}

interface ModalParams extends BaseEventParams {
  category: 'modal_open' | 'modal_close';
  modal_name: string;
}

interface SocialParams extends BaseEventParams {
  category: 'social';
  platform: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
  action: 'share' | 'follow' | 'click';
}

type EventParams = 
  | CTAClickParams 
  | FormSubmitParams 
  | FormStartParams
  | FormStepParams
  | PageViewParams 
  | ScrollDepthParams 
  | ExternalLinkParams 
  | NavigationParams 
  | ModalParams
  | SocialParams;

/**
 * Core tracking function
 */
export const trackEvent = (eventName: string, params: EventParams): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      send_to: ['G-PF5EZ7EWMV', 'G-0XFR2MD37G'],
    });
    
    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, params);
    }
  }
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (
  ctaName: CTAName, 
  ctaLocation: CTALocation, 
  destination?: string
): void => {
  trackEvent('cta_clicked', {
    category: 'cta_click',
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (
  formType: FormType, 
  success: boolean, 
  formLocation?: string
): void => {
  trackEvent('form_submitted', {
    category: 'form_submit',
    form_type: formType,
    form_location: formLocation,
    success,
  });
};

/**
 * Track form start (first interaction)
 */
export const trackFormStart = (formType: FormType, formLocation?: string): void => {
  trackEvent('form_started', {
    category: 'form_start',
    form_type: formType,
    form_location: formLocation,
  });
};

/**
 * Track form step progression
 */
export const trackFormStep = (
  formType: FormType, 
  stepNumber: number, 
  stepName?: string
): void => {
  trackEvent('form_step_completed', {
    category: 'form_step',
    form_type: formType,
    step_number: stepNumber,
    step_name: stepName,
  });
};

/**
 * Track page views (for SPA navigation)
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Standard GA4 page_view
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
      send_to: ['G-PF5EZ7EWMV', 'G-0XFR2MD37G'],
    });
  }
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percent: number, pagePath: string): void => {
  trackEvent('scroll_depth', {
    category: 'scroll_depth',
    percent,
    page_path: pagePath,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (
  linkUrl: string, 
  linkText?: string, 
  location?: CTALocation
): void => {
  trackEvent('external_link_click', {
    category: 'external_link',
    link_url: linkUrl,
    link_text: linkText,
    location,
  });
};

/**
 * Track modal interactions
 */
export const trackModal = (action: 'open' | 'close', modalName: string): void => {
  trackEvent(action === 'open' ? 'modal_opened' : 'modal_closed', {
    category: action === 'open' ? 'modal_open' : 'modal_close',
    modal_name: modalName,
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (
  navItem: string, 
  navLocation: 'header' | 'footer' | 'bottom_nav'
): void => {
  trackEvent('navigation_click', {
    category: 'navigation',
    nav_item: navItem,
    nav_location: navLocation,
  });
};

/**
 * Track social interactions
 */
export const trackSocial = (
  platform: 'linkedin' | 'instagram' | 'twitter' | 'facebook',
  action: 'share' | 'follow' | 'click'
): void => {
  trackEvent('social_interaction', {
    category: 'social',
    platform,
    action,
  });
};

/**
 * Track gathering/event page views
 */
export const trackGatheringView = (gatheringName: string, gatheringPath: string): void => {
  trackEvent('gathering_viewed', {
    category: 'cta_click',
    cta_name: 'gathering_view',
    cta_location: 'gathering_card',
    destination: gatheringPath,
  });
};

// Conversion events for GA4 (these should be set up as conversions in GA4 admin)
export const CONVERSION_EVENTS = {
  NETWORK_REQUEST_SUBMITTED: 'network_request_submitted',
  EVENT_INVITE_SUBMITTED: 'event_invite_submitted',
  COMPANY_APPLICATION_SUBMITTED: 'company_application_submitted',
  FUND_APPLICATION_SUBMITTED: 'fund_application_submitted',
  ADVISOR_APPLICATION_SUBMITTED: 'advisor_application_submitted',
  EXPANSION_GUIDE_REQUESTED: 'expansion_guide_requested',
  ACCESS_CTA_CLICKED: 'access_cta_clicked',
  PRIVATE_CTA_CLICKED: 'private_cta_clicked',
} as const;

/**
 * Track conversion event
 */
export const trackConversion = (
  conversionEvent: keyof typeof CONVERSION_EVENTS,
  additionalParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', CONVERSION_EVENTS[conversionEvent], {
      ...additionalParams,
      send_to: ['G-PF5EZ7EWMV', 'G-0XFR2MD37G'],
    });
  }
};
