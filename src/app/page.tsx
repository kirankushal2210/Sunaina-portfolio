import PortfolioClient from "./PortfolioClient";
import { MOCK_PROJECTS, MOCK_EXPERIENCES } from "@/data/portfolioData";

export const revalidate = 3600;

export default function Home() {
  return (
    <PortfolioClient
      initialProjects={MOCK_PROJECTS}
      initialExperiences={MOCK_EXPERIENCES}
    />
  );
}
