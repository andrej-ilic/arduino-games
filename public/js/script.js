const changeRoute = route => {
  if (!window.location.href.endsWith(route)) {
    window.location.href = route;
  }
};
