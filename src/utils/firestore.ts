import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const backupImageDataUrlItemSchema = z.object({
  imageDataUrl: z.string(),
  groupId: z.string(),
});
type TBackupImageDataUrlItem = z.infer<typeof backupImageDataUrlItemSchema>;

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
