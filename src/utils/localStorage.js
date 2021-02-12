import TEST_DATA from '../helpers/testData';

const load = (name = 'calendar') => JSON.parse(window.localStorage.getItem(name)) || TEST_DATA;

const save = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export default { load, save };
