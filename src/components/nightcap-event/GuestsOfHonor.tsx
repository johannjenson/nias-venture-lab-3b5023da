import { Sparkles } from "lucide-react";

const GuestsOfHonor = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Special Guests</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-6 bg-[#F8F3E8] rounded-lg">
          <Sparkles className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">To Be Announced</h3>
            <p className="text-gray-600">
              We're curating a special lineup of guests for this intimate gathering. 
              Details will be shared with confirmed attendees closer to the date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
