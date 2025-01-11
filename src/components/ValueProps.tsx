import { Building2, Users, Briefcase } from "lucide-react";

const features = [
  {
    name: "Smooth Landing",
    description: "Navigate regulatory requirements and local partnerships with confidence.",
    icon: Building2,
  },
  {
    name: "Trusted Advisors",
    description: "Connect with experienced professionals who understand your needs.",
    icon: Users,
  },
  {
    name: "Strategic Financing",
    description: "Access funding opportunities aligned with Vision 2030.",
    icon: Briefcase,
  },
];

const ValueProps = () => {
  return (
    <div className="py-24 bg-secondary sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Why Choose Nias
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide comprehensive support for businesses looking to establish and grow
            their presence in Saudi Arabia.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-accent">
                  <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-primary">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;