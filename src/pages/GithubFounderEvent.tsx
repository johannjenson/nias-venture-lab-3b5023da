
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CalendarIcon, Clock, Flame, MapPin, Ticket, Users, Waves, Github, Users2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const GithubFounderEvent = () => {
  const navigate = useNavigate();
  
  const handleRequestClick = () => {
    window.open('https://lu.ma/githubfounder', '_blank');
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>An Evening with GitHub Cofounder Tom Preston-Werner - Exclusive Dinner in Riyadh</title>
        <meta name="description" content="Join us for an exclusive evening with GitHub cofounder Tom Preston-Werner at Irqah Farmhouse in Riyadh. Network with business leaders and enjoy dinner and discussion with tech luminaries." />
      </Helmet>

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <Waves className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-[#F8F3E8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                An Evening with GitHub Cofounder
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Join us for dinner and conversation with Tom Preston-Werner at the Irqah Farmhouse in Riyadh
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={handleRequestClick}>
                Request an Invite
              </Button>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  A Night of Tech & Business Insights
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience an exclusive evening with technology visionaries in an intimate setting at Irqah Farmhouse. Connect with fellow business leaders while enjoying dinner and engaging discussions with influential tech entrepreneurs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">When</h3>
                      <p className="text-gray-600">Monday, March 20th, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Schedule</h3>
                      <p className="text-gray-600">7:30 PM - Guest arrival</p>
                      <p className="text-gray-600">8:30 PM - Dinner starts</p>
                      <p className="text-gray-600">9:30 PM - Discussion with Tom Preston-Werner and Rodrigo Ponce de Leon</p>
                      <p className="text-gray-600">11:30 PM - Event concludes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Where</h3>
                      <p className="text-gray-600">Irqah Farmhouse, Riyadh, Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ticket className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Tickets</h3>
                      <p className="text-gray-600">Free (Invitation only)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Capacity</h3>
                      <p className="text-gray-600">Limited to 50 guests</p>
                      <p className="text-gray-600 text-sm">Waitlist available</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F3E8] p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Our Speakers</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Github className="h-5 w-5 text-gray-800" />
                        <h4 className="text-lg font-semibold text-primary">Tom Preston-Werner</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Tom Preston-Werner is the cofounder and former CEO of GitHub, the world's largest software development platform. He's also the creator of Gravatar and the author of the Semantic Versioning specification. Currently, Tom is focused on AI and climate tech investments and initiatives.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Users2 className="h-5 w-5 text-gray-800" />
                        <h4 className="text-lg font-semibold text-primary">Rodrigo Ponce de Leon</h4>
                      </div>
                      <p className="text-gray-600">
                        Rodrigo Ponce de Leon is a seasoned fund manager with experience across three different funds. With a deep understanding of the investment landscape, Rodrigo brings valuable insights on scaling technology businesses and strategic capital allocation in high-growth markets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F3E8] p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Exclusive insights from the cofounder who helped transform how developers collaborate
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Gourmet dinner in a spectacular farmhouse setting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Engaging discussions on technology, entrepreneurship and investment trends
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Meaningful networking with fellow business leaders in an intimate setting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Opportunity to build connections with tech visionaries and investors
                    </li>
                  </ul>
                  <p className="text-gray-600 italic mt-4">
                    "This exclusive gathering brings together business leaders in a relaxed, intimate setting to share ideas and forge meaningful connections."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Request Your Invitation
              </h2>
              <p className="text-gray-600 mb-8">
                This exclusive event is limited to 50 qualified business leaders and investors.
                Submit your details to request an invitation.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={handleRequestClick}
              >
                Request an Invite
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GithubFounderEvent;
