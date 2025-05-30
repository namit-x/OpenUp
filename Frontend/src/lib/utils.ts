import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchDetails() {
  let res = await fetch('http://localhost:5000/details', {
    method: 'POST',
    credentials: 'include',
  });
  let response = await res.json();
  return response;
}