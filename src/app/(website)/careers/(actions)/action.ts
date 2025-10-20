"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import nodemailer from "nodemailer";

export interface EasyApplyTypes {
  name: string;
  email: string;
  phone?: string;
  experience: string;
  message: string;
  sender_email: string;
  portfolioType: "file" | "url";
  portfolioUrl?: string;
  file?: File | null;
  portfolioFile?: File | null;
}

// -----------------------------
// Easy Apply Action
// -----------------------------
export async function EasyApplyAction(
  values: EasyApplyTypes
): Promise<ReturnPayload> {
  try {
    const {
      name,
      email,
      phone,
      experience,
      message,
      sender_email,
      portfolioType,
      portfolioUrl,
      file,
      portfolioFile,
    } = values;

    // ✅ Validate required fields
    if (!name || !email || !experience || !message) {
      return { success: false, message: "All fields are required." };
    }

    // ✅ Validate portfolio
    if (portfolioType === "file") {
      if (!file || !portfolioFile) {
        return {
          success: false,
          message:
            "Please upload both file and portfolioFile in PDF or DOCX format.",
        };
      }
    } else if (portfolioType === "url" && !portfolioUrl) {
      return {
        success: false,
        message: "Please provide a valid portfolio URL.",
      };
    }

    // ✅ Fetch recipient email
    const getMail = await prisma.companies.findFirst({
      where: { email: sender_email },
    });
    if (!getMail) {
      return {
        success: false,
        message: "Sender email not found in the database.",
      };
    }

    // ✅ Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // "smtp-mail.outlook.com"
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // ✅ Build attachments
    const attachments: { filename: string; content: Buffer }[] = [];
    if (file instanceof File) {
      attachments.push({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      });
    }
    if (portfolioFile instanceof File) {
      attachments.push({
        filename: portfolioFile.name,
        content: Buffer.from(await portfolioFile.arrayBuffer()),
      });
    }

    // ✅ Build email
    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: getMail.email,
      subject: "Easy Apply",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Easy Apply</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone ?? "-"}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Portfolio:</strong> ${
            portfolioUrl
              ? `<a href="${portfolioUrl}">${portfolioUrl}</a>`
              : "See attached files"
          }</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            ${message}
          </p>
          <hr>
          <p style="font-size: 0.9em; color: #555;">
            This email was sent from your Easy Apply form.
          </p>
        </div>
      `,
      attachments,
    };

    // ✅ Send mail
    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully!",
      data: result,
    };
  } catch (error) {
    console.error("EasyApplyAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
