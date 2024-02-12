import { db } from '@/src/config/firebase-config';
import dayjs from 'dayjs';
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { z } from 'zod';

const collectionName = 'events';

export const eventDbEntrySeedSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
});
export const eventDbEntrySchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TEventDbEntrySeed = z.infer<typeof eventDbEntrySeedSchema>;
export type TEventDbEntry = z.infer<typeof eventDbEntrySchema>;

export const readAllValidEventDbEntries = async (p?: { ignoreErrors?: boolean }) => {
  const ignoreErrors = p?.ignoreErrors ?? true;
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const items: TEventDbEntry[] = [];
    querySnapshot.forEach(doc => {
      const initData = doc.data();
      const data = {
        ...initData,
        createdAt: (() => {
          const date = dayjs(initData?.createdAt?.toDate());

          const rtn = !!date ? date.format('D MMM YYYY hh:mm') : undefined;
          console.log({ date, rtn });
          return rtn;
        })(),
        updatedAt: (() => {
          const date = initData?.updatedAt?.toDate();
          return !!date ? dayjs().calendar(dayjs(date)) : undefined;
        })(),
      };
      // console.log(data);

      const parseResponse = eventDbEntrySchema.safeParse(data);
      if (parseResponse.success) return items.push(parseResponse.data);

      const json = JSON.stringify(data);
      const errorMessage = `an item did not have the correct data structure: ${json}`;
      if (!ignoreErrors) throw new Error(errorMessage);
      console.error(errorMessage);
    });

    return { success: true, data: items } as const;
  } catch (e) {
    console.error(e);
    const { message } = e as ErrorEvent;
    return { success: false, error: { message } } as const;
  }
};

export const readAllEventDbEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const items: unknown[] = [];
    querySnapshot.forEach(doc => {
      items.push({ ...doc.data(), id: doc.id });
    });

    return { success: true, data: items } as const;
  } catch (e) {
    const { message } = e as ErrorEvent;
    return { success: false, error: { message } } as const;
  }
};

export const createEventDbEntry = async (data: TEventDbEntrySeed) => {
  try {
    const newDoc = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    await setDoc(doc(db, collectionName, data.id), newDoc); // returns undefined
    return { success: true, data } as const;
  } catch (e) {
    const { message } = e as ErrorEvent;
    return { success: false, error: { message } } as const;
  }
};

export const readEventDbEntry = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return { success: false, error: { message: `doc with id "${id}" not found` } } as const;

  const initData = docSnap.data();
  const data = {
    ...initData,
    createdAt: (() => {
      const date = initData?.createdAt?.toDate();
      return !!date ? dayjs(date).format('D MMM YYYY') : undefined;
    })(),
    updatedAt: (() => {
      const date = initData?.updatedAt?.toDate();
      return !!date ? dayjs(date).format('D MMM YYYY') : undefined;
    })(),
  };
  return eventDbEntrySchema.safeParse({ id, ...data });
};

export const createEventDbEntryAndConfirm = async (data: TEventDbEntrySeed) => {
  const createResponse = await createEventDbEntry(data);
  if (!createResponse.success) return createResponse;

  return readEventDbEntry(data.id);
};
