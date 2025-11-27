const WhatToExpect = () => {
  const expectations = [
    {
      title: "Real Expansion Journeys",
      description: "Hear firsthand accounts from founders who successfully broke into the GCC and Saudi markets."
    },
    {
      title: "Investment & Fundraising",
      description: "Learn how companies secured investment in the region and built relationships with local investors."
    },
    {
      title: "Regulatory Navigation",
      description: "Understand the practical steps for navigating regulations and government relationships in Saudi Arabia."
    },
    {
      title: "Scaling Strategies",
      description: "Discover how companies scaled from local operations to regional presence across the GCC."
    },
    {
      title: "Operator-Level Insights",
      description: "Get actionable, tactical insights that operators don't typically share on stage."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect</h2>
      <div className="space-y-6">
        {expectations.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatToExpect;
