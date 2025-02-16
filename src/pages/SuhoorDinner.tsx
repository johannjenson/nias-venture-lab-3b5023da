
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { BackButton } from "@/components/ui/back-button";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";

const SuhoorDinner = () => {
  const handleRequestClick = () => {
    window.open('https://lu.ma/zlllw0y3', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <BackButton />
        </div>
      </div>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-[#F5F2EB]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                Nias Network Suhoor Dinner
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Join us for an intimate Suhoor dinner gathering with fellow business leaders, investors, and industry experts
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
                  Connect Over Suhoor
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience the spirit of Ramadan while building meaningful connections with fellow business leaders. This intimate gathering provides a unique opportunity to network and explore potential collaborations in a warm and welcoming atmosphere.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">When</h3>
                      <p className="text-gray-600">Saturday, March 8th, 2024</p>
                      <p className="text-gray-600">Evening to Night</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Schedule</h3>
                      <p className="text-gray-600">9:30 PM - Guest arrival and networking</p>
                      <p className="text-gray-600">10:00 PM - Suhoor meal</p>
                      <p className="text-gray-600">12:00 AM - Event concludes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Where</h3>
                      <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                      <p className="text-gray-600 text-sm">(Venue details shared upon registration)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Attendees</h3>
                      <p className="text-gray-600">Limited to 25 guests to ensure meaningful interactions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F5F2EB] p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">What to Expect</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Share a traditional Suhoor meal in an elegant setting</li>
                  <li>• Connect with key decision-makers in an intimate setting</li>
                  <li>• Discuss business opportunities in Saudi Arabia</li>
                  <li>• Share insights and experiences with fellow leaders</li>
                  <li>• Prayer facilities available on-site</li>
                </ul>
                <div className="mt-8">
                  <p className="text-gray-600 italic">
                    "Our events are carefully curated to bring together individuals who can create meaningful impact in the Kingdom's business landscape."
                  </p>
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

export default SuhoorDinner;
