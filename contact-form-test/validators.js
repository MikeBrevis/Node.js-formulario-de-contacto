// Funciones de validación
function validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return { valid: false, error: 'Name is required' };
    }
    if (trimmedName.length < 3) {
        return { valid: false, error: 'Name must be at least 3 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
        return { valid: false, error: 'Name can only contain letters and spaces' };
    }
    return { valid: true };
}

function validateEmail(email) {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length === 0) {
        return { valid: false, error: 'Email is required' };
    }
    if (!emailRegex.test(trimmedEmail)) {
        return { valid: false, error: 'Please enter a valid email address' };
    }
    return { valid: true };
}

function validateSubject(subject) {
    const trimmedSubject = subject.trim();
    if (trimmedSubject.length === 0) {
        return { valid: false, error: 'Subject is required' };
    }
    if (trimmedSubject.length < 3) {
        return { valid: false, error: 'Subject must be at least 3 characters long' };
    }
    if (trimmedSubject.length > 100) {
        return { valid: false, error: 'Subject cannot exceed 100 characters' };
    }
    return { valid: true };
}

function validateMessage(message) {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
        return { valid: false, error: 'Message is required' };
    }
    if (trimmedMessage.length < 10) {
        return { valid: false, error: 'Message must be at least 10 characters long' };
    }
    if (trimmedMessage.length > 5000) {
        return { valid: false, error: 'Message cannot exceed 5000 characters' };
    }
    return { valid: true };
}

module.exports = {
    validateName,
    validateEmail,
    validateSubject,
    validateMessage
};
