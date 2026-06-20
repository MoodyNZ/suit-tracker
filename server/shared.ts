import type { Database } from "@db/sqlite";

export type HasDBClient = {
  db: Database;
};

export class OperationError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "OperationError";
  }
}
