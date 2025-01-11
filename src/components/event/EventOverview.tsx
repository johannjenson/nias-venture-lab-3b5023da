import { Building2, Users2, LineChart } from "lucide-react";

const features = [
  {
    icon: Users2,
    title: "Strategic Networking",
    description: "Connect with decision-makers and industry leaders in an intimate setting."
  },
  {
    icon: LineChart,
    title: "Market Insights",
    description: "Gain valuable perspectives on the Saudi market and Vision 2030 opportunities."
  },
  {
    icon: Building2,
    title: "Deal Flow",
    description: "Explore partnerships and investment opportunities with vetted businesses."
  }
];

const EventOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              A Transformative Business Experience
            </h2>
            <p className="text-gray-600 mb-6">
              The Nias Business Forum brings together visionary leaders, innovative entrepreneurs, 
              and strategic investors for a day of meaningful connections and opportunities.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-primary font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">Event Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary">Date & Time</h4>
                <p className="text-gray-600">February 20th, 2025 | 7:00 PM - 2:00 AM</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Location</h4>
                <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                <p className="text-gray-600 text-sm">(Exact venue details shared upon registration)</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Format</h4>
                <p className="text-gray-600">Curated networking, panel discussions, and 1:1 meetings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventOverview;