/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'email@mail.com');

    // assert
    expect(emailInput).toHaveValue('email@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'secretpassword');

    // assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call the login function when login button clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'email@mail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'secretpassword');
    const submitButton = await screen.getByRole('button', { name: 'Submit' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'email@mail.com',
      password: 'secretpassword',
    });
  });
});
