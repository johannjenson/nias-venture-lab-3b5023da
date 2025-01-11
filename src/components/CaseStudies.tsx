import { Building2 } from "lucide-react";

const cases = [
  {
    title: "Tech Innovation Hub",
    description: "How a global tech company established their MENA headquarters in Riyadh",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
  },
  {
    title: "Healthcare Expansion",
    description: "Successful market entry strategy for a leading healthcare provider",
    author: "Dr. Ahmed Al-Saud",
    role: "Director, HealthTech Solutions",
  },
  {
    title: "Fintech Revolution",
    description: "Partnership success story in the Saudi fintech ecosystem",
    author: "Michael Zhang",
    role: "Founder, PayTech",
  },
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Learn how companies like yours have successfully expanded into Saudi Arabia
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cases.map((case_study) => (
            <div
              key={case_study.title}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Building2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {case_study.title}
              </h3>
              <p className="text-gray-600 mb-6">{case_study.description}</p>
              <div className="border-t pt-4">
                <p className="font-medium text-gray-900">{case_study.author}</p>
                <p className="text-sm text-gray-500">{case_study.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;