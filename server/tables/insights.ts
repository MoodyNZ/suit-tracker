export const createTable = `
  CREATE TABLE insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brand INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export type Row = {
  id: number;
  brand: number;
  createdAt: string;
  text: string;
};

export type Insert = {
  brand: number;
  createdAt: string;
  text: string;
};

// Warning: Using string template injection is dangerous and can lead to SQL injection if not handled properly
// Use input paramertisation for queries to ensure that user input is safely escaped and treated as data, and not executed as SQL
export const insertStatement =
  `INSERT INTO insights (brand, createdAt, text) VALUES (:brand, :createdAt, :text) RETURNING *`;
