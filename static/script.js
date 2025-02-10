function sendMessage() {
    let userInput = document.getElementById("user-input");
    let chatMessages = document.getElementById("chat-messages");

    let userMessage = userInput.value.trim();
    if (userMessage === "") return;

    // Display user message
    let userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.innerText = userMessage;
    chatMessages.appendChild(userMessageDiv);

    // Clear input field
    userInput.value = "";

    // Send message to Flask backend
    fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response
        let botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("bot-message");
        botMessageDiv.innerText = data.response;
        chatMessages.appendChild(botMessageDiv);

        // Auto-scroll to latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => console.error("Error:", error));
}
