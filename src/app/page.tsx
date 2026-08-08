import { prisma } from "@/lib/prisma";
import PortfolioClient from "./PortfolioClient";

export const revalidate = 3600; // ISR cache revalidates every hour

export default async function Home() {
  let initialProjects = null;
  let initialExperiences = null;

  try {
    const [projects, experiences] = await Promise.all([
      prisma.project.findMany({ orderBy: { created_at: "desc" } }),
      prisma.experience.findMany(),
    ]);

    if (projects && projects.length > 0) {
      initialProjects = projects as any;
    }
    if (experiences && experiences.length > 0) {
      initialExperiences = experiences;
    }
  } catch (error) {
    console.warn("Database connection failed. Serving fallback UI.", error);
  }

  return (
    <PortfolioClient
      initialProjects={initialProjects}
      initialExperiences={initialExperiences}
    />
  );
}
