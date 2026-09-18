import { getCurrentUser } from "./auth.js";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in to continue");
  }
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden: Administrator permissions required");
  }
  return user;
}

export function isAdmin(user) {
  return user?.role === "ADMIN";
}

export function isCustomer(user) {
  return user?.role === "CUSTOMER";
}
