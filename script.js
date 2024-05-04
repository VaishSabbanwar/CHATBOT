const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const inputField = document.getElementById("userInput");
const chatContainer = document.getElementById("chatBox");

// Replace with your actual API key and URL
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/answers";

// Function to handle user input and make API request
function handleInput(userInput) {
  // Preprocess the user input (optional)
  const text = userInput.toLowerCase().trim();

  // Check for predefined responses (optional, similar to previous example)

  // If no predefined response, make API request
  fetch(${apiUrl}?apiKey=${apiKey}&query=${text})
    .then(response => response.json())
    .then(data => {
      const chatbotResponse = data.response || "Sorry, I couldn't understand."; // Access data from API response
      displayChatMessage(chatbotResponse);
    })
    .catch(error => {
      console.error("Error fetching API response:", error);
      displayChatMessage("An error occurred. Please try again later.");
    });

  // Clear the input field
  inputField.value = "";
}

// Function to display a chat message (reusable)
function displayChatMessage(message) {
  const chatBotMessage = document.createElement("p");
  chatBotMessage.className = "chatbot-text";
  chatBotMessage.textContent = message;
  chatContainer.appendChild(chatBotMessage);
}

// Add event listener to the input field for user input
inputField.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // Check if Enter key is pressed
    const userInput = this.value;
    handleInput(userInput);
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
