// Common utility functions
const utils = {
    // Format date to readable string
    formatDate: (date) => {
        return new Date(date).toLocaleString();
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.row'));
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },

    // Format time remaining
    formatTimeRemaining: (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diff = now - created;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}m remaining`;
        }
        return `${minutes}m remaining`;
    },

    // Calculate progress percentage
    calculateProgress: (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diff = now - created;
        const hours = diff / (1000 * 60 * 60);
        const progress = (hours / 6) * 100; // 6-hour timeline
        return Math.min(progress, 100);
    },

    // Get status color
    getStatusColor: (status) => {
        const colors = {
            'pending': 'warning',
            'in_progress': 'primary',
            'resolved': 'success',
            'escalated': 'danger'
        };
        return colors[status] || 'secondary';
    }
};

// Chat functionality
const chat = {
    // Initialize chat
    init: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const form = container.querySelector('form');
        const input = container.querySelector('input[type="text"]');
        const messages = container.querySelector('.chat-messages');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (message) {
                chat.addMessage(message, true);
                input.value = '';
                // Handle message (implement in specific chat instances)
                if (window.handleChatMessage) {
                    window.handleChatMessage(message);
                }
            }
        });
    },

    // Add message to chat
    addMessage: (message, isUser = false) => {
        const messages = document.querySelector('.chat-messages');
        if (!messages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'} mb-2`;
        messageDiv.textContent = message;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
};

// Complaint management
const complaint = {
    // View complaint details
    viewDetails: async (complaintNo) => {
        try {
            const response = await fetch(`/api/complaints/${complaintNo}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching complaint details:', error);
            utils.showNotification('Error loading complaint details', 'danger');
            return null;
        }
    },

    // Update complaint status
    updateStatus: async (complaintNo, status) => {
        try {
            const response = await fetch('/api/complaints/status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    complaint_no: complaintNo,
                    status: status
                })
            });
            const data = await response.json();
            if (data.success) {
                utils.showNotification('Status updated successfully', 'success');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating status:', error);
            utils.showNotification('Error updating status', 'danger');
            return false;
        }
    },

    // Add comment to complaint
    addComment: async (complaintNo, comment) => {
        try {
            const response = await fetch('/api/complaints/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    complaint_no: complaintNo,
                    comment: comment
                })
            });
            const data = await response.json();
            if (data.success) {
                utils.showNotification('Comment added successfully', 'success');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding comment:', error);
            utils.showNotification('Error adding comment', 'danger');
            return false;
        }
    }
};

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}); 