import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import MultiStepForm from "@/components/MultiStepForm";
import CaseStudies from "@/components/CaseStudies";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ValueProps />
      <div id="signup-form" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Join Our Network
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Take the first step towards expanding your business in Saudi Arabia.
            </p>
          </div>
          <MultiStepForm />
        </div>
      </div>
      <CaseStudies />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default Index;