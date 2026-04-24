"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { ResumeService } from "@/lib/services/resumeService";
import { revalidatePath } from "next/cache";

/**
 * Ensures the current user is synced with our local DB.
 */
async function ensureUserSynced() {
  const user = await currentUser();
  if (!user) {
    // Fallback for disabled auth during testing
    return await ResumeService.syncUser({
      id: "GUEST_USER_ID",
      email: "guest@cvpilot.test",
      name: "Guest Explorer",
      imageUrl: "",
    });
  }

  return await ResumeService.syncUser({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
  });
}

/**
 * Server Action to save a resume.
 */
export async function saveResumeAction(data: {
  id?: string;
  title: string;
  jobTitle?: string;
  content: any;
  matchScore?: number;
  templateId?: string;
}) {
  const { userId: clerkUserId } = await auth();
  const userId = clerkUserId || "GUEST_USER_ID";

  // Sync user first to ensure FK integrity
  await ensureUserSynced();

  const resume = await ResumeService.saveResume(userId, data);
  revalidatePath("/builder");
  return { success: true, resume };
}

/**
 * Server Action to fetch all user resumes.
 */
export async function getResumesAction() {
  const { userId: clerkUserId } = await auth();
  const userId = clerkUserId || "GUEST_USER_ID";

  return await ResumeService.getUserResumes(userId);
}

/**
 * Server Action to delete a resume.
 */
export async function deleteResumeAction(id: string) {
  const { userId: clerkUserId } = await auth();
  const userId = clerkUserId || "GUEST_USER_ID";

  await ResumeService.deleteResume(id, userId);
  revalidatePath("/builder");
  return { success: true };
}
