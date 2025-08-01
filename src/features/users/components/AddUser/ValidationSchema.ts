/* eslint-disable no-useless-escape */
import type { FormErrors } from '../../../../types/global.types';
import type { AddUserFormData } from '../../users.types';

export class ValidationSchema {
	static validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	static validatePhone(phone: string): boolean {
		// Flexible phone validation (US format)
		const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
		return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
	}

	static validateUrl(url: string): boolean {
		if (!url) return true; // Optional field
		try {
			new URL(url.startsWith('http') ? url : `https://${url}`);
			return true;
		} catch {
			return false;
		}
	}

	static validateRequired(value: string): boolean {
		return value.trim().length > 0;
	}

	static validateForm(data: AddUserFormData): FormErrors {
		const errors: FormErrors = {};

		// Required field validations
		if (!this.validateRequired(data.name)) {
			errors.name = 'Full name is required';
		}

		if (!this.validateRequired(data.username)) {
			errors.username = 'Username is required';
		} else if (data.username.length < 3) {
			errors.username = 'Username must be at least 3 characters';
		}

		if (!this.validateRequired(data.email)) {
			errors.email = 'Email is required';
		} else if (!this.validateEmail(data.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!this.validateRequired(data.address.city)) {
			errors['address.city'] = 'City is required';
		}

		if (!this.validateRequired(data.company.name)) {
			errors['company.name'] = 'Company name is required';
		}

		// Optional field validations
		if (data.phone && !this.validatePhone(data.phone)) {
			errors.phone = 'Please enter a valid phone number';
		}

		if (data.website && !this.validateUrl(data.website)) {
			errors.website = 'Please enter a valid website URL';
		}

		return errors;
	}
}
