import { z } from "zod";

// Expected shape from the Insight API
// `createdAt` is serialized to an ISO datetime string over JSON
export const InsightDto = z.object({
  id: z.number().int().min(0),
  brand: z.number().int().min(0),
  createdAt: z.string().datetime(),
  text: z.string(),
});
export type InsightDto = z.infer<typeof InsightDto>;

// Client-side Insight shape, mapped from the validated DTO.
export const Insight = InsightDto.transform((dto) => ({
  id: dto.id,
  brandId: dto.brand,
  date: new Date(dto.createdAt),
  text: dto.text,
}));
export type Insight = z.infer<typeof Insight>;
