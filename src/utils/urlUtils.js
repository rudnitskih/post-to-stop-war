export const getQueryParam = (param) => {
  return (new URLSearchParams(window.location.search)).get(param);
}


