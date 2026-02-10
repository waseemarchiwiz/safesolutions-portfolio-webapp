"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import nodemailer from "nodemailer";

interface ContactUsValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  sender_email: string;
}

// -----------------------------
// Contact Us Action
// -----------------------------
export async function ContactUsAction(
  values: ContactUsValues,
): Promise<ReturnPayload> {
  try {
    const { name, email, subject, message, sender_email } = values;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" };
    }

    // Find recipient in DB
    const getMail = await prisma.companies.findFirst({
      where: { email: sender_email },
    });

    if (!getMail) {
      return {
        success: false,
        message: "Sender email not found in the database.",
      };
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., smtp-mail.outlook.com
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Mail content
    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: getMail.email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Contact Us</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            ${message}
          </p>
          <hr>
          <p style="font-size: 0.9em; color: #555;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    };

    // add in db
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        sender: sender_email,
      },
    });

    // if contact is failed
    if (!contact) {
      return {
        success: false,
        message: "Failed to save contact message to the database.",
      };
    }

    // Send mail
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Your query has been submitted successfully.",
      data: contact,
    };
  } catch (error) {
    console.error("ContactUsAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
