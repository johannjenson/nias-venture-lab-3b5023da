import { LinkedinIcon } from "lucide-react";

const People = () => {
  const team = [
    {
      name: "Ibrahim Alshuwaier",
      role: "Co-Founder",
    },
    {
      name: "Ibrahim AlSemari",
      role: "Co-Founder",
      link: "https://pinnacle.sa/staff/ibrahim-alsemari/",
    },
    {
      name: "Johann Jenson",
      role: "Co-Founder",
      link: "https://www.linkedin.com/in/johannjenson/",
    },
    {
      name: "Lukas Gaebler",
      role: "Co-Founder",
      link: "https://at.linkedin.com/in/lukas-gaebler",
    },
  ];

  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet the founders and leaders driving our vision forward.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {team.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-start bg-accent/30 rounded-lg p-6 hover:bg-accent transition-colors"
              >
                <dt className="text-xl font-semibold leading-7 text-primary">
                  {person.name}
                </dt>
                <dd className="mt-1 flex flex-grow flex-col">
                  <p className="flex-grow text-base leading-7 text-gray-600">
                    {person.role}
                  </p>
                  {person.link && (
                    <a
                      href={person.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      View Profile
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default People;