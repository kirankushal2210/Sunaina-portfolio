"use server";

import { z } from "zod";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

// Ensure Prisma is instantiated correctly for Prisma 7
const getPrisma = () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  serviceRequested: z.string().min(2, "Service requested is required"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      serviceRequested: formData.get("serviceRequested"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    const parsedData = contactSchema.parse(data);

    // Save to Database
    const prisma = getPrisma();
    await prisma.contactMessage.create({
      data: parsedData,
    });
    
    // Disconnect Prisma correctly
    await prisma.$disconnect();

    // Only attempt to send emails if a real RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      // 1. Notify Owner
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", // Replace with verified domain in production
        to: "hello@yourdomain.com", // Replace with your email
        subject: `New Lead: ${parsedData.serviceRequested} from ${parsedData.name}`,
        html: `
          <h1>New Lead Details</h1>
          <p><strong>Name:</strong> ${parsedData.name}</p>
          <p><strong>Email:</strong> ${parsedData.email}</p>
          <p><strong>Service Requested:</strong> ${parsedData.serviceRequested}</p>
          <p><strong>Budget:</strong> ${parsedData.budget}</p>
          <p><strong>Message:</strong></p>
          <p>${parsedData.message}</p>
        `,
      });

      // 2. Auto-Responder to Prospect
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: parsedData.email,
        subject: "Thanks for reaching out!",
        html: `
          <h2>Hi ${parsedData.name},</h2>
          <p>Thanks for getting in touch about your ${parsedData.serviceRequested} project!</p>
          <p>I have received your message and will get back to you within 24-48 hours to discuss next steps.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>Portfolio Owner</strong></p>
        `,
      });
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
