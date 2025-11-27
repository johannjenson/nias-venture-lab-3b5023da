const WhatToExpect = () => {
  const expectations = [
    {
      title: "Real Expansion Journeys",
      description: "Firsthand accounts from founders who successfully broke into the GCC and Saudi markets."
    },
    {
      title: "Investment & Fundraising",
      description: "How companies secured investment and built relationships with local investors."
    },
    {
      title: "Regulatory Navigation",
      description: "Practical steps for navigating regulations and government relationships."
    },
    {
      title: "Scaling Strategies",
      description: "How companies scaled from local operations to regional GCC presence."
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
