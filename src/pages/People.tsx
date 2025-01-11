import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const team = [
    {
      name: "Ibrahim Alshuwaier",
      role: "Business Development",
      imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838", // Whimsical monkey with banana - represents business growth
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "Ibrahim AlSemari",
      role: "Finance",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", // Smart looking cat - represents financial wisdom
      linkedIn: "https://pinnacle.sa/staff/ibrahim-alsemari/",
    },
    {
      name: "Johann Jenson",
      role: "Product",
      imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Curious deer - represents product vision
      linkedIn: "https://www.linkedin.com/in/johannjenson/",
    },
    {
      name: "Lukas Gaebler",
      role: "Tech",
      imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15", // Mountain goats - represents technical climbing/advancement
      linkedIn: "https://at.linkedin.com/in/lukas-gaebler",
    },
  ];

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-14 left-4 z-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            People
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet our team of founders and leaders.
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;