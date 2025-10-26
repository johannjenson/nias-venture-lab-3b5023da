import { Coffee, MessageCircle, Users2 } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">What to Expect</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Coffee className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Relaxed Atmosphere</h3>
            <p className="text-gray-600">
              An informal setting perfect for unwinding and continuing conversations 
              from the day's events. Traditional Riyadh hospitality in a unique venue.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Meaningful Connections</h3>
            <p className="text-gray-600">
              Connect with fellow innovators, entrepreneurs, and leaders in an intimate 
              setting designed for genuine conversation and relationship building.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Curated Guest List</h3>
            <p className="text-gray-600">
              A carefully selected group of attendees from across technology, business, 
              and the innovation ecosystem, ensuring quality conversations and connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatToExpect;
