import React from 'react';
import Footer from "@/components/Footer";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";

const VSQRiyadhEvent = () => {
  const navigate = useNavigate();
  const handleRequestClick = () => {
    window.open('https://www.vntr.vc/events/riyadh-697', '_blank', 'noopener,noreferrer');
  };
  
  const speakers = [{
    name: "Khalid Aldoseri",
    title: "Vice Chairman",
    organization: "Aldoseri Investments",
    linkedin: "https://www.linkedin.com/in/khalidaldoseri"
  }, {
    name: "Dr. Fahad Mushayt",
    title: "Chief Executive Officer",
    organization: "ASFAR",
    linkedin: "https://www.linkedin.com/in/dr-fahad-mushayt-36792622"
  }, {
    name: "Ibrahim AlShuwaier",
    title: "Partner",
    organization: "Nias.io",
    linkedin: "https://www.linkedin.com/in/ibrahim-alshuwaier-b18571144"
  }, {
    name: "Pavel Korolev",
    title: "CEO",
    organization: "Pulsar",
    linkedin: "https://www.linkedin.com/in/pkorolev"
  }, {
    name: "Khalid Aghamdi",
    title: "Co-founder & CEO",
    organization: "LASDI",
    linkedin: "https://www.linkedin.com/in/ghamdik"
  }, {
    name: "Danilo Lacmanovic",
    title: "Founder and CEO",
    organization: "Regency Project Management",
    linkedin: "https://www.linkedin.com/in/danilo-lacmanovic"
  }, {
    name: "Kamal Hassan",
    title: "Managing Partner",
    organization: "Loyal VC",
    linkedin: "https://www.linkedin.com/in/kamalhassan"
  }, {
    name: "Nicholas S. Bingham",
    title: "Founding Partner & CEO",
    organization: "Taranis Capital",
    linkedin: "https://www.linkedin.com/in/nicholas-s-bingham-30862920"
  }, {
    name: "Yuri Rabinovich",
    title: "Managing Partner",
    organization: "VNTR",
    linkedin: "https://www.linkedin.com/in/byuric"
  }, {
    name: "Johann Jenson",
    title: "Partner",
    organization: "Nias Network",
    linkedin: "https://www.linkedin.com/in/johannjenson"
  }, {
    name: "Amin Ramadan",
    title: "Managing Partner",
    organization: "Auzua Holding Group",
    linkedin: "https://www.linkedin.com/in/amin-ramadan-8b3a3b1a0"
  }, {
    name: "Maged Harby",
    title: "General Partner",
    organization: "VMS",
    linkedin: "https://www.linkedin.com/in/maged-harby-9a8b3a1a0"
  }, {
    name: "Adib Samara",
    title: "GM - Saudi Arabia",
    organization: "Blacklane",
    linkedin: "https://www.linkedin.com/in/adib-samara-5a8b3a1a0"
  }, {
    name: "Bassam AlKharashi",
    title: "CEO",
    organization: "i-be",
    linkedin: "https://www.linkedin.com/in/bassam-alkharashi-3a8b3a1a0"
  }, {
    name: "Ibrahim Alshihabi",
    title: "Chapter Director",
    organization: "VNTR",
    linkedin: "https://www.linkedin.com/in/ibrahim-alshihabi-1a8b3a1a0"
  }, {
    name: "Tom Preston-Werner",
    title: "Cofounder",
    organization: "Preston-Werner Ventures",
    linkedin: "https://www.linkedin.com/in/tom-preston-werner"
  }, {
    name: "Mark Wadhwa",
    title: "Founder",
    organization: "Vinyl Factory",
    linkedin: ""
  }, {
    name: "Maximilian Plank",
    title: "Venture Partner / Managing Partner",
    organization: "Tenity / Antler / Stableton",
    linkedin: "https://www.linkedin.com/in/maximilian-plank-2a8b3a1a0"
  }];
  
  const agenda = [{
    time: "9:00",
    description: "Registrations and coffee"
  }, {
    time: "9:30",
    description: "Welcome"
  }, {
    time: "9:45",
    description: "Introduction to Partners"
  }, {
    time: "10:00",
    description: 'Keynote: "Investing in Place" – Dr. Fahad Mushayt, CEO of ASFAR'
  }, {
    time: "10:30",
    description: 'Panel: "Media, Film & Gaming in Saudi Arabia"'
  }, {
    time: "11:00",
    description: "Coffee Break"
  }, {
    time: "11:30",
    description: 'Keynote: "Saudi VC Ecosystem"'
  }, {
    time: "11:45",
    description: 'Keynote: "Capital Raising in the GCC"'
  }, {
    time: "12:00",
    description: 'Panel: "Venture Builders and Studios"'
  }, {
    time: "12:30",
    description: 'Panel: "VC in Saudi by 2030"'
  }, {
    time: "13:00",
    description: "VIP Lunch"
  }, {
    time: "14:00",
    description: "Roundtables (CVC, Venture Building, Sustainability, AI, SportTech)"
  }, {
    time: "16:00",
    description: "Closing Remarks"
  }, {
    time: "16:15",
    description: "1-on-1 Meetings"
  }, {
    time: "19:00",
    description: "VIP Dinner"
  }, {
    time: "22:00",
    description: "Closing"
  }];
  
  return <div className="min-h-screen bg-white">
      <Helmet>
        <title>VNTR Investor Forum Riyadh | Nias Network</title>
        <meta name="description" content="Join VNTR Investor Forum in Riyadh on April 23rd, 2025 for a day of keynotes, panels, and networking with industry leaders, in partnership with Nias Network." />
      </Helmet>
      
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <Waves className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>

      <main className="pt-16">
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                VNTR Investor Forum Riyadh
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                A comprehensive gathering of investors and industry leaders in Riyadh, in partnership with Nias Network
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={handleRequestClick}>
                Register Now
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 gap-16">
              <div className="bg-secondary/20 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Event Details
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Date & Time</h3>
                    <p className="text-gray-600">April 23rd, 2025 | 9:00 AM - 10:00 PM AST</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Location</h3>
                    <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-600 text-sm">(Exact venue details shared upon registration)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Registration</h3>
                    <p className="text-gray-600">
                      Register at <a href="https://www.vntr.vc/events/riyadh-697" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.vntr.vc/events/riyadh-697</a>
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-gray-600">
                    VNTR Investor Forum Riyadh brings together investors, entrepreneurs, and industry leaders for a day of insights, networking, and opportunities in the Saudi investment landscape.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Agenda
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agenda.map(item => <Card key={item.time} className="bg-secondary/10 border-none">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded p-2 min-w-[60px] text-center font-semibold">
                          {item.time}
                        </div>
                        <div className="text-gray-700 pt-2">
                          {item.description}
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-primary mb-10 text-left">Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {speakers.map(speaker => <div key={speaker.name} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-primary">{speaker.name}</h3>
                  <p className="text-sm text-gray-600">{speaker.title}</p>
                  <p className="text-sm text-gray-600 mb-3">{speaker.organization}</p>
                  <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                </div>)}
            </div>
          </div>
        </section>

        <section id="register" className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Register for VNTR Investor Forum
              </h2>
              <p className="text-gray-600 mb-8">
                Secure your spot at this exclusive forum bringing together top investors and industry leaders in Riyadh, in partnership with Nias Network.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={handleRequestClick}>
                Register Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};

export default VSQRiyadhEvent;
