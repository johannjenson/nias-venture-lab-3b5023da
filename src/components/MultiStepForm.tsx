import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  interests: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      toast.success("Thank you for your interest! We'll be in touch soon.");
      setStep(1);
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        interests: "",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1/3 h-2 rounded-full mx-1 ${
                i <= step ? "bg-accent" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-center text-gray-600">
          Step {step} of 3
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-slideUp">
            <div>
              <Label htmlFor="interests">What interests you about Saudi Arabia?</Label>
              <Input
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90"
        >
          {step === 3 ? "Submit" : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default MultiStepForm;