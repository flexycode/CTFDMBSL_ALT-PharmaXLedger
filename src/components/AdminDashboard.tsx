import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Activity,
  TrendingUp,
  AlertCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  Building,
  Warehouse,
  Users,
  ShoppingCart,
  ArrowLeft,
  Save,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import MedicineForm from "./MedicineForm";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ParentCompany {
  id: string;
  name: string;
  address: string;
}

interface SubsidiaryCompany {
  id: string;
  name: string;
  address: string;
  parent_company_id: string;
}

interface Warehouse {
  id: string;
  location: string;
  subsidiary_company_id: string;
}

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
  inStock: boolean;
  imageUrl: string;
  batch_order_id?: string;
  supplier_id?: string;
  warehouse_id?: string;
  inventory?: Inventory[];
}

interface Inventory {
  id: string;
  warehouse_id: string;
  medicine_id: string;
  quantity: number;
}

interface Supplier {
  id: string;
  name: string;
  contact_info: string;
}

interface BatchOrder {
  id: string;
  supplier_id: string;
  order_date: string;
  delivery_date: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  order_date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  parent_company_id?: string;
  subsidiary_company_id?: string;
  items?: number;
  company?: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState("");
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<any>(null);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [parentCompanies, setParentCompanies] = useState<ParentCompany[]>([]);
  const [subsidiaryCompanies, setSubsidiaryCompanies] = useState<
    SubsidiaryCompany[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [showParentCompanyForm, setShowParentCompanyForm] = useState(false);
  const [currentParentCompany, setCurrentParentCompany] =
    useState<ParentCompany | null>(null);
  const [showSubsidiaryCompanyForm, setShowSubsidiaryCompanyForm] =
    useState(false);
  const [currentSubsidiaryCompany, setCurrentSubsidiaryCompany] =
    useState<SubsidiaryCompany | null>(null);

  useEffect(() => {
    if (activeTab === "inventory") {
      fetchMedicines();
    } else if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "companies") {
      fetchCompanies();
    }
  }, [activeTab]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("medicines").select("*");

      if (error) {
        console.error("Error fetching medicines:", error);
      } else if (data) {
        setMedicines(data);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = () => {
    setCurrentMedicine(null);
    setShowMedicineForm(true);
  };

  const handleEditMedicine = (medicine: any) => {
    setCurrentMedicine(medicine);
    setShowMedicineForm(true);
  };

  const handleDeleteMedicine = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        const { error } = await supabase
          .from("medicines")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting medicine:", error);
        } else {
          fetchMedicines();
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  const handleSaveMedicine = () => {
    setShowMedicineForm(false);
    fetchMedicines();
  };

  // Mock data for inventory stats
  const inventoryStats = {
    total: 1248,
    lowStock: 24,
    pendingOrders: 36,
  };

  // Mock data for recent inventory updates
  const recentInventoryUpdates = [
    {
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      stock: 342,
      status: "In Stock",
      date: "Today, 10:30 AM",
      warehouse: "Manila Distribution Center",
    },
    {
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      stock: 156,
      status: "Low Stock",
      date: "Yesterday, 3:45 PM",
      warehouse: "Cebu Regional Warehouse",
    },
    {
      name: "Metformin 850mg",
      category: "Diabetes",
      stock: 89,
      status: "In Stock",
      date: "Yesterday, 11:20 AM",
      warehouse: "Davao Supply Hub",
    },
    {
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      stock: 12,
      status: "Critical",
      date: "2 days ago",
      warehouse: "Manila Distribution Center",
    },
  ];

  const fetchOrders = async () => {
    setOrderLoading(true);
    try {
      const { data, error } = await supabase.from("orders").select("*");

      if (error) {
        console.error("Error fetching orders:", error);
      } else if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleAddOrder = () => {
    setCurrentOrder(null);
    setShowOrderForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setCurrentOrder(order);
    setShowOrderForm(true);
  };

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const { error } = await supabase.from("orders").delete().eq("id", id);

        if (error) {
          console.error("Error deleting order:", error);
        } else {
          fetchOrders();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleSaveOrder = async (order: Order) => {
    try {
      if (order.id) {
        // Update existing order
        const { error } = await supabase
          .from("orders")
          .update(order)
          .eq("id", order.id);

        if (error) {
          console.error("Error updating order:", error);
          return false;
        }
      } else {
        // Create new order
        const { error } = await supabase.from("orders").insert([order]);

        if (error) {
          console.error("Error creating order:", error);
          return false;
        }
      }
      fetchOrders();
      setShowOrderForm(false);
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      return false;
    }
  };

  // Fallback to mock data if no orders are fetched yet
  const recentOrders =
    orders.length > 0
      ? orders
      : [
          {
            id: "ORD-1234",
            customer_name: "Dr. Sarah Johnson",
            customer_email: "sarah@example.com",
            order_date: "2023-04-17T09:15:00",
            total: 456.78,
            status: "pending",
            items: 5,
            company: "MediCorp Regional Hospital",
          },
          {
            id: "ORD-1233",
            customer_name: "Dr. Michael Chen",
            customer_email: "michael@example.com",
            order_date: "2023-04-16T14:30:00",
            total: 289.95,
            status: "processing",
            items: 3,
            company: "Global Pharma Research Center",
          },
          {
            id: "ORD-1232",
            customer_name: "Dr. Emily Rodriguez",
            customer_email: "emily@example.com",
            order_date: "2023-04-16T10:45:00",
            total: 712.5,
            status: "shipped",
            items: 8,
            company: "HealthTech Medical Center",
          },
          {
            id: "ORD-1231",
            customer_name: "Dr. James Wilson",
            customer_email: "james@example.com",
            order_date: "2023-04-14T11:20:00",
            total: 145.25,
            status: "delivered",
            items: 2,
            company: "MediCorp Community Clinic",
          },
        ];

  // Mock data for suppliers
  const mockSuppliers: Supplier[] = [
    {
      id: "1",
      name: "TGP Pharma Inc.",
      contact_info: "tgp@example.com | +63 2 8123 4567",
    },
    {
      id: "2",
      name: "RiteMED Phils. Inc.",
      contact_info: "ritemed@example.com | +63 2 8765 4321",
    },
    {
      id: "3",
      name: "Sandoz Pharmaceuticals",
      contact_info: "sandoz@example.com | +63 2 8987 6543",
    },
    {
      id: "4",
      name: "Actimed Pharmaceuticals",
      contact_info: "actimed@example.com | +63 2 8456 7890",
    },
  ];

  const fetchCompanies = async () => {
    setCompanyLoading(true);
    try {
      // Fetch parent companies
      const { data: parentData, error: parentError } = await supabase
        .from("parent_companies")
        .select("*");

      if (parentError) {
        console.error("Error fetching parent companies:", parentError);
      } else if (parentData) {
        setParentCompanies(parentData);
      }

      // Fetch subsidiary companies
      const { data: subsidiaryData, error: subsidiaryError } = await supabase
        .from("subsidiary_companies")
        .select("*");

      if (subsidiaryError) {
        console.error("Error fetching subsidiary companies:", subsidiaryError);
      } else if (subsidiaryData) {
        setSubsidiaryCompanies(subsidiaryData);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleAddParentCompany = () => {
    setCurrentParentCompany(null);
    setShowParentCompanyForm(true);
  };

  const handleEditParentCompany = (company: ParentCompany) => {
    setCurrentParentCompany(company);
    setShowParentCompanyForm(true);
  };

  const handleDeleteParentCompany = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this parent company? This will also delete all subsidiary companies associated with it.",
      )
    ) {
      try {
        const { error } = await supabase
          .from("parent_companies")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting parent company:", error);
        } else {
          fetchCompanies();
        }
      } catch (error) {
        console.error("Error deleting parent company:", error);
      }
    }
  };

  const handleSaveParentCompany = async () => {
    if (
      !currentParentCompany ||
      !currentParentCompany.name ||
      !currentParentCompany.address
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (currentParentCompany.id) {
        // Update existing parent company
        const { error } = await supabase
          .from("parent_companies")
          .update({
            name: currentParentCompany.name,
            address: currentParentCompany.address,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentParentCompany.id);

        if (error) {
          console.error("Error updating parent company:", error);
          return false;
        }
      } else {
        // Create new parent company
        const { error } = await supabase.from("parent_companies").insert([
          {
            name: currentParentCompany.name,
            address: currentParentCompany.address,
          },
        ]);

        if (error) {
          console.error("Error creating parent company:", error);
          return false;
        }
      }
      fetchCompanies();
      setShowParentCompanyForm(false);
      return true;
    } catch (error) {
      console.error("Error saving parent company:", error);
      return false;
    }
  };

  const handleAddSubsidiaryCompany = () => {
    setCurrentSubsidiaryCompany(null);
    setShowSubsidiaryCompanyForm(true);
  };

  const handleEditSubsidiaryCompany = (company: SubsidiaryCompany) => {
    setCurrentSubsidiaryCompany(company);
    setShowSubsidiaryCompanyForm(true);
  };

  const handleDeleteSubsidiaryCompany = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this subsidiary company?")
    ) {
      try {
        const { error } = await supabase
          .from("subsidiary_companies")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Error deleting subsidiary company:", error);
        } else {
          fetchCompanies();
        }
      } catch (error) {
        console.error("Error deleting subsidiary company:", error);
      }
    }
  };

  const handleSaveSubsidiaryCompany = async () => {
    if (
      !currentSubsidiaryCompany ||
      !currentSubsidiaryCompany.name ||
      !currentSubsidiaryCompany.address ||
      !currentSubsidiaryCompany.parent_company_id
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (currentSubsidiaryCompany.id) {
        // Update existing subsidiary company
        const { error } = await supabase
          .from("subsidiary_companies")
          .update({
            name: currentSubsidiaryCompany.name,
            address: currentSubsidiaryCompany.address,
            parent_company_id: currentSubsidiaryCompany.parent_company_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentSubsidiaryCompany.id);

        if (error) {
          console.error("Error updating subsidiary company:", error);
          return false;
        }
      } else {
        // Create new subsidiary company
        const { error } = await supabase.from("subsidiary_companies").insert([
          {
            name: currentSubsidiaryCompany.name,
            address: currentSubsidiaryCompany.address,
            parent_company_id: currentSubsidiaryCompany.parent_company_id,
          },
        ]);

        if (error) {
          console.error("Error creating subsidiary company:", error);
          return false;
        }
      }
      fetchCompanies();
      setShowSubsidiaryCompanyForm(false);
      return true;
    } catch (error) {
      console.error("Error saving subsidiary company:", error);
      return false;
    }
  };

  // Mock data for warehouses
  const mockWarehouses: Warehouse[] = [
    {
      id: "1",
      location: "Manila Distribution Center",
      subsidiary_company_id: "1",
    },
    {
      id: "2",
      location: "Cebu Regional Warehouse",
      subsidiary_company_id: "2",
    },
    {
      id: "3",
      location: "Davao Supply Hub",
      subsidiary_company_id: "3",
    },
  ];

  // Mock data for subsidiary companies (used in warehouse section)
  const mockSubsidiaryCompanies: SubsidiaryCompany[] = [
    {
      id: "1",
      name: "MediCorp Regional Hospital",
      address: "123 Health St, Manila",
      parent_company_id: "1",
    },
    {
      id: "2",
      name: "Global Pharma Research Center",
      address: "456 Science Ave, Cebu",
      parent_company_id: "1",
    },
    {
      id: "3",
      name: "HealthTech Medical Center",
      address: "789 Tech Blvd, Davao",
      parent_company_id: "2",
    },
  ];

  // Filter functions for each tab
  const filteredMedicines = medicines.filter((med) =>
    searchTerm
      ? med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
      : true,
  );

  const filteredOrders = recentOrders.filter((order) =>
    orderSearchTerm
      ? order.customer_name
          ?.toLowerCase()
          .includes(orderSearchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
        order.company?.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
        order.status?.toLowerCase().includes(orderSearchTerm.toLowerCase())
      : true,
  );

  const filteredParentCompanies = parentCompanies.filter((company) =>
    companySearchTerm
      ? company.name?.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.address?.toLowerCase().includes(companySearchTerm.toLowerCase())
      : true,
  );

  const filteredSubsidiaryCompanies = subsidiaryCompanies.filter((company) =>
    companySearchTerm
      ? company.name?.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.address?.toLowerCase().includes(companySearchTerm.toLowerCase())
      : true,
  );

  const filteredWarehouses = mockWarehouses.filter((warehouse) =>
    warehouseSearchTerm
      ? warehouse.location
          ?.toLowerCase()
          .includes(warehouseSearchTerm.toLowerCase())
      : true,
  );

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplierSearchTerm
      ? supplier.name
          ?.toLowerCase()
          .includes(supplierSearchTerm.toLowerCase()) ||
        supplier.contact_info
          ?.toLowerCase()
          .includes(supplierSearchTerm.toLowerCase())
      : true,
  );

  return (
    <div className="bg-background p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/home")}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
            <h1 className="text-2xl font-bold">PharmaXLedger Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              Admin View
            </Badge>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {inventoryStats.total}
                  </div>
                  <div className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {inventoryStats.lowStock}
                  </div>
                  <div className="text-xs text-amber-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Requires attention
                  </div>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orders Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {inventoryStats.pendingOrders}
                  </div>
                  <div className="text-xs text-blue-600 flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1" /> View all
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <p className="font-medium">Inventory Management</p>
              <p>
                Add, edit, or remove medicines from your inventory. Track stock
                levels across warehouses.
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleAddMedicine}>
                <Plus className="h-4 w-4 mr-2" /> Add Medicine
              </Button>
            </div>

            {showMedicineForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {currentMedicine ? "Edit Medicine" : "Add New Medicine"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MedicineForm
                    medicine={currentMedicine}
                    onSave={handleSaveMedicine}
                    onCancel={() => setShowMedicineForm(false)}
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-lg text-blue-600">
                      Loading medicines...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMedicines.map((medicine) => (
                      <div
                        key={medicine.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={medicine.image_url}
                              alt={medicine.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{medicine.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {medicine.category} • {medicine.manufacturer}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">
                              ₱{medicine.price.toFixed(2)}
                            </div>
                            <Badge
                              variant={
                                medicine.in_stock ? "secondary" : "destructive"
                              }
                            >
                              {medicine.in_stock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditMedicine(medicine)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteMedicine(medicine.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredMedicines.length === 0 && !loading && (
                      <div className="text-center py-8 text-gray-500">
                        No medicines found matching your search criteria.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <p className="font-medium">Order Management</p>
              <p>
                View and manage all orders. Update order status and track
                delivery progress.
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={orderSearchTerm}
                  onChange={(e) => setOrderSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleAddOrder}>
                <Plus className="h-4 w-4 mr-2" /> Add Order
              </Button>
            </div>

            {showOrderForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {currentOrder ? "Edit Order" : "Add New Order"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer_name">Customer Name</Label>
                        <Input
                          id="customer_name"
                          value={currentOrder?.customer_name || ""}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, customer_name: e.target.value }
                                : ({
                                    customer_name: e.target.value,
                                    status: "pending",
                                  } as Order),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer_email">Customer Email</Label>
                        <Input
                          id="customer_email"
                          type="email"
                          value={currentOrder?.customer_email || ""}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, customer_email: e.target.value }
                                : ({ customer_email: e.target.value } as Order),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={currentOrder?.company || ""}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, company: e.target.value }
                                : ({ company: e.target.value } as Order),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="total">Total Amount</Label>
                        <Input
                          id="total"
                          type="number"
                          value={currentOrder?.total || ""}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, total: parseFloat(e.target.value) }
                                : ({
                                    total: parseFloat(e.target.value),
                                  } as Order),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="items">Number of Items</Label>
                        <Input
                          id="items"
                          type="number"
                          value={currentOrder?.items || ""}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, items: parseInt(e.target.value) }
                                : ({
                                    items: parseInt(e.target.value),
                                  } as Order),
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={currentOrder?.status || "pending"}
                          onChange={(e) =>
                            setCurrentOrder((prev) =>
                              prev
                                ? { ...prev, status: e.target.value as any }
                                : ({ status: e.target.value as any } as Order),
                            )
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowOrderForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          currentOrder && handleSaveOrder(currentOrder)
                        }
                      >
                        Save Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orderLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-lg text-blue-600">
                      Loading orders...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.customer_name} • {order.company}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">
                              ₱{order.total?.toFixed(2)}
                            </div>
                            <Badge
                              variant={
                                order.status === "cancelled"
                                  ? "destructive"
                                  : order.status === "pending"
                                    ? "outline"
                                    : order.status === "delivered"
                                      ? "secondary"
                                      : "default"
                              }
                              className={
                                order.status === "pending"
                                  ? "border-amber-200 bg-amber-100 text-amber-700"
                                  : ""
                              }
                            >
                              {order.status?.charAt(0).toUpperCase() +
                                order.status?.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(order.order_date).toLocaleString()}
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditOrder(order)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredOrders.length === 0 && !orderLoading && (
                      <div className="text-center py-8 text-gray-500">
                        No orders found matching your search criteria.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <p className="font-medium">Company Management</p>
              <p>
                Manage parent companies and their subsidiaries. Add new
                companies or update existing ones.
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  className="pl-8"
                  value={companySearchTerm}
                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddParentCompany}>
                  <Plus className="h-4 w-4 mr-2" /> Add Parent Company
                </Button>
                <Button onClick={handleAddSubsidiaryCompany} variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Add Subsidiary
                </Button>
              </div>
            </div>

            {showParentCompanyForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {currentParentCompany
                      ? "Edit Parent Company"
                      : "Add New Parent Company"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input
                        id="company_name"
                        value={currentParentCompany?.name || ""}
                        onChange={(e) =>
                          setCurrentParentCompany((prev) =>
                            prev
                              ? { ...prev, name: e.target.value }
                              : ({ name: e.target.value } as ParentCompany),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_address">Address</Label>
                      <Input
                        id="company_address"
                        value={currentParentCompany?.address || ""}
                        onChange={(e) =>
                          setCurrentParentCompany((prev) =>
                            prev
                              ? { ...prev, address: e.target.value }
                              : ({ address: e.target.value } as ParentCompany),
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowParentCompanyForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveParentCompany}>
                        Save Company
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showSubsidiaryCompanyForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {currentSubsidiaryCompany
                      ? "Edit Subsidiary Company"
                      : "Add New Subsidiary Company"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subsidiary_name">Subsidiary Name</Label>
                      <Input
                        id="subsidiary_name"
                        value={currentSubsidiaryCompany?.name || ""}
                        onChange={(e) =>
                          setCurrentSubsidiaryCompany((prev) =>
                            prev
                              ? { ...prev, name: e.target.value }
                              : ({ name: e.target.value } as SubsidiaryCompany),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subsidiary_address">Address</Label>
                      <Input
                        id="subsidiary_address"
                        value={currentSubsidiaryCompany?.address || ""}
                        onChange={(e) =>
                          setCurrentSubsidiaryCompany((prev) =>
                            prev
                              ? { ...prev, address: e.target.value }
                              : ({
                                  address: e.target.value,
                                } as SubsidiaryCompany),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent_company">Parent Company</Label>
                      <select
                        id="parent_company"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={
                          currentSubsidiaryCompany?.parent_company_id || ""
                        }
                        onChange={(e) =>
                          setCurrentSubsidiaryCompany((prev) =>
                            prev
                              ? { ...prev, parent_company_id: e.target.value }
                              : ({
                                  parent_company_id: e.target.value,
                                } as SubsidiaryCompany),
                          )
                        }
                      >
                        <option value="">Select a parent company</option>
                        {parentCompanies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowSubsidiaryCompanyForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveSubsidiaryCompany}>
                        Save Subsidiary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Parent Companies</CardTitle>
              </CardHeader>
              <CardContent>
                {companyLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-lg text-blue-600">
                      Loading companies...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {filteredParentCompanies.map((company) => (
                        <Card key={company.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {company.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p className="text-muted-foreground">
                              {company.address}
                            </p>
                            <p className="mt-2 font-medium">
                              Subsidiaries:{" "}
                              {
                                subsidiaryCompanies.filter(
                                  (s) => s.parent_company_id === company.id,
                                ).length
                              }
                            </p>
                          </CardContent>
                          <div className="flex border-t p-2 bg-muted/50 justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditParentCompany(company)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteParentCompany(company.id)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {filteredParentCompanies.length === 0 &&
                      !companyLoading && (
                        <div className="text-center py-8 text-gray-500">
                          No parent companies found matching your search
                          criteria.
                        </div>
                      )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Subsidiary Companies</CardTitle>
              </CardHeader>
              <CardContent>
                {companyLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-lg text-blue-600">
                      Loading subsidiaries...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {filteredSubsidiaryCompanies.map((company) => {
                        const parentCompany = parentCompanies.find(
                          (p) => p.id === company.parent_company_id,
                        );
                        return (
                          <Card key={company.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">
                                {company.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p className="text-muted-foreground">
                                {company.address}
                              </p>
                              <p className="mt-2 font-medium">
                                Parent Company:{" "}
                                <Badge variant="outline">
                                  {parentCompany?.name || "Unknown"}
                                </Badge>
                              </p>
                            </CardContent>
                            <div className="flex border-t p-2 bg-muted/50 justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleEditSubsidiaryCompany(company)
                                }
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteSubsidiaryCompany(company.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                    {filteredSubsidiaryCompanies.length === 0 &&
                      !companyLoading && (
                        <div className="text-center py-8 text-gray-500">
                          No subsidiary companies found matching your search
                          criteria.
                        </div>
                      )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <p className="font-medium">Warehouse Management</p>
              <p>
                Manage warehouse locations and inventory distribution across
                locations.
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search warehouses..."
                  className="pl-8"
                  value={warehouseSearchTerm}
                  onChange={(e) => setWarehouseSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Warehouse
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Warehouse Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage warehouse locations and inventory.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredWarehouses.map((warehouse) => (
                      <Card key={warehouse.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {warehouse.location}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p className="text-muted-foreground">
                            Subsidiary:{" "}
                            {mockSubsidiaryCompanies.find(
                              (s) => s.id === warehouse.subsidiary_company_id,
                            )?.name || "Unknown Subsidiary"}
                          </p>
                          <p className="mt-2 font-medium">
                            Inventory Items:{" "}
                            {Math.floor(Math.random() * 200) + 100}
                          </p>
                        </CardContent>
                        <div className="flex border-t p-2 bg-muted/50 justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {filteredWarehouses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No warehouses found matching your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-blue-800 text-sm">
              <p className="font-medium">Supplier Management</p>
              <p>
                Manage suppliers and batch orders. Add new suppliers or update
                existing ones.
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-8"
                  value={supplierSearchTerm}
                  onChange={(e) => setSupplierSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Supplier
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage suppliers and batch orders.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredSuppliers.map((supplier) => (
                      <Card key={supplier.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {supplier.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p className="text-muted-foreground">
                            {supplier.contact_info}
                          </p>
                          <p className="mt-2 font-medium">
                            Active Orders: {Math.floor(Math.random() * 5)}
                          </p>
                        </CardContent>
                        <div className="flex border-t p-2 bg-muted/50 justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {filteredSuppliers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No suppliers found matching your search criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
