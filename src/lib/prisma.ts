import { MOCK_PROJECTS, MOCK_EXPERIENCES, type Project, type Experience } from '@/data/portfolioData';

// Standalone in-memory fallback store — no PostgreSQL or external database required!
let projects: (Project & { created_at?: Date })[] = MOCK_PROJECTS.map((p, idx) => ({
  ...p,
  created_at: new Date(Date.now() - idx * 86400000),
}));
let experiences: Experience[] = [...MOCK_EXPERIENCES];
let contactMessages: any[] = [];
let leads: any[] = [];

export const prisma = {
  project: {
    findMany: async (args?: any) => {
      let result = [...projects];
      if (args?.where?.OR) {
        const query = (args.where.OR[0]?.title?.contains || "").toLowerCase();
        if (query) {
          result = result.filter((p) =>
            p.title.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.client.toLowerCase().includes(query) ||
            p.content.toLowerCase().includes(query)
          );
        }
      }
      if (args?.take) {
        result = result.slice(0, args.take);
      }
      return result;
    },
    create: async ({ data }: any) => {
      const newProj = { id: String(Date.now()), ...data, created_at: new Date() };
      projects.unshift(newProj);
      return newProj;
    },
  },
  experience: {
    findMany: async () => [...experiences],
  },
  contactMessage: {
    create: async ({ data }: any) => {
      const item = { id: String(Date.now()), ...data, created_at: new Date() };
      contactMessages.push(item);
      return item;
    },
  },
  lead: {
    create: async ({ data }: any) => {
      const item = { id: String(Date.now()), ...data, created_at: new Date() };
      leads.push(item);
      return item;
    },
    findMany: async () => [...leads],
  },
};
