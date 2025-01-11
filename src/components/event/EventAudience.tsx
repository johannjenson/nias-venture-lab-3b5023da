const audiences = [
  {
    title: "Business Leaders",
    description: "CEOs, founders, and executives looking to expand their operations into Saudi Arabia."
  },
  {
    title: "Investors",
    description: "VCs, private equity firms, and strategic investors seeking opportunities aligned with Vision 2030."
  },
  {
    title: "Industry Experts",
    description: "Advisors and professionals with deep expertise in Saudi market entry and growth."
  }
];

const EventAudience = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Who Should Attend</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {audiences.map((audience) => (
            <div key={audience.title} className="text-center p-8 rounded-lg bg-white">
              <h3 className="text-xl font-semibold text-primary mb-4">{audience.title}</h3>
              <p className="text-gray-600 mb-6">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventAudience;