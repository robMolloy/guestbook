import { collection, doc, getDocs, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { z } from 'zod';

import { db, storage } from '@/src/config/firebase-config';
import { ref, uploadString } from 'firebase/storage';

const collectionName = 'backupImages';

const backupImageUploadSeedSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  imageDataUrl: z.string(),
});
const backupImageDbEntrySchema = z.object({
  id: z.string(),
  groupId: z.string(),
  storagePath: z.string(),
});
const backupImageDetails = z.object({
  id: z.string(),
  groupId: z.string(),
  storagePath: z.string(),
  downloadUrl: z.string(),
});

export type TBackupImageUploadSeed = z.infer<typeof backupImageUploadSeedSchema>;
export type TBackupImageDbEntrySchema = z.infer<typeof backupImageDbEntrySchema>;
export type TBackupImageDetails = z.infer<typeof backupImageDetails>;

export const uploadBackupImage = async (seed: TBackupImageUploadSeed) => {
  try {
    const storagePath = `${collectionName}/${seed.id}`;
    const storageRef = ref(storage, storagePath);
    const storageSnapshot = await uploadString(storageRef, seed.imageDataUrl, 'data_url');

    if (!storageSnapshot.metadata.fullPath)
      throw new Error(`failed to upload doc with id "${seed.id}" into storage`);

    const dbEntry: TBackupImageDbEntrySchema = { id: seed.id, groupId: seed.groupId, storagePath };

    await setDoc(doc(db, collectionName, seed.id), dbEntry); // returns undefined
  } catch (e) {
    const error = e as ErrorEvent;
    return { success: false, error: { message: error.message } } as const;
  }
  return { success: true, data: seed } as const;
};

export const readBackupImageDbEntries = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return { success: false, error: { message: `doc with id "${id}" not found` } } as const;

  return backupImageUploadSeedSchema.safeParse(docSnap.data());
};
export const readAllValidBackupImageDbEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const items: TBackupImageDbEntrySchema[] = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      const parseResponse = backupImageDbEntrySchema.safeParse(data);
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

export const deleteAllValidBackupImageDbEntries = async () => {
  const response = await readAllValidBackupImageDbEntries();
  if (!response.success) return response;

  for (const item of response.data) {
    await deleteDoc(doc(db, collectionName, item.id));
  }
  return readAllValidBackupImageDbEntries();
};

export const createBackupImageDataUrlItem = async (item: TBackupImageUploadSeed) => {
  await setDoc(doc(db, collectionName, item.id), { ...item });
  return { success: true, data: item } as const;
};

export const confirmCreateBackupImageDataUrlItem = async (item: TBackupImageUploadSeed) => {
  const createResponse = await createBackupImageDataUrlItem(item);
  if (!createResponse.success)
    return { success: false, error: { message: 'image not saved successfully' } } as const;

  return readBackupImageDbEntries(item.id);
};
