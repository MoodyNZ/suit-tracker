import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";
import { OperationError } from "../shared.ts";

describe("deleting an insight in the database", () => {
  describe("specified insight not in the DB", () => {
    withDB((fixture) => {
      it("throws an OperationError", () => {
        expect(() => deleteInsight({ ...fixture, id: 0 })).toThrow(
          OperationError,
        );
      });
    });
  });

  describe("insight is in the DB", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date(), text: "3" },
        { id: 4, brand: 4, createdAt: new Date(), text: "4" },
      ];

      let result: Insight | undefined;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = deleteInsight({ ...fixture, id: 3 });
      });

      it("returns the deleted insight", () => {
        expect(result).toEqual(insights[2]);
      });

      it("removes the insight from the database", () => {
        const rows = fixture.insights.selectAll();
        expect(rows).toHaveLength(3);
        expect(rows.map((row) => row.id)).toEqual([1, 2, 4]);
      });
    });
  });
});
