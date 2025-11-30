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
import { constructionTailwinds } from "./techTailwinds/constructionTailwinds";
import { miningTailwinds } from "./techTailwinds/miningTailwinds";
import { sportsTailwinds } from "./techTailwinds/sportsTailwinds";
import { aerospace2Tailwinds } from "./techTailwinds/aerospace2Tailwinds";
import { finance2Tailwinds } from "./techTailwinds/finance2Tailwinds";
import { logistics2Tailwinds } from "./techTailwinds/logistics2Tailwinds";
import { manufacturing2Tailwinds } from "./techTailwinds/manufacturing2Tailwinds";
import { technology2Tailwinds } from "./techTailwinds/technology2Tailwinds";
import { tourism2Tailwinds } from "./techTailwinds/tourism2Tailwinds";

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
  ...realEstate2Tailwinds,
  ...constructionTailwinds,
  ...miningTailwinds,
  ...sportsTailwinds,
  ...aerospace2Tailwinds,
  ...finance2Tailwinds,
  ...logistics2Tailwinds,
  ...manufacturing2Tailwinds,
  ...technology2Tailwinds,
  ...tourism2Tailwinds
};