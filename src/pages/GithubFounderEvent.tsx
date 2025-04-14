
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CalendarIcon, Clock, Flame, MapPin, Ticket, Users, Waves, Github, Users2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const GithubFounderEvent = () => {
  const navigate = useNavigate();
  const handleRequestClick = () => {
    window.open('https://lu.ma/lcqqdchq', '_blank', 'noopener,noreferrer');
  };
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>An Evening with GitHub Cofounder Tom Preston-Werner - Exclusive Dinner in Riyadh</title>
        <meta name="description" content="Join us for an evening with GitHub cofounder Tom Preston-Werner at Irqah Farmhouse in Riyadh. Connect with leaders in technology, business, and government while enjoying meaningful conversations." />
        <meta property="og:title" content="An Evening with GitHub Cofounder Tom Preston-Werner" />
        <meta property="og:description" content="Exclusive gathering with GitHub cofounder Tom Preston-Werner and Rodrigo Ponce de Leon at our Irqah Farmhouse in Riyadh. Limited to 50 visionary leaders." />
        <meta property="og:type" content="event" />
        <meta property="og:url" content="https://nias.io/events/an-evening-with-github-cofounder-tom-preston-werner" />
        <meta property="og:image" content="https://nias.io/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="An Evening with GitHub Cofounder Tom Preston-Werner" />
        <meta name="twitter:description" content="Exclusive gathering with GitHub cofounder Tom Preston-Werner and Rodrigo Ponce de Leon at our Irqah Farmhouse in Riyadh. Limited to 50 visionary leaders." />
        <meta name="twitter:image" content="https://nias.io/og-image.png" />
      </Helmet>

      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <Waves className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>

      <main className="pt-16">
        <section className="py-24 bg-[#F8F3E8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in flex items-center gap-4">
                <Github className="h-12 w-12 text-black" />
                An Evening with GitHub Cofounder Tom Preston-Werner
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">Enjoy a relaxed gathering with key figures from Saudi Arabia's tech, government, and investor communities in the serene setting of our Irqah Farmhouse in Riyadh.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={handleRequestClick}>
                Request an Invitation
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Celebrating Builders, Technologists, &amp; Visionary Capital Allocators</h2>
                <p className="text-gray-600 mb-8">Join us for a curated gathering at our Irqah Farmhouse, where pioneering builders, founders, and technologists — alongside family office principals, sovereign investors, and senior government leaders — come together for open, meaningful conversation.

This is a night to celebrate bold ideas, shared values, and the future of creation — from the code that powers innovation to the stories that shape culture.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">When</h3>
                      <p className="text-gray-600">Monday, April 20th, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Programme</h3>
                      <p className="text-gray-600">7:30 PM - Reception and welcoming of guests</p>
                      <p className="text-gray-600">8:30 PM - Dining experience</p>
                      <p className="text-gray-600">9:30 PM - A conversation with Tom Preston-Werner and Rodrigo Ponce de Leon moderated by Johann Jenson</p>
                      <p className="text-gray-600">11:30 PM - Conclusion of the evening</p>
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
                  <h3 className="text-2xl font-bold text-primary mb-4">Guests of Honor</h3>
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
                      <p className="text-gray-600">Rodrigo Ponce de Leon is a partner at 180 Studios Holding, the HQ of Soho House and a key hub for London’s creative scene. He has managed three high-performing VC funds and brings seasoned expertise in venture capital, media, and real estate development.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-gray-800" />
                        <h4 className="text-lg font-semibold text-primary">You - The Visionary Leader</h4>
                      </div>
                      <p className="text-gray-600">This exclusive gathering is curated for pioneering leaders who are shaping the future of technology, investment, media, and real estate. We are seeking visionary individuals from:</p>
                      <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                        <li>Family Offices & Private Wealth Management</li>
                        <li>Government Innovation Departments</li>
                        <li>Tech Venture Capital & Angel Investors</li>
                        <li>Strategic Business Executives</li>
                        <li>Emerging Technology Entrepreneurs</li>
                        <li>Media and Entertainment Innovation Leaders</li>
                        <li>Real Estate and Infrastructure Innovators</li>
                      </ul>
                      <p className="text-gray-600 mt-2 italic">
                        If you are a forward-thinking leader committed to driving meaningful connections and transformative collaborations, this evening is designed for you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F3E8] p-8 rounded-lg shadow-sm border border-[#E8E4D9]">
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    What to Expect
                  </h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 pt-0.5">
                        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                      </div>
                      <p>Insights from Tom Preston-Werner on technological innovation and the future of collaborative software</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 pt-0.5">
                        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                      </div>
                      <p>Discussion on investment opportunities in media, software, and real estate with industry leaders</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 pt-0.5">
                        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                      </div>
                      <p>Dining in an elegant and intimate setting</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 pt-0.5">
                        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                      </div>
                      <p>Connections with key decision-makers from family offices, government agencies, and business sectors</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="min-w-5 pt-0.5">
                        <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                      </div>
                      <p>Strategic conversations about emerging trends and cross-sector collaboration opportunities</p>
                    </li>
                  </ul>
                  <p className="text-gray-600 italic mt-6 border-t border-[#E8E4D9] pt-4">
                    "An opportunity to forge meaningful relationships with global innovators and local leaders shaping the future of technology, media, and investment."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="register" className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Request Your Invitation
              </h2>
              <p className="text-gray-600 mb-8">This exclusive gathering is limited to 50 builders, business leaders, family office principals, and government representatives. Please submit your details for review.</p>
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
