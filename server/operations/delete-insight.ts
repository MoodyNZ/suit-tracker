import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";
import { OperationError } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): Insight | undefined => {
  console.log(`Deleting insight for id ${input.id}`);

  const [row] = input.db
    .sql<
    insightsTable.Row
  >`DELETE FROM insights WHERE id = ${input.id} RETURNING *`;

  if (row) {
    const result = { ...row, createdAt: new Date(row.createdAt) };
    console.log("Insight deleted:", result);
    return result;
  }

  console.error("Delete failed: Insight not found");
  throw new OperationError("Insight not found");
};
