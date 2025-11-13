import { useState } from "react";
import { Helmet } from "react-helmet";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2, TrendingUp } from "lucide-react";
import CompanyForm from "@/components/work-with-nias/CompanyForm";
import FundForm from "@/components/work-with-nias/FundForm";

const WorkWithNias = () => {
  const [applicationType, setApplicationType] = useState<"company" | "fund">("company");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Work with NIAS | Strategic Partnerships for Global Expansion</title>
        <meta 
          name="description" 
          content="NIAS partners with global companies and funds expanding into the Gulf. Submit your application to join our curated ecosystem of operators and investors." 
        />
      </Helmet>

      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
              Work with NIAS
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              For Global Companies & Funds Expanding into the Gulf
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-base text-foreground/80 mb-4">
                NIAS.io works with a highly curated set of global operators and investment platforms.
                To maintain the quality of our ecosystem, we review opportunities through two streams:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-foreground/70 mb-8">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Companies (&gt;$100M revenue, multinational footprint)</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Investment Funds (institutional-grade, Gulf relevance)</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Please complete the relevant section below. Our team will review and respond within 7–10 days.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            {/* Toggle */}
            <div className="flex justify-center mb-12">
              <ToggleGroup 
                type="single" 
                value={applicationType}
                onValueChange={(value) => value && setApplicationType(value as "company" | "fund")}
                className="bg-muted/50 p-1 rounded-lg border border-border"
              >
                <ToggleGroupItem 
                  value="company" 
                  className="px-8 py-3 data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Companies
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="fund"
                  className="px-8 py-3 data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Funds
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Forms */}
            <div className="bg-card border border-border rounded-xl p-8 lg:p-12 shadow-sm">
              {applicationType === "company" ? <CompanyForm /> : <FundForm />}
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              After submission, NIAS will conduct an initial review. If aligned, our Partnerships Team will reach out to coordinate a deeper discussion.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WorkWithNias;
