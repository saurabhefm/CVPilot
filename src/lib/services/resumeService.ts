import db from "@/lib/db";

export class ResumeService {
  /**
   * Saves or updates a resume for a given user.
   */
  static async saveResume(userId: string, data: {
    id?: string;
    title: string;
    jobTitle?: string;
    content: any;
    matchScore?: number;
    templateId?: string;
  }) {
    if (data.id) {
      return await db.resume.update({
        where: { id: data.id, userId },
        data: {
          title: data.title,
          jobTitle: data.jobTitle,
          content: data.content,
          matchScore: data.matchScore,
          templateId: data.templateId,
        }
      });
    }

    return await db.resume.create({
      data: {
        userId,
        title: data.title,
        jobTitle: data.jobTitle,
        content: data.content,
        matchScore: data.matchScore,
        templateId: data.templateId || "modern",
      }
    });
  }

  /**
   * Retrieves all resumes for a specific user.
   */
  static async getUserResumes(userId: string) {
    return await db.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" }
    });
  }

  /**
   * Retrieves a single resume by ID.
   */
  static async getResumeById(id: string, userId: string) {
    return await db.resume.findUnique({
      where: { id, userId }
    });
  }

  /**
   * Deletes a resume.
   */
  static async deleteResume(id: string, userId: string) {
    return await db.resume.delete({
      where: { id, userId }
    });
  }

  /**
   * Syncs user details from Clerk to our DB.
   */
  static async syncUser(data: {
    id: string;
    email: string;
    name?: string;
    imageUrl?: string;
  }) {
    return await db.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        name: data.name,
        imageUrl: data.imageUrl,
      },
      create: {
        id: data.id,
        email: data.email,
        name: data.name,
        imageUrl: data.imageUrl,
      }
    });
  }
}
