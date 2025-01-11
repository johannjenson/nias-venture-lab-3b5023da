import { KeyAreaDescription } from "./types";
import { manufacturingAreas } from "./keyAreas/manufacturingAreas";
import { technologyAreas } from "./keyAreas/technologyAreas";
import { tourismAreas } from "./keyAreas/tourismAreas";
import { healthcareAreas } from "./keyAreas/healthcareAreas";
import { creativeAreas } from "./keyAreas/creativeAreas";

export const keyAreaDescriptions: Record<string, KeyAreaDescription> = {
  ...manufacturingAreas,
  ...technologyAreas,
  ...tourismAreas,
  ...healthcareAreas,
  ...creativeAreas
};