import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import createInsight from "./create-insight.ts";

describe("creates an insight in the database", () => {
  describe("can create insight in the database", () => {
    withDB((fixture) => {
      let result: Insight | undefined;

      beforeAll(() => {
        result = createInsight({ ...fixture, brand: 1, text: "A great suit" });
      });

      it("returns the created insight", () => {
        expect(result).toEqual({
          id: expect.any(Number),
          brand: 1,
          text: "A great suit",
          createdAt: expect.any(Date),
        });
      });

      it("persists the insight in the database", () => {
        const rows = fixture.insights.selectAll();
        expect(rows).toHaveLength(1);
        expect(rows[0]).toEqual({
          id: result!.id,
          brand: 1,
          text: "A great suit",
          createdAt: expect.any(String),
        });
      });
    });
  });

  describe("safely stores text containing sql excaping characters", () => {
    withDB((fixture) => {
      const text = "Levi's '); DROP TABLE insights;-- denim";
      let result: Insight | undefined;

      beforeAll(() => {
        result = createInsight({ ...fixture, brand: 2, text });
      });

      it("returns the text", () => {
        expect(result?.text).toBe(text);
      });

      it("saves the text without breaking the query", () => {
        const rows = fixture.insights.selectAll();
        expect(rows).toHaveLength(1);
        expect(rows[0].text).toBe(text);
      });
    });
  });
});
