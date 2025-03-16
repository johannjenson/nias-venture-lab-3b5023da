
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { CalendarIcon, Clock, Flame, MapPin, Ticket, Users, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const FiresideChats = () => {
  const navigate = useNavigate();

  const handleRequestClick = () => {
    window.open('https://lu.ma/41qvuucz', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Nias Fireside Chats - Intimate Conversations Under the Stars in Al Amaariah</title>
        <meta 
          name="description" 
          content="Join us for Nias Fireside Chats at Fahad's farmhouse in Al Amaariah. An evening of meaningful conversations, networking, and Iftar meal under the stars with business leaders." 
        />
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
                Nias Fireside Chats 🔥🪵
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Join us for an evening of Iftar meal and intimate fireside conversations at Fahad's farmhouse in Al Amaariah
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
                onClick={handleRequestClick}
              >
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
                  An Evening Under the Stars
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience meaningful conversations in an intimate setting around the fire. Connect with fellow business leaders, investors, and thought leaders while enjoying Iftar under the stars.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">When</h3>
                      <p className="text-gray-600">Thursday, March 20th, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Schedule</h3>
                      <p className="text-gray-600">5:45 PM - Guest arrival</p>
                      <p className="text-gray-600">6:15 PM - Fireside discussions begin</p>
                      <p className="text-gray-600">9:00 PM - Event concludes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Where</h3>
                      <p className="text-gray-600">Al Amaariah, Riyadh, Saudi Arabia</p>
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
                      <p className="text-gray-600">Limited to 20 guests</p>
                      <p className="text-gray-600 text-sm">Waitlist available</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#F8F3E8] p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">The Experience</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="h-5 w-5 text-amber-500" />
                    <p className="text-gray-600">Intimate conversations around the fire</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Join us for an evening Iftar meal and fireside discussions at Fahad's farmhouse. This exclusive gathering brings together business leaders in a relaxed, intimate setting to share ideas and forge meaningful connections.
                  </p>
                  <p className="text-gray-600 italic">
                    "The most valuable connections are often made in the most informal settings."
                  </p>
                </div>

                <div className="bg-[#F8F3E8] p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Curated discussions on business and investment in Saudi Arabia
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Traditional Iftar meal in a spectacular outdoor setting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Meaningful networking with fellow leaders
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span> Prayer facilities available on-site
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FiresideChats;
