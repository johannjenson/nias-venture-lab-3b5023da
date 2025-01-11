import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
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
          <form className="max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Receive monthly insights on investing, M&A, and tech in KSA.
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;