import godfreyXuereb from "@/assets/godfrey-xuereb.jpg";
import barbaraLeaf from "@/assets/barbara-leaf.jpg";

const GuestsOfHonor = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Guests of Honor</h2>
      
      <div className="space-y-6">
        {/* Ambassador Godfrey Xuereb */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={godfreyXuereb} 
              alt="H.E. Godfrey Xuereb" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">H.E. Godfrey Xuereb</h4>
              <p className="text-sm text-gray-600">Ambassador of Malta to the United States</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Ambassador Xuereb represents Malta's diplomatic and economic interests in the United States, fostering strategic partnerships and cross-border collaboration in innovation and investment.
          </p>
        </div>

        {/* Ambassador Barbara A. Leaf */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={barbaraLeaf} 
              alt="Ambassador Barbara A. Leaf" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">Ambassador Barbara A. Leaf</h4>
              <p className="text-sm text-gray-600">Former Assistant Secretary of State for Near Eastern Affairs</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            With over three decades of diplomatic experience, Ambassador Leaf served as the 25th Assistant Secretary of State for Near Eastern Affairs, developing and implementing policies across the Middle East region. She brings unparalleled expertise in US-Middle East relations, strategic partnerships, and regional economic development.
          </p>
        </div>

        <div className="mt-6 bg-[#F8F3E8] rounded-lg p-4">
          <p className="text-sm text-gray-700 italic">
            This exclusive gathering brings together distinguished diplomatic leaders and key stakeholders shaping US-Saudi strategic partnerships in technology, innovation, and investment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
