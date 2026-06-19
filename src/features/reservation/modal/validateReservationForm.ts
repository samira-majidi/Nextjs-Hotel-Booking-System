export interface ValidationData {
  fullName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export const validateReservationForm = (data: ValidationData): FormErrors => {
  const errors: FormErrors = {};
  const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Guest Name Validation
  if (!data.fullName.trim()) {
    errors.fullName = 'Guest name is required.';
  } else if (data.fullName.length > 100) {
    errors.fullName = 'Guest name must be less than 100 characters.';
  }

  // Phone Number Validation (DTO pattern - Optional but validated if provided)
  if (data.phoneNumber && !phoneRegex.test(data.phoneNumber.trim())) {
    errors.phoneNumber = 'Your phone number is not valid.';
  }

  // Register Validation (Only for non-logged-in users)
  if (!data.isLoggedIn) {
    if (!data.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required.';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
  }

  return errors;
};
