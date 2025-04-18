import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  Building,
  BookOpen,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              About PharmaXLedger
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Revolutionizing pharmaceutical supply chain management with
              blockchain technology
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Story</CardTitle>
                  <CardDescription>
                    How PharmaXLedger began and where we're headed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Founded in 2022, PharmaXLedger was born out of a vision to
                    transform how pharmaceutical products are tracked, verified,
                    and distributed across Southeast Asia. Our founders, a team
                    of healthcare professionals and blockchain experts,
                    recognized the critical challenges facing pharmaceutical
                    supply chains: counterfeiting, inefficient distribution, and
                    lack of transparency.
                  </p>
                  <p>
                    Based in Manila, Philippines, with regional offices in
                    Singapore and Jakarta, we've grown to become a trusted
                    partner for healthcare institutions across the region. Our
                    platform now serves over 500 healthcare institutions and has
                    tracked more than 10 million medicines with 99.9% supply
                    chain accuracy.
                  </p>
                  <p>
                    Today, PharmaXLedger continues to innovate at the
                    intersection of healthcare and technology, with a focus on
                    expanding our services throughout Southeast Asia and beyond.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Headquarters</CardTitle>
                      <CardDescription>Manila, Philippines</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Established in 2022</p>
                    <p>Regional offices in Singapore and Jakarta</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Our Team</CardTitle>
                      <CardDescription>
                        Experts in healthcare & technology
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>120+ employees across Southeast Asia</p>
                    <p>
                      Diverse team of pharmacists, developers, and supply chain
                      experts
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Certifications</CardTitle>
                      <CardDescription>
                        Industry standards & compliance
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>ISO 27001 Certified</p>
                    <p>GDPR Compliant</p>
                    <p>FDA Philippines Approved</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mission" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission & Vision</CardTitle>
                  <CardDescription>What drives us forward</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      Mission
                    </h3>
                    <p className="text-blue-900">
                      To create a transparent, efficient, and secure
                      pharmaceutical supply chain that ensures every patient
                      receives authentic medication, while empowering healthcare
                      professionals with real-time data and insights.
                    </p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                      Vision
                    </h3>
                    <p className="text-indigo-900">
                      A world where counterfeit medicines are eliminated, supply
                      chain inefficiencies are minimized, and healthcare
                      institutions can focus on what matters most: patient care.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Our Core Values
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Transparency</h4>
                      <p className="text-gray-600">
                        We believe in complete visibility across the
                        pharmaceutical supply chain, from manufacturer to
                        patient.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Integrity</h4>
                      <p className="text-gray-600">
                        We uphold the highest ethical standards in all our
                        operations and partnerships.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Innovation</h4>
                      <p className="text-gray-600">
                        We continuously explore new technologies and approaches
                        to solve complex healthcare challenges.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Collaboration</h4>
                      <p className="text-gray-600">
                        We work closely with all stakeholders in the healthcare
                        ecosystem to create integrated solutions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Impact</CardTitle>
                  <CardDescription>
                    Making a difference in healthcare
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        500+
                      </div>
                      <p className="text-gray-600">
                        Healthcare institutions served
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        10M+
                      </div>
                      <p className="text-gray-600">Medicines tracked</p>
                    </div>

                    <div className="p-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        99.9%
                      </div>
                      <p className="text-gray-600">Supply chain accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Team</CardTitle>
                  <CardDescription>
                    The people behind PharmaXLedger
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=ceo"
                          alt="CEO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">
                        Dr. Maria Santos
                      </h3>
                      <p className="text-blue-600">Chief Executive Officer</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Former Head of Pharmacy at Philippine General Hospital
                        with 15+ years in healthcare management
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=cto"
                          alt="CTO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">Raj Patel</h3>
                      <p className="text-blue-600">Chief Technology Officer</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Blockchain expert with previous experience at Singapore
                        Health Technologies
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=coo"
                          alt="COO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">Nguyen Minh</h3>
                      <p className="text-blue-600">Chief Operations Officer</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supply chain specialist with experience across Southeast
                        Asian markets
                      </p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="font-semibold text-lg mb-4">Our Team</h3>
                    <p>
                      Beyond our leadership, PharmaXLedger is powered by a
                      diverse team of 120+ professionals across Southeast Asia,
                      including:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                      <li>Pharmacists and healthcare specialists</li>
                      <li>Software engineers and blockchain developers</li>
                      <li>Supply chain and logistics experts</li>
                      <li>Data scientists and analysts</li>
                      <li>Customer success managers</li>
                      <li>Regulatory compliance specialists</li>
                    </ul>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="font-semibold text-lg mb-4">
                      Join Our Team
                    </h3>
                    <p className="mb-4">
                      We're always looking for talented individuals passionate
                      about healthcare and technology.
                    </p>
                    <Button>View Open Positions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>We'd love to hear from you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Headquarters</p>
                            <p className="text-gray-600">
                              123 Ayala Avenue, Makati City, Metro Manila,
                              Philippines
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600">+63 (2) 8123 4567</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600">
                              info@pharmaxledger.com
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mt-8 mb-4">
                        Regional Offices
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Singapore</p>
                          <p className="text-gray-600">
                            50 Raffles Place, Singapore Land Tower, Singapore
                          </p>
                        </div>

                        <div>
                          <p className="font-medium">Jakarta</p>
                          <p className="text-gray-600">
                            Menara Sudirman, Jl. Jend. Sudirman Kav. 60,
                            Jakarta, Indonesia
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">
                        Send Us a Message
                      </h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Name
                            </label>
                            <Input id="name" placeholder="Your name" />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Your email"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Subject
                          </label>
                          <Input id="subject" placeholder="How can we help?" />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your message"
                          ></textarea>
                        </div>

                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>
                    Get help with our products and services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6 text-center">
                      <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Documentation</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Browse our comprehensive guides and documentation
                      </p>
                      <Button variant="outline" size="sm">
                        View Docs
                      </Button>
                    </div>

                    <div className="border rounded-lg p-6 text-center">
                      <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Technical Support</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get help from our technical support team
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Support
                      </Button>
                    </div>

                    <div className="border rounded-lg p-6 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Community</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Join our community of healthcare professionals
                      </p>
                      <Button variant="outline" size="sm">
                        Join Community
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
