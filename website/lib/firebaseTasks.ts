import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { TaskList } from "@/context/Lists";

const getUserDocRef = (userId: string) => doc(db, "users", userId);

export async function getLists(userId: string): Promise<TaskList[]> {
  const docRef = getUserDocRef(userId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return [];
  return snapshot.data().lists || [];
}

export async function updateAllLists(userId: string, lists: TaskList[]) {
  try {
    const docRef = getUserDocRef(userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { lists });
    } else {
      await setDoc(docRef, { lists: lists });
    }
  } catch (error) {
    console.error("Error updating or creating lists:", error);
  }
}


