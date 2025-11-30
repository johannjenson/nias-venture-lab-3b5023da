import { TechTailwindDescription } from "./types";
import { industryTailwinds } from "./techTailwinds/industryTailwinds";
import { digitalTailwinds } from "./techTailwinds/digitalTailwinds";
import { blockchainTailwinds } from "./techTailwinds/blockchainTailwinds";
import { healthcareTailwinds } from "./techTailwinds/healthcareTailwinds";
import { tourismTailwinds } from "./techTailwinds/tourismTailwinds";
import { creativeTailwinds } from "./techTailwinds/creativeTailwinds";
import { energyTailwinds } from "./techTailwinds/energyTailwinds";
import { defenseTailwinds } from "./techTailwinds/defenseTailwinds";
import { logisticsTailwinds } from "./techTailwinds/logisticsTailwinds";
import { financeTailwinds } from "./techTailwinds/financeTailwinds";
import { aerospaceTailwinds } from "./techTailwinds/aerospaceTailwinds";
import { waterTailwinds } from "./techTailwinds/waterTailwinds";
import { realEstateTailwinds } from "./techTailwinds/realEstateTailwinds";
import { biotechTailwinds } from "./techTailwinds/biotechTailwinds";
import { agricultureTailwinds } from "./techTailwinds/agricultureTailwinds";
import { retailTailwinds } from "./techTailwinds/retailTailwinds";
import { educationTailwinds } from "./techTailwinds/educationTailwinds";
import { oceanTailwinds } from "./techTailwinds/oceanTailwinds";
import { waterEnvironmentTailwinds } from "./techTailwinds/waterEnvironmentTailwinds";
import { realEstate2Tailwinds } from "./techTailwinds/realEstate2Tailwinds";

export const techTailwindsDescriptions: Record<string, TechTailwindDescription> = {
  ...industryTailwinds,
  ...digitalTailwinds,
  ...blockchainTailwinds,
  ...healthcareTailwinds,
  ...tourismTailwinds,
  ...creativeTailwinds,
  ...energyTailwinds,
  ...defenseTailwinds,
  ...logisticsTailwinds,
  ...financeTailwinds,
  ...aerospaceTailwinds,
  ...waterTailwinds,
  ...realEstateTailwinds,
  ...biotechTailwinds,
  ...agricultureTailwinds,
  ...retailTailwinds,
  ...educationTailwinds,
  ...oceanTailwinds,
  ...waterEnvironmentTailwinds,
  ...realEstate2Tailwinds
};