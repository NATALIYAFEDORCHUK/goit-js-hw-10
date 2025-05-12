import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStates = document.querySelectorAll('input[name="state"]');

function successMessage(delay) {
  iziToast.success({
    title: '✅ Success',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    backgroundColor: '#59a10d',
  });
}

function collapseMessage(delay) {
  iziToast.error({
    title: '❌ Error',
    message: `Rejected promise in ${delay}ms`,
    position: 'topRight',
    backgroundColor: '#ef4040',
  });
}

function addPromise(delay, state, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      callback(successMessage, delay);
    })
    .catch(delay => {
      callback(collapseMessage, delay);
    });
}

function clearForm() {
  inputDelay.value = '';
  inputStates.forEach(input => (input.checked = false));
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const delay = Number(inputDelay.value);
  const state = [...inputStates].find(input => input.checked)?.value;

  if (!delay || delay <= 0) {
    errorMessage('Please fill in the field.');
    return;
  }

  if (!state) {
    errorMessage('Please select a promise state (fulfilled or rejected).');
    return;
  }

  clearForm();

  addPromise(delay, state, (msgFunc, delayTime) => {
    msgFunc(delayTime);
  });
});
