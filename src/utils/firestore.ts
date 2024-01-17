import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

const imageDataUrlItemSchema = z.object({
  imageDataUrl: z.string(),
});
type TImageDataUrlItem = z.infer<typeof imageDataUrlItemSchema>;

export const readBackupImageDataUrlItemById = async (id: string) => {
  const docRef = doc(db, 'backupImageDataUrls', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const parseResponse = imageDataUrlItemSchema.safeParse(docSnap.data());
  if (!parseResponse.success) return;
  return { id, ...parseResponse.data };
};
export const readAllBackupImageDataUrlItems = async () => {
  const items: TImageDataUrlItem[] = [];
  const querySnapshot = await getDocs(collection(db, 'backupImageDataUrls'));

  return new Promise(resolve => {
    querySnapshot.forEach(doc => {
      const parseResponse = imageDataUrlItemSchema.safeParse(doc.data());
      if (parseResponse.success) items.push(parseResponse.data);
    });
    resolve(items);
  });
};

export const createImageDataUrlItem = async (item: TImageDataUrlItem) => {
  const id = uuid();
  await setDoc(doc(db, 'backupImageDataUrls', id), { ...item });
  return { id, ...item };
};

export const confirmCreateImageDataUrlItem = async (item: TImageDataUrlItem) => {
  const { id } = await createImageDataUrlItem(item);
  const newItem = await readBackupImageDataUrlItemById(id);
  return newItem;
};
