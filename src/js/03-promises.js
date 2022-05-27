import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const creationData = {
    delay: Number(refs.delay.value),
    step: Number(refs.step.value),
    amount: Number(refs.amount.value),
  }

  if (0 > creationData.delay || 0 > creationData.step) {
    console.log('creationData.delay', creationData.delay);
    console.log('creationData.step', creationData.step);
    return;
  }
  
  preparePromiseCreate(creationData);
}

function preparePromiseCreate({ delay, step, amount }) {
  
  for (let position = 1; position <= amount; position += 1) {

    createPromise(position, delay)
      .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
 }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
   setTimeout(() => {
  if (shouldResolve) {
    resolve({ position: position, delay: delay });
  } else {
    reject({ position: position, delay: delay });
  }
   }, delay);
    });
}