import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { z } from 'zod';

const backupImageDataUrlItemSchema = z.object({
  id: z.string(),
  imageDataUrl: z.string(),
  groupId: z.string(),
});
type TBackupImageDataUrlItem = z.infer<typeof backupImageDataUrlItemSchema>;

type TSelectedImageDataUrlItem = z.infer<typeof selectedImageDataUrlItemSchema>;
const selectedImageDataUrlItemSchema = z.object({
  id: z.string(),
  imageDataUrl: z.string(),
});

export const readSelectedImageDataUrlItemById = async (id: string) => {
  const docRef = doc(db, 'selectedImageDataUrls', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return { success: false, error: { message: `doc with id "${id}" not found` } } as const;

  return selectedImageDataUrlItemSchema.safeParse({ id, ...docSnap.data() });
};

export const readAllSelectedImageDataUrlItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'selectedImageDataUrls'));

  const items = await new Promise(resolve => {
    const newItems: TSelectedImageDataUrlItem[] = [];
    querySnapshot.forEach(doc => {
      const parseResponse = selectedImageDataUrlItemSchema.safeParse(doc.data());
      if (parseResponse.success) newItems.push(parseResponse.data);
      else return { success: false, error: parseResponse.error } as const;
    });
    resolve(newItems);
  });
  return { success: true, data: items } as const;
};

export const createSelectedImageDataUrlItem = async (item: TSelectedImageDataUrlItem) => {
  try {
    await setDoc(doc(db, 'selectedImageDataUrls', item.id), { ...item });
  } catch (error) {
    return { success: false, error } as const;
  }
  return { success: true, data: item } as const;
};

export const confirmCreateSelectedImageDataUrlItem = async (item: TSelectedImageDataUrlItem) => {
  const createResponse = await createSelectedImageDataUrlItem(item);
  if (!createResponse.success)
    return { success: false, error: { message: 'image not saved successfully' } } as const;

  return readSelectedImageDataUrlItemById(item.id);
};

export const readBackupImageDataUrlItemById = async (id: string) => {
  const docRef = doc(db, 'backupImageDataUrls', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return { success: false, error: { message: `doc with id "${id}" not found` } } as const;

  return backupImageDataUrlItemSchema.safeParse(docSnap.data());
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
  await setDoc(doc(db, 'backupImageDataUrls', item.id), { ...item });
  return { success: true, data: item } as const;
};

export const confirmCreateBackupImageDataUrlItem = async (item: TBackupImageDataUrlItem) => {
  const createResponse = await createBackupImageDataUrlItem(item);
  if (!createResponse.success)
    return { success: false, error: { message: 'image not saved successfully' } } as const;

  return readBackupImageDataUrlItemById(item.id);
};
