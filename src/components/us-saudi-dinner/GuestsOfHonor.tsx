import godfreyXuereb from "@/assets/godfrey-xuereb.png";
import barbaraLeaf from "@/assets/barbara-leaf.jpg";
import aliTulbah from "@/assets/ali-tulbah.jpg";
import sallyDonnelly from "@/assets/sally-donnelly.png";

const GuestsOfHonor = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Guests of Honor</h2>
      
      <div className="space-y-6">
        {/* Ambassador Barbara A. Leaf */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={barbaraLeaf} 
              alt="Ambassador Barbara A. Leaf" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">Ambassador Barbara A. Leaf</h4>
              <p className="text-sm text-gray-600">Former Assistant Secretary of State for Near Eastern Affairs</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Former Assistant Secretary of State for Near Eastern Affairs with over three decades of diplomatic experience in US-Middle East relations and strategic partnerships.
          </p>
        </div>

        {/* Ambassador Godfrey Xuereb */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={godfreyXuereb} 
              alt="H.E. Godfrey Xuereb" 
              className="w-20 h-20 rounded-full object-cover object-center border-2 border-primary scale-110 grayscale"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">H.E. Godfrey Xuereb</h4>
              <p className="text-sm text-gray-600">Ambassador of Malta to the United States</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Ambassador of Malta to the United States, fostering strategic partnerships in innovation and investment.
          </p>
        </div>

        {/* Ali H. Tulbah */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={aliTulbah} 
              alt="Ali H. Tulbah" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">Ali H. Tulbah</h4>
              <p className="text-sm text-gray-600">Senior Managing Director, Middle East & North Africa, McLarty Associates</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Former Associate Director for Cabinet Affairs in the George W. Bush White House and frequent speaker on US-GCC bilateral relations with extensive expertise in US-Middle East strategic partnerships.
          </p>
        </div>

        {/* Sally Donnelly */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={sallyDonnelly} 
              alt="Sally Donnelly" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">Sally Donnelly</h4>
              <p className="text-sm text-gray-600">Former Senior Advisor to Secretary of Defense</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Former Senior Advisor to Secretary of Defense James N. Mattis with extensive expertise in defense policy and US strategic partnerships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
