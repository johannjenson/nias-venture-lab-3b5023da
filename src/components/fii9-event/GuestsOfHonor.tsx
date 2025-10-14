import { Crown, Building2, Lightbulb } from "lucide-react";
import ibrahimNeyaz from "@/assets/ibrahim-neyaz.jpg";
import princeKhalid from "@/assets/prince-khalid.png";

const GuestsOfHonor = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary mb-6">Distinguished Guests</h3>
      
      <div className="space-y-6">
        {/* Royal Guest */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={princeKhalid} 
              alt="H.H. Prince Khalid Bin Bader Al Saud" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">H.H. Prince Khalid Bin Bader Al Saud</h4>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Royal visionary and innovation champion supporting Saudi Arabia's entrepreneurial transformation.
          </p>
        </div>

        {/* NTDP Leader */}
        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={ibrahimNeyaz} 
              alt="Ibrahim Neyaz" 
              className="w-20 h-20 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h4 className="text-lg font-semibold text-primary">Ibrahim Neyaz</h4>
              <p className="text-sm text-gray-600">CEO, National Technology Development Program (NTDP)</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Leading Saudi Arabia's technology ecosystem development and supporting the next generation of tech entrepreneurs.
          </p>
        </div>

        {/* Global Innovation Leaders */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Global Innovation Leaders
          </h4>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-primary">Bipul Sinha</p>
              <p className="text-sm text-gray-600">CEO, Rubrik</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-primary">Mark Ghermezian</p>
              <p className="text-sm text-gray-600">Co-founder, Braze</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-primary">Qasar Younis</p>
              <p className="text-sm text-gray-600">CEO, Applied Intuition</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-primary">Anu Hariharan</p>
              <p className="text-sm text-gray-600">Founder, Avra</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-primary">Amjad Masad</p>
              <p className="text-sm text-gray-600">CEO, Replit</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-secondary/30 rounded-lg p-4">
          <p className="text-sm text-gray-700 italic">
            Plus additional distinguished guests from Avra's portfolio of visionary founders and Saudi Arabia's innovation ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
