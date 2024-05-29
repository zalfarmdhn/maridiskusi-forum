/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Farhan');

    // Action
    await userEvent.type(nameInput, 'Nama_Saya');

    // assert
    expect(nameInput).toHaveValue('Nama_Saya');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('farhan@gmail.com');

    // action
    await userEvent.type(emailInput, 'email@mail.com');

    // assert
    expect(emailInput).toHaveValue('email@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'secretpassword');

    // assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call the register function when register button clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<RegisterInput register={mockLogin} />);
    const nameInput = await screen.getByPlaceholderText('Farhan');
    await userEvent.type(nameInput, 'Nama_Saya');
    const emailInput = await screen.getByPlaceholderText('farhan@gmail.com');
    await userEvent.type(emailInput, 'email@mail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'secretpassword');
    const submitButton = await screen.getByRole('button', { name: 'Submit' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      name: 'Nama_Saya',
      email: 'email@mail.com',
      password: 'secretpassword',
    });
  });
});
