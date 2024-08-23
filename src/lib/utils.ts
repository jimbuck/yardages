import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 10) + Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 10);
}