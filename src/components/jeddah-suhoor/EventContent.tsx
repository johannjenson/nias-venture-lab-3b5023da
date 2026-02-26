import EventDetails from "./EventDetails";
import GuestsOfHonor from "./GuestsOfHonor";
import WhatToExpect from "./WhatToExpect";
import diwanLogo from "@/assets/diwan-logo.png";
import niasLogo from "@/assets/nias-logo.png";
import gulfEduLogo from "@/assets/gulf-edu-logo.png";
import sunriseMarketingLogo from "@/assets/sunrise-marketing-logo.png";

const EventContent = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <EventDetails />
          <div>
            <GuestsOfHonor />
            <WhatToExpect />
          </div>
        </div>

        {/* Hosted by — full width */}
        <div className="mt-12 pt-10 border-t border-border">
          <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-8">Hosted by</h4>
          <div className="flex items-center gap-12 flex-wrap">
            <a href="https://www.the-diwan.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={diwanLogo} alt="The Diwan" className="h-28 w-auto" />
            </a>
            <img src={niasLogo} alt="NIAS.io" className="h-16 w-auto" />
            <a
              href="https://gulf-edu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src={gulfEduLogo} alt="Gulf Education Investment Company" className="h-40 w-auto" style={{ filter: "invert(1)" }} />
            </a>
            <a
              href="https://www.linkedin.com/company/sunrisemarketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={sunriseMarketingLogo} alt="Sunrise Marketing" className="h-28 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventContent;
