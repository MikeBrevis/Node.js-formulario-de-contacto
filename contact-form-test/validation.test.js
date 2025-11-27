const { validateName, validateEmail, validateSubject, validateMessage } = require('./validators');

// Tests for validateName
describe('validateName', () => {
  test('should return valid for a valid name', () => {
    expect(validateName('John Doe')).toEqual({ valid: true });
  });

  test('should return error for an empty name', () => {
    expect(validateName('')).toEqual({ valid: false, error: 'Name is required' });
  });

  test('should return error for a name with less than 3 characters', () => {
    expect(validateName('Jo')).toEqual({ valid: false, error: 'Name must be at least 3 characters long' });
  });

  test('should return error for a name with numbers', () => {
    expect(validateName('John123')).toEqual({ valid: false, error: 'Name can only contain letters and spaces' });
  });
});

// Tests for validateEmail
describe('validateEmail', () => {
  test('should return valid for a valid email', () => {
    expect(validateEmail('test@example.com')).toEqual({ valid: true });
  });

  test('should return error for an empty email', () => {
    expect(validateEmail('')).toEqual({ valid: false, error: 'Email is required' });
  });

  test('should return error for an invalid email', () => {
    expect(validateEmail('invalid-email')).toEqual({ valid: false, error: 'Please enter a valid email address' });
  });
});

// Tests for validateSubject
describe('validateSubject', () => {
  test('should return valid for a valid subject', () => {
    expect(validateSubject('This is a subject')).toEqual({ valid: true });
  });

  test('should return error for an empty subject', () => {
    expect(validateSubject('')).toEqual({ valid: false, error: 'Subject is required' });
  });

  test('should return error for a subject with less than 3 characters', () => {
    expect(validateSubject('Hi')).toEqual({ valid: false, error: 'Subject must be at least 3 characters long' });
  });

  test('should return error for a subject with more than 100 characters', () => {
    const longSubject = 'a'.repeat(101);
    expect(validateSubject(longSubject)).toEqual({ valid: false, error: 'Subject cannot exceed 100 characters' });
  });
});

// Tests for validateMessage
describe('validateMessage', () => {
  test('should return valid for a valid message', () => {
    expect(validateMessage('This is a valid message.')).toEqual({ valid: true });
  });

  test('should return error for an empty message', () => {
    expect(validateMessage('')).toEqual({ valid: false, error: 'Message is required' });
  });

  test('should return error for a message with less than 10 characters', () => {
    expect(validateMessage('short')).toEqual({ valid: false, error: 'Message must be at least 10 characters long' });
  });

  test('should return error for a message with more than 5000 characters', () => {
    const longMessage = 'a'.repeat(5001);
    expect(validateMessage(longMessage)).toEqual({ valid: false, error: 'Message cannot exceed 5000 characters' });
  });
});
