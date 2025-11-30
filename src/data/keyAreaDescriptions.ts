import { KeyAreaDescription } from "./types";
import { manufacturingAreas } from "./keyAreas/manufacturingAreas";
import { technologyAreas } from "./keyAreas/technologyAreas";
import { tourismAreas } from "./keyAreas/tourismAreas";
import { healthcareAreas } from "./keyAreas/healthcareAreas";
import { creativeAreas } from "./keyAreas/creativeAreas";
import { energyAreas } from "./keyAreas/energyAreas";
import { defenseAreas } from "./keyAreas/defenseAreas";
import { logisticsAreas } from "./keyAreas/logisticsAreas";
import { financeAreas } from "./keyAreas/financeAreas";
import { aerospaceAreas } from "./keyAreas/aerospaceAreas";

export const keyAreaDescriptions: Record<string, KeyAreaDescription> = {
  ...manufacturingAreas,
  ...technologyAreas,
  ...tourismAreas,
  ...healthcareAreas,
  ...creativeAreas,
  ...energyAreas,
  ...defenseAreas,
  ...logisticsAreas,
  ...financeAreas,
  ...aerospaceAreas
};