'use client';

import { login, signup } from '@/app/server-actions/login-signup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(formData: FormData) {
    const error = await login(formData);
    setErrorMessage(error || '');
  }

  async function handleSignup(formData: FormData) {
    const error = await signup(formData);
    setErrorMessage(error || '');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 shadow-md">
        <div className="flex flex-col w-96 justify-center">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email:</Label>
              <Input
                placeholder="johndoe@mail.com"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
              )}
            </div>
            <div className="flex space-x-6">
              <Button formAction={handleLogin}>Log in</Button>
              <Button formAction={handleSignup}>Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
