import { collection, doc, getDocs, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { z } from 'zod';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { db, storage } from '@/src/config/firebase-config';

const collectionName = 'selectedImages';

export const selectedImageUploadSeedSchema = z.object({
  id: z.string(),
  imageDataUrl: z.string(),
});
export const selectedImageDbEntrySchema = z.object({
  id: z.string(),
  storagePath: z.string(),
});
export const selectedImageDetails = z.object({
  id: z.string(),
  storagePath: z.string(),
  downloadUrl: z.string(),
});

export type TSelectedImageUploadSeed = z.infer<typeof selectedImageUploadSeedSchema>;
export type TSelectedImageDbEntrySchema = z.infer<typeof selectedImageDbEntrySchema>;
export type TSelectedImageDetails = z.infer<typeof selectedImageDetails>;

export const uploadSelectedImage = async (seed: TSelectedImageUploadSeed) => {
  try {
    const storagePath = `${collectionName}/${seed.id}`;
    const storageRef = ref(storage, storagePath);
    const storageSnapshot = await uploadString(storageRef, seed.imageDataUrl, 'data_url');

    if (!storageSnapshot.metadata.fullPath)
      throw new Error(`failed to upload doc with id "${seed.id}" into storage`);

    const dbEntry: TSelectedImageDbEntrySchema = { id: seed.id, storagePath };

    await setDoc(doc(db, collectionName, seed.id), dbEntry); // returns undefined
  } catch (e) {
    const error = e as ErrorEvent;
    return { success: false, error: { message: error.message } } as const;
  }
  return { success: true, data: seed } as const;
};

export const readSelectedImageDbEntry = async (id: string) => {
  const docRef = doc(db, 'selectedImages', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return { success: false, error: { message: `doc with id "${id}" not found` } } as const;

  return selectedImageDbEntrySchema.safeParse({ id, ...docSnap.data() });
};

export const readAllValidSelectedImageDbEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const items: TSelectedImageDbEntrySchema[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      const parseResponse = selectedImageDbEntrySchema.safeParse(data);
      if (parseResponse.success) items.push(parseResponse.data);
      else
        throw new Error(`an item did not have the correct data structure: ${JSON.stringify(data)}`);
    });

    return { success: true, data: items } as const;
  } catch (e) {
    const error = e as ErrorEvent;
    return { success: false, error } as const;
  }
};

export const deleteSelectedImageDbEntry = async (id: string) => {
  await deleteDoc(doc(db, collectionName, id));
  return { success: true, data: undefined } as const;
};
export const deleteAllValidSelectedImageDbEntries = async () => {
  const response = await readAllValidSelectedImageDbEntries();
  if (!response.success) return response;

  for (const item of response.data) {
    await deleteSelectedImageDbEntry(item.id);
  }
  return readAllValidSelectedImageDbEntries();
};

export const uploadSelectedImageAndConfirm = async (item: TSelectedImageUploadSeed) => {
  const createResponse = await uploadSelectedImage(item);

  if (!createResponse.success) return createResponse;

  return readSelectedImageDbEntry(item.id);
};

export const getSelectedImageDetails = async (id: string) => {
  try {
    const storagePath = `${collectionName}/${id}`;
    const downloadUrl = await getDownloadURL(ref(storage, storagePath));
    if (!downloadUrl) throw new Error(`no data found when searching id "${id}"`);

    const data: TSelectedImageDetails = { id, storagePath, downloadUrl };
    return { success: true, data } as const;
  } catch (e) {
    const error = e as ErrorEvent;
    return { success: false, error: { message: error.message } } as const;
  }
};
