import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const promiseState = event.target.elements.state.value;
  form.reset();
  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  prom
    .then(() => {
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.warning({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
