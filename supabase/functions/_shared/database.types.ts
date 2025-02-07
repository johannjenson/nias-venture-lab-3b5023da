export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Enums: {
      industry_type:
        | "manufacturing"
        | "technology"
        | "tourism"
        | "healthcare"
        | "energy"
        | "mining"
        | "logistics"
        | "education"
        | "finance"
        | "real_estate"
        | "agriculture"
        | "water"
        | "defense"
        | "sports"
        | "aerospace"
        | "retail"
        | "creative"
        | "biotech"
        | "construction"
        | "ocean"
      contact_stage:
        | "mql_lead"
        | "sql_qualification"
        | "sqo_discovery"
        | "evaluation"
        | "closed_won"
        | "closed_lost"
      lead_type:
        | "founder_executive"
        | "investor_buyer"
        | "advisor_broker"
        | "other"
    }
  }
}