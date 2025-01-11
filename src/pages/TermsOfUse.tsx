import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-14 left-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms of Use</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using the services provided by Nias LLC ("we," "our," or "us"), you agree to be bound by these Terms of Use.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Services</h2>
          <p>
            Our services are provided for business and professional use. You agree to use our services only for lawful purposes and in accordance with these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            The content, features, and functionality of our services are owned by Nias LLC and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            Nias LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Saudi Arabia, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
          <p>
            For any questions about these Terms, please contact us at:
          </p>
          <p className="mt-4">
            Nias LLC<br />
            Email: legal@nias.io
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;