import type { Insight } from "$models/insight.ts";
import { type HasDBClient, OperationError } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";
import { insertStatement } from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log("Creating insight");

  // Ensure we parameterize the query to prevent SQL injection
  const result = input.db.prepare(insertStatement).get<insightsTable.Row>({
    brand: input.brand,
    createdAt: new Date().toISOString(),
    text: input.text,
  });

  if (result) {
    return { ...result, createdAt: new Date(result.createdAt) };
  }

  console.error("Failed to create insight: ", result);
  throw new OperationError("Failed to create insight");
};
