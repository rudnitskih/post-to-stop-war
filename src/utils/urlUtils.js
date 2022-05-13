export const getQueryParam = (param) => {
  return (new URLSearchParams(window.location.search)).get(param);
}

export const getSiteLang = () => {
  return (window.location.pathname.split('/')[1] || 'en').toLowerCase();
}
