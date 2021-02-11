const load = (name) => JSON.parse(window.localStorage.getItem(name));

const save = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export default { load, save };
