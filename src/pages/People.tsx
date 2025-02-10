import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const team = [
    {
      name: "Ibrahim Alshuwaier",
      role: "Business Development",
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027", // Two brown deer representing strategic vision
      linkedIn: "", // Removed LinkedIn URL
    },
    {
      name: "Fahad Alsudairy",
      role: "Real Estate",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", // Arabian antelope representing native Saudi wildlife
      linkedIn: "", // No LinkedIn profile
    },
    {
      name: "Ibrahim AlSemari",
      role: "Finance",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", // Antelope and zebra representing balance and precision
      linkedIn: "https://sa.linkedin.com/in/ibrahim-alsemari-cfa-cpa-3a3866162",
    },
    {
      name: "Johann Jenson",
      role: "Product",
      imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a", // Brown ox representing strength and stability
      linkedIn: "https://www.linkedin.com/in/johannjenson/",
    },
    {
      name: "Lukas Gaebler",
      role: "Tech",
      imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2", // Horses representing power and adaptability
      linkedIn: "https://at.linkedin.com/in/lukas-gaebler",
    },
    {
      name: "Richard Schrems",
      role: "Operations",
      imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3", // Camels representing endurance and adaptability
      linkedIn: "https://sa.linkedin.com/in/richardschrems",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              People
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meet the crew at Nias
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                {person.linkedIn && (
                  <ul role="list" className="mt-6 flex gap-x-6">
                    <li>
                      <a
                        href={person.linkedIn}
                        className="text-gray-400 hover:text-gray-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                          <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default People;
