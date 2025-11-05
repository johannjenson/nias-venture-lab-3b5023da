const WhatToExpect = () => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-primary mb-6">What to Expect</h2>
      <div className="space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Exquisite Dining</h3>
          <p className="text-gray-600">
            Enjoy a carefully curated multi-course dinner in an elegant setting, surrounded by inspiring art and architecture.
          </p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Art & Culture</h3>
          <p className="text-gray-600">
            Experience a guided tour of Shamalat Art Co.'s gallery and museum, showcasing exceptional contemporary and traditional works.
          </p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Elite Networking</h3>
          <p className="text-gray-600">
            Connect with 100 carefully selected investors, industry leaders, and unique founders in Saudi Arabia's innovation ecosystem.
          </p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Investment Insights</h3>
          <p className="text-gray-600">
            Engage in meaningful conversations about opportunities in Saudi Arabia's rapidly growing startup and innovation landscape.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Who Should Attend?</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Investors seeking opportunities in Saudi Arabia's innovation ecosystem</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Industry leaders shaping the future of business in the Kingdom</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Unique founders building transformative companies</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WhatToExpect;
