import markWadhwa from "@/assets/mark-wadhwa.png";

const GuestsOfHonor = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary mb-6">Featured Speaker</h3>
      
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={markWadhwa} 
              alt="Mark Wadhwa" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h4 className="text-xl font-semibold text-primary">Mark Wadhwa</h4>
              <p className="text-sm text-gray-600">Founder, 180 Studios</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Founder of 180 Studios in London, home to Soho House headquarters and LVMH's creative operations. Mark's pioneering work demonstrates how cultural programming, design, and creative ecosystems drive property value and urban competitiveness.
          </p>
          <div className="mt-4 bg-secondary/30 rounded-lg p-4">
            <p className="text-sm font-semibold text-primary mb-1">Keynote Address</p>
            <p className="text-sm text-gray-600">"Beyond Buildings: Real Estate as a Cultural Asset Class"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
