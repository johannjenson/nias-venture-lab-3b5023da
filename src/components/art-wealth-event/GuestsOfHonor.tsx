import jenniferWines from "@/assets/jennifer-wines.jpg";
import ahmedMater from "@/assets/ahmed-mater.jpg";
import othmanAlKhozaim from "@/assets/othman-alkhozaim.jpg";
import nidaaHanifa from "@/assets/nidaa-hanifa.png";
import sarahAlbaiz from "@/assets/sarah-albaiz.webp";
import svetlanaMarich from "@/assets/svetlana-marich-photo.png";

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
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <a href="https://jenniferwines.com" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Jennifer Wines
              </a>
              <p className="text-sm text-gray-600">Founder, INVISIBLE WEALTH Consulting</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Founder of INVISIBLE WEALTH Consulting, Jennifer partners with individuals and institutions to usher in the next generation of wealth. With experience at Goldman Sachs, JPMorgan, and Fidelity, she helps current and future wealth holders navigate the rich complexities of self and wealth—because the new wealth paradigm extends far beyond money.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={svetlanaMarich} 
              alt="Svetlana Marich" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <a href="https://malevich.co.uk/team" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-primary hover:underline">
                Svetlana Marich
              </a>
              <p className="text-sm text-gray-600">Founder, Malevich.io & Former Worldwide Deputy Chairman, Phillips</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Curator, writer, and contemporary art expert based in London. As Worldwide Deputy Chairman at Phillips (2016-2023), Svetlana brought extensive expertise to the auction world. She founded Malevich.io in 2017 to support artists through exhibitions and production, collaborating with institutions like Centre Pompidou, Serpentine Galleries, and Goldsmiths CCA. In 2023, she established Malevich's art advisory arm, focusing on building collections for private museums and institutions.
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
            <img 
              src={sarahAlbaiz} 
              alt="Sarah Albaiz" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
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
