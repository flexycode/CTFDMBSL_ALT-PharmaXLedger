import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pharmaceutical Supply Chain Management
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              PharmaXLedger provides a secure, transparent, and efficient
              platform for healthcare professionals to manage pharmaceutical
              supply chains with real-time tracking and verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={() => (window.location.href = "/home")}
              >
                Browse Catalog
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={() => (window.location.href = "/about")}
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PharmaXLedger?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers end-to-end visibility and control over your
              pharmaceutical supply chain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Verified</h3>
              <p className="text-gray-600">
                All medicines are verified and tracked through our secure
                blockchain technology to prevent counterfeits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor your orders and inventory in real-time with complete
                visibility throughout the supply chain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Healthcare Network</h3>
              <p className="text-gray-600">
                Connect with verified healthcare institutions and professionals
                within our trusted network.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Gain valuable insights into your supply chain performance with
                advanced analytics and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to streamline your pharmaceutical supply chain?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of healthcare professionals who trust
                  PharmaXLedger for their pharmaceutical supply chain management
                  needs.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Get Started Today
                </Button>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 lg:p-16 text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  PharmaXLedger by the numbers
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-bold">500+</p>
                    <p className="text-blue-100">Healthcare Institutions</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold">10M+</p>
                    <p className="text-blue-100">Medicines Tracked</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold">99.9%</p>
                    <p className="text-blue-100">Supply Chain Accuracy</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold">24/7</p>
                    <p className="text-blue-100">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1584362917165-526a968579e8?w=64&q=80"
                  alt="PharmaXLedger Logo"
                  className="h-10 w-10 rounded-full mr-2"
                />
                <h2 className="text-xl font-bold text-white">PharmaXLedger</h2>
              </div>
              <p className="text-gray-400 mt-2">
                Advanced Pharmaceutical Supply Chain Management
              </p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white">
                      Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 PharmaXLedger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
