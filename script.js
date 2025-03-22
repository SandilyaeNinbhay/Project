// script.js
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert('Thank you for contacting us!');
    document.getElementById('contact-form').reset();
  } else {
    alert('Please fill out all fields.');
  }
});
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  // Chatbot Elements
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const sendButton = document.getElementById('send-button');

// Toggle Chatbot Visibility
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  chatbotToggle.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
  chatbotToggle.style.display = 'block';
});

// Send Message Function
sendButton.addEventListener('click', async () => {
  const userMessage = chatbotInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user');
    chatbotInput.value = '';

    // Get AI Response
    const aiResponse = await getAIResponse(userMessage);
    addMessage(aiResponse, 'ai');
  }
});

// Add Message to Chat
function addMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
}

// Get AI Response from OpenAI API
async function getAIResponse(userMessage) {
  const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Sorry, I am unable to respond at the moment.';
  }
}
