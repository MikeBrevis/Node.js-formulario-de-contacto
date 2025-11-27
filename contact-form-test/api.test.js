const request = require('supertest');
const { app, transporter } = require('./serve');

describe('POST /send-email', () => {
  let sendMailSpy;

  beforeEach(() => {
    // Create a spy on the sendMail method of the transporter
    sendMailSpy = jest.spyOn(transporter, 'sendMail').mockImplementation(() => Promise.resolve({}));
  });

  afterEach(() => {
    // Restore the original sendMail method
    sendMailSpy.mockRestore();
  });

  it('should return success and send an email when valid data is sent', async () => {
    const response = await request(app)
      .post('/send-email')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');

    // Verify that sendMail was called once
    expect(sendMailSpy).toHaveBeenCalledTimes(1);

    // Verify that sendMail was called with the correct arguments
    const mailOptions = sendMailSpy.mock.calls[0][0];
    expect(mailOptions.to).toBe(process.env.CONTACT_EMAIL || 'destinatario@ejemplo.com');
    expect(mailOptions.subject).toBe('New Contact Form Submission: Test Subject');
    expect(mailOptions.html).toContain('John Doe');
  });

  it('should return error for an invalid name', async () => {
    const response = await request(app)
      .post('/send-email')
      .send({
        name: 'J',
        email: 'john.doe@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name must be at least 3 characters long');
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should return error for an invalid email', async () => {
    const response = await request(app)
      .post('/send-email')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message.',
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please enter a valid email address');
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});