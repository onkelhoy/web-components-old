// Send a message to the background script
function returnAnswer(answer) {
    chrome.runtime.sendMessage({ action: 'answerQuestion', answer });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAnswer') {
      // Call the function you want to perform
      getWindow(message.question);
    }
});

function getWindow() {
    let target = document.documentElement;
    console.log(target);
}

function triggerQuestion(question) {
    // const textarea = document.querySelector('textarea');
    // textarea.value = question;
    // const button = textarea.nextElementSibling;
    // button.removeAttribute("disabled");
    // button.click();

}



function injectScript(func) {
    const script = document.createElement('script');
    script.textContent = `(${func.toString()})();`;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}
function interceptNetwork() {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const response = await originalFetch.apply(this, args);
        const clonedResponse = response.clone();
    
        // Log request payload
        if (args[1] && args[1].body) {
            console.log('Fetch Request Payload:', args[1].body);
        }
    
        // Log response payload
        clonedResponse.text().then((text) => {
            console.log('Fetch Response Payload:', text);
        });
    
        return response;
    };
}  
  