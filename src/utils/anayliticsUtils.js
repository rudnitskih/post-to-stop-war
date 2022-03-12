export const logEvent = (eventName, eventParams) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
}
