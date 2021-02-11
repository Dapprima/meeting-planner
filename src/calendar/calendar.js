import './calendar.scss';
import localStorage from '../utils/localStorage';
import TEST_DATA from '../helpers/testData';

const renderTableCell = (data, day, time, filter) => {
  const render = filter !== 'all'
    ? Boolean(data && data.participents.filter((itm) => itm === filter).length)
    : data;
  return render ? `<td class="planned">
        <div>
            <p>${data.name}</p>
            <span data-day='${day}' data-time='${time}' data-filter='${filter}'>&times;</span>
        </div>
    </td>`
    : '<td></td>';
};
const renderTableRow = (data, index, filter) => {
  let html = index
    ? ''
    : `<tr>
          <th>Name</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
      </tr>`;
  html += `
        <tr>
            <td>1${index}:00</td>
            ${renderTableCell(data.Mon[`1${index}:00`], 'Mon', `1${index}:00`, filter)}
            ${renderTableCell(data.Tue[`1${index}:00`], 'Tue', `1${index}:00`, filter)}
            ${renderTableCell(data.Wed[`1${index}:00`], 'Wed', `1${index}:00`, filter)}
            ${renderTableCell(data.Thu[`1${index}:00`], 'Thu', `1${index}:00`, filter)}
            ${renderTableCell(data.Fri[`1${index}:00`], 'Fri', `1${index}:00`, filter)}
        </tr>`;

  return html;
};

const drawCalendar = (filter = 'all') => {
  const calendar = document.querySelector('#table');
  const data = localStorage.load('calendar') || TEST_DATA;
  calendar.innerHTML = '';
  const content = Array(9)
    .fill(0)
    .map((_, index) => renderTableRow(data, index, filter));
  calendar.insertAdjacentHTML('beforeend', content.join(''));
};

const deleteEvent = (e) => {
  if (e.target.dataset.day) {
    const result = localStorage.load('calendar') || TEST_DATA;
    const { day, time, filter } = e.target.dataset;
    delete result[day][time];
    localStorage.save('calendar', result);
    drawCalendar(filter);
  }
};
const deleteModal = (e) => {
  if (e.target.dataset.day) {
    const modal = document.querySelector('.modal-wrapper');
    modal.classList.add('visible');
    modal.addEventListener('click', (event) => {
      const { btn } = event.target.dataset;
      if (btn === 'close') modal.classList.remove('visible');
      if (btn === 'delete') {
        modal.classList.remove('visible');
        deleteEvent(e);
      }
    });
  }
};

const filterCalendar = (e) => {
  const filter = e.target.value;
  drawCalendar(filter);
};

drawCalendar();

document.querySelector('#filter').addEventListener('change', filterCalendar);
document.querySelector('#table').addEventListener('click', deleteModal);
