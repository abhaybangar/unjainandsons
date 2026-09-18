"use server";

import { connectDB } from "@/lib/mongodb.js";
import User from "@/models/User.js";
import { hashPassword } from "@/lib/auth.js";

export async function registerUserAction({ name, email, password, phone = "" }) {
  if (!name || !email || !password) {
    return { success: false, error: "Name, email, and password are required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  try {
    await connectDB();

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return { success: false, error: "An account with this email address already exists." };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
      role: "CUSTOMER",
    });

    return {
      success: true,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error) {
    console.error("User registration error:", error);
    return { success: false, error: "Registration failed. Please try again." };
  }
}
