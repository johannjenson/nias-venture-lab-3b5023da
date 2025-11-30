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
import { waterAreas } from "./keyAreas/waterAreas";
import { realEstateAreas } from "./keyAreas/realEstateAreas";
import { biotechAreas } from "./keyAreas/biotechAreas";
import { agricultureAreas } from "./keyAreas/agricultureAreas";
import { retailAreas } from "./keyAreas/retailAreas";
import { educationAreas } from "./keyAreas/educationAreas";
import { oceanAreas } from "./keyAreas/oceanAreas";
import { waterEnvironmentAreas } from "./keyAreas/waterEnvironmentAreas";
import { realEstate2Areas } from "./keyAreas/realEstate2Areas";

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
  ...aerospaceAreas,
  ...waterAreas,
  ...realEstateAreas,
  ...biotechAreas,
  ...agricultureAreas,
  ...retailAreas,
  ...educationAreas,
  ...oceanAreas,
  ...waterEnvironmentAreas,
  ...realEstate2Areas
};