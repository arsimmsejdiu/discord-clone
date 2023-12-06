import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) { // This is an array type. It represents an array, which can be any length.
  return twMerge(clsx(inputs))
}
