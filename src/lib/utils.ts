import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const ID_LENGTH = 4;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randId(length = ID_LENGTH, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
  let id = '';
  for (let i = length; i > 0; --i) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}