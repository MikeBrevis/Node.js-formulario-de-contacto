require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Configurar transporte de correo
// NOTA: Configura tus credenciales de email aquí
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes cambiar el servicio
    auth: {
        user: process.env.EMAIL_USER || 'tu-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'tu-contraseña-app'
    }
});

// Middleware
app.use(express.static('public'));
app.use(express.json());

const { validateName, validateEmail, validateSubject, validateMessage } = require('./validators');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactform.html'));
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validar datos del lado del servidor
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
        return res.status(400).json({ status: 'error', message: nameValidation.error });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
        return res.status(400).json({ status: 'error', message: emailValidation.error });
    }

    const subjectValidation = validateSubject(subject);
    if (!subjectValidation.valid) {
        return res.status(400).json({ status: 'error', message: subjectValidation.error });
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
        return res.status(400).json({ status: 'error', message: messageValidation.error });
    }

    try {
        // Configurar el contenido del email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'tu-email@gmail.com',
            to: process.env.CONTACT_EMAIL || 'destinatario@ejemplo.com', // Email donde recibirás los mensajes
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            replyTo: email
        };

        // Enviar el email
        await transporter.sendMail(mailOptions);

        res.json({ status: 'success', message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send email. Please try again later.' });
    }
});

module.exports = { app, transporter };

