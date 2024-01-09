import { Client, Databases, Account } from 'appwrite'

export const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT)

export function useAppwriteUtils() {
  const account = new Account(client)
  const database = new Databases(client)
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
  return {
    account,
    database,
    DATABASE_ID,
    COLLECTION_ID,
  }
}
