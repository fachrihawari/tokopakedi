'use server';

import { redirect } from "next/navigation";
import { setQueryParams } from "../utils/url";

export const register = async (formData: FormData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      name: formData.get('name'),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status !== 201) {
    const errorQuery = setQueryParams({ type: 'error', title: "Registration Failed", message: data.errors.join(',') })
    redirect('/register?' + errorQuery);
  }

  const successQuery = setQueryParams({ type: 'success', title: "Registration Successful", message: "You have successfully registered. Please login to continue." })
  redirect('/login?' + successQuery);
};