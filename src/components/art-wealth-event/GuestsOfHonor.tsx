import jenniferWines from "@/assets/jennifer-wines.jpg";
import ahmedMater from "@/assets/ahmed-mater.jpg";
import othmanAlKhozaim from "@/assets/othman-alkhozaim.jpg";
import nidaaHanifa from "@/assets/nidaa-hanifa.png";

const GuestsOfHonor = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary mb-6">Distinguished Guests</h3>
      
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={jenniferWines} 
              alt="Jennifer Wines" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <a href="https://jenniferwines.com" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Jennifer Wines
              </a>
              <p className="text-sm text-gray-600">Art Advisor & Wealth Management Expert</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Renowned art advisor specializing in building museum-quality collections for high-net-worth individuals and institutions. Jennifer brings decades of experience at the intersection of fine art and wealth preservation.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={othmanAlKhozaim} 
              alt="Othman Al-Khozaim" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h4 className="text-xl font-semibold text-primary">Othman Al-Khozaim</h4>
              <p className="text-sm text-gray-600">Saudi Contemporary Artist</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Internationally prominent Saudi artist known for blending Western art history with Islamic calligraphy and art. His work was showcased at the Vatican's "Letters without Words" exhibition in 2019, cementing his position as one of Saudi Arabia's most celebrated contemporary artists.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={ahmedMater} 
              alt="Ahmed Mater" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <a href="https://www.ahmedmater.com" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Ahmed Mater
              </a>
              <p className="text-sm text-gray-600">Saudi Artist & Physician</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            A pioneering Saudi artist whose work explores themes of transformation in contemporary Saudi society. Mater's multidisciplinary practice spans photography, sculpture, installation, and performance, with works held in major international collections including the British Museum and Los Angeles County Museum of Art.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={nidaaHanifa} 
              alt="Nidaa Hanifa" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <a href="https://hanifa-consulting.com" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Nidaa Hanifa
              </a>
              <p className="text-sm text-gray-600">Art Consultant & Cultural Strategist</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Founder of Hanifa Consulting, specializing in cultural strategy and art advisory services. Nidaa brings expertise in navigating the intersection of contemporary art, cultural preservation, and wealth management in the Middle East region.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
              <span className="text-2xl font-bold text-primary">SA</span>
            </div>
            <div>
              <a href="https://qantara.studio" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Sarah Albaiz
              </a>
              <p className="text-sm text-gray-600">Founder, Qantara Studio</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Founder of Qantara Studio, a pioneering initiative focused on building systems for cultural asset infrastructure in Saudi Arabia. Sarah's work bridges technology and cultural preservation, creating innovative platforms that document and celebrate the Kingdom's artistic heritage while fostering new forms of creative expression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
