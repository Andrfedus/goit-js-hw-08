import '../css/common.css';
import '../css/03-feedback.css';

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('.feedback-form textarea');


const formData = {
  email: '',
  message: '',
};

messageTextarea();


form.addEventListener('input', throttle(onTextareaInput, 500));

form.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  console.log(formData);
});

function onTextareaInput(event) {
  formData[event.target.name] = event.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}
function messageTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage === null) {
    return;
  }

  textarea.value = savedMessage.message || '';
  input.value = savedMessage.email || '';
  formData.email = savedMessage.email || '';
  formData.message = savedMessage.message || '';
}