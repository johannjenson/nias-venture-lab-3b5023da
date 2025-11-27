import { Card } from "@/components/ui/card";
import abeerImage from "@/assets/doers-summit/abeer-abdalla.jpeg";
import aliImage from "@/assets/doers-summit/ali-abulhasan.png";
import richardImage from "@/assets/doers-summit/richard-schrems.jpeg";
import johannImage from "@/assets/doers-summit/johann-jenson.png";

const Speakers = () => {
  const speakers = [
    {
      name: "Abeer Abdalla",
      title: "Managing Editor",
      company: "The Saudi Times",
      image: abeerImage,
    },
    {
      name: "Ali Abulhasan",
      title: "Co-Founder & CEO",
      company: "Tap Payments",
      image: aliImage,
    },
    {
      name: "Richard Schrems",
      title: "Co-founder and CEO",
      company: "palm.hr",
      image: richardImage,
    },
    {
      name: "Johann Jenson",
      title: "Founding Partner",
      company: "NIAS.io",
      image: johannImage,
    },
    {
      name: "Hassan Bakkala",
      title: "Government Liaison Executive",
      company: "",
      image: "",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Panel Speakers</h2>
      <div className="grid gap-6">
        {speakers.map((speaker) => (
          <Card key={speaker.name} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {speaker.image ? (
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{speaker.name}</h3>
                <p className="text-gray-600">{speaker.title}</p>
                {speaker.company && (
                  <p className="text-sm text-gray-500">{speaker.company}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
