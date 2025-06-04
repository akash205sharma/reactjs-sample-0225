// lib/auth.ts
import { createUserWithEmailAndPassword, reload, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email: string, password: string, username:string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: username,
  });
  await reload(userCredential.user);
  return userCredential;
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
