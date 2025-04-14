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
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>An Evening with GitHub Cofounder Tom Preston-Werner - Exclusive Dinner in Riyadh</title>
        <meta name="description" content="Join us for an evening with GitHub cofounder Tom Preston-Werner at Irqah Farmhouse in Riyadh. Connect with leaders in technology, business, and government while enjoying meaningful conversations." />
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
                An Evening with GitHub Cofounder Tom Preston-Werner
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                A gathering with industry leaders at Irqah Farmhouse in Riyadh
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={handleRequestClick}>
                Request an Invitation
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
                  An Exchange of Vision & Expertise
                </h2>
                <p className="text-gray-600 mb-8">
                  Join us for an evening at Irqah Farmhouse where family office principals, government representatives, and business leaders can connect and engage in meaningful conversations with global entrepreneurs while enjoying a carefully prepared dinner.
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
                      <h3 className="font-semibold text-primary">Programme</h3>
                      <p className="text-gray-600">7:30 PM - Reception and welcome of guests</p>
                      <p className="text-gray-600">8:30 PM - Dining experience</p>
                      <p className="text-gray-600">9:30 PM - Conversation with Tom Preston-Werner and Rodrigo Ponce de Leon</p>
                      <p className="text-gray-600">11:30 PM - Conclusion of event</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Venue</h3>
                      <p className="text-gray-600">Nias Irqah Farmhouse, Riyadh, Kingdom of Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ticket className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Attendance</h3>
                      <p className="text-gray-600">By invitation only</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Capacity</h3>
                      <p className="text-gray-600">Limited to 50 guests</p>
                      <p className="text-gray-600 text-sm">Waitlist available upon request</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F3E8] p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">Featured Speakers</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Github className="h-5 w-5 text-gray-800" />
                        <h4 className="text-lg font-semibold text-primary">Tom Preston-Werner</h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Tom Preston-Werner is the cofounder and former CEO of GitHub, acquired by Microsoft for $7.5 billion. A visionary technologist, he's the creator of Gravatar and author of the Semantic Versioning specification. Currently, Tom is focused on building collaboration software for media, gaming, and entertainment industries.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Users2 className="h-5 w-5 text-gray-800" />
                        <h4 className="text-lg font-semibold text-primary">Rodrigo Ponce de Leon</h4>
                      </div>
                      <p className="text-gray-600">Rodrigo Ponce de Leon is a Partner at 180 Studios - the hub for London's creative community and the headquarters for Soho House. He has successfully managed three venture capital funds, delivering impressive returns. His expertise spans from venture capital, media, and commercial real estate.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F3E8] p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Insights from a technology pioneer who transformed global software development
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Quality dining experience in an elegant setting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Engaging discussion on technology innovation, media collaboration, and investment trends
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Networking with family office principals, government representatives, and industry leaders
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Opportunity to forge strategic relationships with global technology visionaries
                    </li>
                  </ul>
                  <p className="text-gray-600 italic mt-4">
                    "This gathering brings together influential decision-makers to exchange perspectives and establish meaningful strategic partnerships."
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
              <p className="text-gray-600 mb-8">This exclusive gathering is limited to 50 leaders, family office principals, and government representatives. Please submit your details for consideration.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={handleRequestClick}>
                Request an Invitation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default GithubFounderEvent;