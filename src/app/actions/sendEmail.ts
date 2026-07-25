"use server";

import { Resend } from "resend";
import { personalInfo } from "@/lib/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: personalInfo.email,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message: 
${message}
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
