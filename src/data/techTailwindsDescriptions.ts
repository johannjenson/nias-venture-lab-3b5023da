import { TechTailwindDescription } from "./types";
import { industryTailwinds } from "./techTailwinds/industryTailwinds";
import { digitalTailwinds } from "./techTailwinds/digitalTailwinds";
import { blockchainTailwinds } from "./techTailwinds/blockchainTailwinds";
import { healthcareTailwinds } from "./techTailwinds/healthcareTailwinds";
import { tourismTailwinds } from "./techTailwinds/tourismTailwinds";
import { creativeTailwinds } from "./techTailwinds/creativeTailwinds";

export const techTailwindsDescriptions: Record<string, TechTailwindDescription> = {
  ...industryTailwinds,
  ...digitalTailwinds,
  ...blockchainTailwinds,
  ...healthcareTailwinds,
  ...tourismTailwinds,
  ...creativeTailwinds
};