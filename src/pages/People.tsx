import { ArrowLeft, LinkedinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const team = [
    {
      name: "Ibrahim Alshuwaier",
      role: "Founder & CEO",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "Abdulrahman Alolayan",
      role: "Co-Founder & Managing Director",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "John Doe",
      role: "Chief Technology Officer",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "Jane Smith",
      role: "Marketing Director",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "Alice Johnson",
      role: "Product Manager",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
    },
    {
      name: "Bob Brown",
      role: "Lead Designer",
      imageUrl: "/placeholder.svg",
      linkedIn: "https://www.linkedin.com/",
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
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
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
                    <LinkedinIcon className="h-5 w-5" />
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
