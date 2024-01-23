import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const backupImageDataUrlItemSchema = z.object({
  imageDataUrl: z.string(),
  groupId: z.string(),
});
type TBackupImageDataUrlItem = z.infer<typeof backupImageDataUrlItemSchema>;

type TSelectedImageDataUrlItem = z.infer<typeof selectedImageDataUrlItemSchema>;
const selectedImageDataUrlItemSchema = z.object({
  imageDataUrl: z.string(),
});
type SafeParseOutput<T extends z.AnyZodObject> = z.infer<T>;

export const readDocumentById = async <T extends z.AnyZodObject>(p: {
  id: string;
  collectionName: string;
  zodSchema: T;
}) => {
  const docRef = doc(db, p.collectionName, p.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const parseResponse = p.zodSchema.safeParse(docSnap.data()) as SafeParseOutput<T>;

  if (!parseResponse.success) return;

  return { id: p.id, ...parseResponse.data };
};

const a = await readDocumentById({
  id: 'asd',
  collectionName: 'selectedImageDataUrls',
  zodSchema: selectedImageDataUrlItemSchema,
});
console.log(`firestoreUtils.ts:${/*LL*/ 55}`, { a });

export const readAllDocumentsInCollection = async () => {
  const items: TSelectedImageDataUrlItem[] = [];
  const querySnapshot = await getDocs(collection(db, 'selectedImageDataUrls'));

  return new Promise(resolve => {
    querySnapshot.forEach(doc => {
      const parseResponse = selectedImageDataUrlItemSchema.safeParse(doc.data());
      if (parseResponse.success) items.push(parseResponse.data);
    });
    resolve(items);
  });
};

export const readSelectedImageDataUrlItemById = async (id: string) => {
  return readDocumentById({
    id,
    collectionName: 'selectedImageDataUrls',
    zodSchema: selectedImageDataUrlItemSchema,
  });
};

export const readAllSelectedImageDataUrlItems = async () => {
  const items: TSelectedImageDataUrlItem[] = [];
  const querySnapshot = await getDocs(collection(db, 'selectedImageDataUrls'));

  return new Promise(resolve => {
    querySnapshot.forEach(doc => {
      const parseResponse = selectedImageDataUrlItemSchema.safeParse(doc.data());
      if (parseResponse.success) items.push(parseResponse.data);
    });
    resolve(items);
  });
};

export const createSelectedImageDataUrlItem = async (item: TSelectedImageDataUrlItem) => {
  const id = uuid();
  await setDoc(doc(db, 'selectedImageDataUrls', id), { ...item });
  return { id, ...item };
};

export const confirmCreateSelectedImageDataUrlItem = async (item: TSelectedImageDataUrlItem) => {
  const { id } = await createSelectedImageDataUrlItem(item);
  const newItem = await readSelectedImageDataUrlItemById(id);
  return newItem;
};

export const readBackupImageDataUrlItemById = async (id: string) => {
  const docRef = doc(db, 'backupImageDataUrls', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const parseResponse = backupImageDataUrlItemSchema.safeParse(docSnap.data());
  if (!parseResponse.success) return;
  return { id, ...parseResponse.data };
};
export const readAllBackupImageDataUrlItems = async () => {
  const items: TBackupImageDataUrlItem[] = [];
  const querySnapshot = await getDocs(collection(db, 'backupImageDataUrls'));

  return new Promise(resolve => {
    querySnapshot.forEach(doc => {
      const parseResponse = backupImageDataUrlItemSchema.safeParse(doc.data());
      if (parseResponse.success) items.push(parseResponse.data);
    });
    resolve(items);
  });
};

export const createBackupImageDataUrlItem = async (item: TBackupImageDataUrlItem) => {
  const id = uuid();
  await setDoc(doc(db, 'backupImageDataUrls', id), { ...item });
  return { id, ...item };
};

export const confirmCreateImageDataUrlItem = async (item: TBackupImageDataUrlItem) => {
  const { id } = await createBackupImageDataUrlItem(item);
  const newItem = await readBackupImageDataUrlItemById(id);
  return newItem;
};
