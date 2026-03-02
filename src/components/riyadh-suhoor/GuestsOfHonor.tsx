import khaledAlzaini from "@/assets/khaled-alzaini.png";
import mariaMedvedeva from "@/assets/maria-medvedeva.jpg";
import fawazAlBassam from "@/assets/fawaz-albassam.jpg";

const GuestsOfHonor = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Guests of Honor</h2>
      <div className="space-y-6">

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={fawazAlBassam}
              alt="H.E. Assistant Deputy Minister Fawaz AlBassam"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <a href="https://sa.linkedin.com/in/fawazb" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline block">
                H.E. Assistant Deputy Minister Fawaz AlBassam
              </a>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={khaledAlzaini}
              alt="Khaled Alzaini"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <a href="https://sa.linkedin.com/in/khalidalzaini" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline block">
                Khaled Alzaini
              </a>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={mariaMedvedeva}
              alt="Maria Medvedeva"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary grayscale"
            />
            <div>
              <a href="https://sa.linkedin.com/in/maria-medvedevaa" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-primary hover:underline block">
                Maria Medvedeva
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuestsOfHonor;
