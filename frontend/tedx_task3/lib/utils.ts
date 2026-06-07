import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("guestUserId");

  if (!id) {
    id = crypto.randomUUID()
      .replaceAll("-", "")
      .slice(0, 24);

    localStorage.setItem("guestUserId", id);
  }

  return id;
}