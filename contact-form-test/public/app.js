const contactForm = document.querySelector('.contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

// Modal elements
const modal = document.getElementById('success-modal');
const closeButton = document.querySelector('.close-button');
const modalMessage = modal.querySelector('p');

// Validation functions
function validateName(nameValue) {
    const trimmedName = nameValue.trim();
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

function validateEmail(emailValue) {
    const trimmedEmail = emailValue.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length === 0) {
        return { valid: false, error: 'Email is required' };
    }
    if (!emailRegex.test(trimmedEmail)) {
        return { valid: false, error: 'Please enter a valid email address' };
    }
    return { valid: true };
}

function validateSubject(subjectValue) {
    const trimmedSubject = subjectValue.trim();
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

function validateMessage(messageValue) {
    const trimmedMessage = messageValue.trim();
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

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function validateForm() {
    const nameValidation = validateName(name.value);
    if (!nameValidation.valid) {
        showModal(`Error: ${nameValidation.error}`);
        return false;
    }

    const emailValidation = validateEmail(email.value);
    if (!emailValidation.valid) {
        showModal(`Error: ${emailValidation.error}`);
        return false;
    }

    const subjectValidation = validateSubject(subject.value);
    if (!subjectValidation.valid) {
        showModal(`Error: ${subjectValidation.error}`);
        return false;
    }

    const messageValidation = validateMessage(message.value);
    if (!messageValidation.valid) {
        showModal(`Error: ${messageValidation.error}`);
        return false;
    }

    return true;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    // Validate form data
    if (!validateForm()) {
        return;
    }

    const formData = {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim()
    };

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Wait for JSON response to be parsed
        const result = await response.json();

        if (!response.ok) {
            // If the response is not OK, handle it by showing the modal
            showModal(`Failed to send message: ${result.message}`);
            return;  // Exit the function early if there's an error
        }

        // Check application-specific status from JSON when response is OK
        if (result.status === 'success') {
            showModal('Email sent successfully!');

            // Reset form fields after successful submission
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            // Handle application-level failure not caught by response.ok
            showModal('Operation failed: ' + result.message);
        }

    } catch (error) {
        // Handle any exceptions that occur during fetch
        console.error('Error:', error);
        showModal('Network error or cannot connect to server');
    }

});

// Close the modal
closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
