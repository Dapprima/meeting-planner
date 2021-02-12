import './create-event.scss';
import outsideClick from '../utils/outsideClick';
import localStorage from '../utils/localStorage';

const closeAlert = () => {
  const alert = document.querySelector('.alert-wrapper');
  alert.classList.remove('visible');
};

const showAlert = () => {
  const alert = document.querySelector('.alert-wrapper');
  alert.classList.add('visible');
  setTimeout(closeAlert, 2000);
};

const submitHandler = (e) => {
  e.preventDefault();
  const name = document.querySelector('#event-name').value;
  const participents = document.querySelector('.input').value;
  const day = document.querySelector('#day').value;
  const time = document.querySelector('#time').value;

  const data = localStorage.load();
  if (data[day][time]) showAlert();
  else {
    data[day][time] = { participents: participents.split(','), name };
    localStorage.save('calendar', data);
    window.location.href = '../calendar.html';
  }
};

const closeSelector = () => {
  const selector = document.querySelector('#participents');
  selector.classList.remove('visible');
};

const openSelector = () => {
  const selector = document.querySelector('#participents');
  selector.classList.add('visible');
};

const toggleSelector = () => {
  const selector = document.querySelector('#participents');
  if (selector.classList.contains('visible')) closeSelector();
  else openSelector();
};

const selectHandler = (e) => {
  if (e.target.nodeName === 'LI') {
    const selected = e.target.textContent;
    const input = document.querySelector('.input');
    if (e.target.classList.contains('selected'))e.target.classList.remove('selected');
    else e.target.classList.add('selected');
    if (input.value.includes(selected)) input.value = input.value.replace(`, ${selected}`, '').replace(`${selected},`, '');
    else input.value += `, ${selected}`;
  }
};

window.outsideClick = outsideClick;

window.outsideClick(document.querySelector('#custom-selector'), closeSelector);

document.querySelector('.input-container').addEventListener('click', toggleSelector);

document.querySelector('#participents').addEventListener('click', selectHandler);

document.querySelector('#close-alert').addEventListener('click', closeAlert);

document.querySelector('#form').addEventListener('submit', submitHandler);
