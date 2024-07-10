"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache"; // To refresh the app

interface TransactionResult {
  message?: string;
  error?: string;
}

async function deleteTransaction(
  transactionId: string
): Promise<TransactionResult> {
  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) return { error: "User not found.." };

  try {
    await db.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    await revalidatePath("/");
    return { message: "Transaction deleted." };
  } catch (error) {
    return { error: "Transaction not deleted." };
  }
}

export default deleteTransaction;
