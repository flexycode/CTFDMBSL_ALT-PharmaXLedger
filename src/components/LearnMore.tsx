import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              About Artificial Ledger Technology
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Pioneering blockchain solutions for healthcare and supply chain
              management
            </p>
            <Button
              variant="outline"
              className="bg-white hover:bg-blue-50 text-blue-700"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Application
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Company
            </h2>
            <p className="text-gray-700 mb-6">
              Artificial Ledger Technology is a pioneering startup focused on
              leveraging blockchain technology to solve complex challenges in
              healthcare and supply chain management. Founded in 2021, we are
              dedicated to creating transparent, secure, and efficient systems
              that transform how organizations manage critical data and assets.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Our First Product: PharmaXLedger
            </h3>
            <p className="text-gray-700 mb-6">
              PharmaXLedger is our flagship product, a comprehensive
              Pharmaceutical Supply Chain Management platform that
              revolutionizes how medications are tracked, verified, and
              distributed. Using advanced blockchain technology, PharmaXLedger
              ensures end-to-end visibility across the entire pharmaceutical
              supply chain, from manufacturer to patient.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg my-8">
              <h4 className="text-xl font-bold text-blue-800 mb-3">
                Key Features of PharmaXLedger:
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-blue-700">
                <li>Real-time inventory tracking across multiple warehouses</li>
                <li>Secure verification of medicine authenticity</li>
                <li>
                  Streamlined ordering process for healthcare institutions
                </li>
                <li>Comprehensive analytics and reporting</li>
                <li>Blockchain-backed data integrity and security</li>
                <li>Compliance with pharmaceutical regulations</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6">
              At Artificial Ledger Technology, our mission is to create
              transparent, secure, and efficient systems that leverage
              blockchain technology to solve real-world problems. We are
              committed to innovation, integrity, and excellence in everything
              we do.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Contact Us
            </h3>
            <p className="text-gray-700 mb-6">
              We're always looking for opportunities to collaborate and
              innovate. If you're interested in learning more about Artificial
              Ledger Technology or our PharmaXLedger platform, please don't
              hesitate to reach out.
            </p>

            <div className="flex justify-center mt-10">
              <Button size="lg" onClick={() => navigate("/home")}>
                Return to PharmaXLedger
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
