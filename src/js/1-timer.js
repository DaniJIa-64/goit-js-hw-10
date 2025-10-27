import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const timeSec = document.querySelector('.value[data-seconds]');
const timeMin = document.querySelector('.value[data-minutes]');
const timeHour = document.querySelector('.value[data-hours]');
const timeDay = document.querySelector('.value[data-days]');
const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

btnStart.addEventListener('click', start);

function start(e) {
  if (btnStart.disabled) {
    return;
  }
  btnStart.disabled = true;
  input.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate.getTime() - currentTime;
    const time = convertMs(deltaTime);
    updateClockface(time);
    if (deltaTime < 1000) {
      input.disabled = false;
      clearInterval(timerId);
    }
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  timeDay.innerHTML = `${days}`;
  timeHour.innerHTML = `${hours}`;
  timeMin.innerHTML = `${minutes}`;
  timeSec.innerHTML = `${seconds}`;
}

const options = {
  locale: Ukrainian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= Date.now()) {
      iziToast.warning({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

let flatpickrDate = new flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
