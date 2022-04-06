export const getQueryParam = (param) => {
  return (new URLSearchParams(window.location.search)).get(param);
}

export const setSiteLang = (siteLang) => {
  let pathname = `/${siteLang}`;

  if (getSelectedCountry()) {
    pathname += `/${getSelectedCountry()}`;
  }

  setPathname(pathname);
}

export const setSelectedCountry = (selectedCountry) => {
  setPathname(`/${getSiteLang()}/${selectedCountry}`);
}

export const getSiteLang = () => {
  return (window.location.pathname.split('/')[1] || 'ua').toLowerCase();
}

export const getSelectedCountry = () => {
  return window.location.pathname.split('/')[2]?.toUpperCase();
}

const setPathname = (pathname) => {
  const {protocol, host, search} = window.location;
  let newUrl = `${protocol}//${host}${pathname.toLowerCase()}`;

  if (search) {
    newUrl += `${search}`;
  }

  window.history.pushState({path: newUrl}, '', newUrl);
}
