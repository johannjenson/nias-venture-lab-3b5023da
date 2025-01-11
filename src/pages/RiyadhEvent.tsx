import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SocialProof from "@/components/SocialProof";

const RiyadhEvent = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar - Keep it consistent with main site */}
      <div className="bg-[#221F26] text-white text-center py-2 px-4">
        Limited spots available.{" "}
        <a href="#register" className="underline font-medium hover:text-white/90">
          Request Your Invite
        </a>
      </div>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Header Section */}
      <header className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-primary mb-6">
              Nias Business Forum
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join us for an exclusive gathering of global business leaders and investors
              on February 20th, 2024 in Riyadh
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={() => {
                const element = document.getElementById("register");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request an Invite
            </Button>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Global Companies
              </h3>
              <p className="text-gray-600">
                Connect with international businesses actively seeking to establish and expand their presence in Saudi Arabia.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Meet successful Saudi entrepreneurs and investors with deep market knowledge and strategic connections.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                Strategic Opportunities
              </h3>
              <p className="text-gray-600">
                Explore partnerships, investments, and acquisition opportunities aligned with Vision 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Registration Section */}
      <section id="register" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Request Your Invitation
            </h2>
            <p className="text-gray-600 mb-8">
              This exclusive event is limited to qualified business leaders and investors.
              Submit your details to request an invitation.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Business Email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiyadhEvent;
