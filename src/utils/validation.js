export const validateUser = user => {
  const errors = {};

  if (!user.name || user.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!user.phone || user.phone.trim().length < 10) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!user.username || user.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
