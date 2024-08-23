import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const ID_LENGTH = 6;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randId() {

  let id = '';
  while (id.length < ID_LENGTH) id += Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 6);

  return id.slice(0, ID_LENGTH);
}