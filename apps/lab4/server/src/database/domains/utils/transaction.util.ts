import { Pool, PoolClient } from "pg"

/**
 * Runs a database transaction and returns the result.
 * @param db The database pool instance.
 * @param transactionCallback A function that executes queries within the transaction.
 * @returns The result of the transaction.
 */
export async function runTransaction<T>(
  db: Pool,
  transactionCallback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await db.connect()
  try {
    await client.query("BEGIN")

    const result = await transactionCallback(client)

    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}
