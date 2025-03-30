let chatHistory = [];
let isProcessing = false;

function addMessage(message, isUser = false) {
    const chatBox = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'message-timestamp';
    timestampDiv.textContent = new Date().toLocaleTimeString();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestampDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Add to chat history
    chatHistory.push({
        message: message,
        isUser: isUser,
        timestamp: new Date().toISOString()
    });
}

function showTypingIndicator() {
    const chatBox = document.querySelector('.chat-messages');
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator active';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(indicator);
    chatBox.scrollTop = chatBox.scrollHeight;
    return indicator;
}

function removeTypingIndicator(indicator) {
    if (indicator) {
        indicator.remove();
    }
}

async function handleUserInput(event) {
    event.preventDefault();
    if (isProcessing) return;
    
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    isProcessing = true;
    input.value = '';
    addMessage(message, true);
    
    const typingIndicator = showTypingIndicator();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        removeTypingIndicator(typingIndicator);
        addMessage(data.response);
        
        // If this is an unresolved issue, create a complaint
        if (data.requiresComplaint) {
            const saveResponse = await fetch('/api/chat/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    issue: message,
                    chatHistory: chatHistory
                })
            });
            
            if (!saveResponse.ok) {
                throw new Error('Failed to save complaint');
            }
            
            const saveData = await saveResponse.json();
            if (saveData.complaintCreated) {
                addMessage(`I've created a support ticket for you. Your complaint number is: ${saveData.complaintNo}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator(typingIndicator);
        addMessage('Sorry, there was an error processing your request. Please try again.');
    } finally {
        isProcessing = false;
    }
}

// Initialize chat form
document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', handleUserInput);
    }
    
    // Add initial bot message
    addMessage("Hello! I'm your IT Support Assistant. Please type 'Hi' to start the conversation.");
}); 