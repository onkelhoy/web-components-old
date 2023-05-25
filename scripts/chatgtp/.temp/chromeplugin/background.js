const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.action === 'askQuestion') {
        askQuestion(message.question);
    }
});

socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});


// public function 
function askQuestion(question) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'askQuestion', question });
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'answerQuestion') {
        // Check if the WebSocket connection is open
        if (socket.readyState === WebSocket.OPEN) {
            // Send the message through the WebSocket
            socket.send(JSON.stringify(message));
        }
  
    }
});

  