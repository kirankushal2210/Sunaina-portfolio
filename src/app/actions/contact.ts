"use server";

import { z } from "zod";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { inngest } from "@/inngest/client";

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

    // Only trigger background emails if a real RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      await inngest.send({
        name: "contact/lead.submitted",
        data: {
          parsedData,
        },
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
