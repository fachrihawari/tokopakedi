'use server';

import { redirect } from "next/navigation";
import { setQueryParams } from "../utils/url";
import { cookies } from "next/headers";

export const register = async (formData: FormData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/auth/register", {
    method: "POST",
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      name: formData.get('name'),
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    const errorQuery = setQueryParams({ type: 'error', title: "Registration Failed", message: data.errors.join(',') })
    redirect('/register?' + errorQuery);
  }

  const successQuery = setQueryParams({ type: 'success', title: "Registration Successful", message: "You have successfully registered. Please login to continue." })
  redirect('/login?' + successQuery);
};

export const login = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorQuery = setQueryParams({ type: 'error', title: "Login Failed", message: data.errors.join(',') });
    redirect('/login?' + errorQuery);
  }

  // Set the token in a cookie
  cookies().set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  const successQuery = setQueryParams({ type: 'success', title: "Login Successful", message: "You have successfully logged in." });
  redirect('/?' + successQuery);
};

export const logout = async () => {
  cookies().delete('token');
  redirect('/');
};
