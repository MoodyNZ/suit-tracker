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

  const queryString = insertStatement({
    ...input,
    createdAt: new Date().toISOString(),
  });

  const createResult = input.db.prepare(queryString).get<
    insightsTable.Row
  >();

  if (createResult) {
    return {
      ...createResult,
      createdAt: new Date(createResult.createdAt),
    };
  }

  console.error("Failed to create insight: ", createResult);
  throw new OperationError("Failed to create insight");
};
