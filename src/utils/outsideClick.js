export default (element, clickOutside) => {
  document.addEventListener('click', (event) => {
    if (!element.contains(event.target)) {
      clickOutside();
    }
  });
};
