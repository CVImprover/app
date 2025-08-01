export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Log page views
export const pageview = (url: string): void => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Log custom events
interface EventParams {
  action: string
  category: string
  label?: string
  value?: number
}

export const event = ({ action, category, label, value }: EventParams): void => {
  if (typeof window === 'undefined') return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track CV uploads (example for your app)
export const trackCVUpload = (fileType: string): void => {
  event({
    action: 'cv_upload',
    category: 'engagement',
    label: fileType,
  })
}

// Track CV improvements requested
export const trackCVImprovement = (): void => {
  event({
    action: 'cv_improvement_requested',
    category: 'engagement',
  })
}
