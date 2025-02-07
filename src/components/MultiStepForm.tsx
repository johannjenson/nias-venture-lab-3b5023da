
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  interests: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    interests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
        console.log("Form submitted:", formData);
        toast.success("Application received! We'll review it and get back to you soon.");
        setStep(1);
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          interests: "",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1/3 h-1 rounded-full mx-1 transition-all duration-500 ${
                i <= step ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center text-gray-600 font-medium">
          Step {step} of 3
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Work Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Your Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="interests" className="text-sm font-semibold text-gray-700">
                What interests you about expanding to Saudi Arabia?
              </Label>
              <Input
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-medium transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            step === 3 ? "Submit Application" : "Continue"
          )}
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          {step === 3 ? "We review all applications within 48 hours" : "All fields are required"}
        </p>
      </form>
    </div>
  );
};

export default MultiStepForm;
