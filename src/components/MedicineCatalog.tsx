import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import MedicineCard from "./MedicineCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

interface Warehouse {
  id: string;
  location: string;
  subsidiary_company_id: string;
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

interface MedicineCatalogProps {
  medicines?: Medicine[];
  onAddToCart?: (medicine: Medicine, quantity: number) => void;
  category?: string;
  searchQuery?: string;
  warehouses?: Warehouse[];
  suppliers?: Supplier[];
  batchOrders?: BatchOrder[];
}

const MedicineCatalog: React.FC<MedicineCatalogProps> = ({
  category = "all",
  searchQuery = "",
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState(category);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supabaseMedicines, setSupabaseMedicines] = useState<any[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);

  const categories = [
    "all",
    "antibiotics",
    "painkillers",
    "cardiovascular",
    "respiratory",
    "gastrointestinal",
    "endocrine",
    "vitamins",
    "dermatological",
  ];

  // Optimize data fetching
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("medicines").select("*");

        if (error) {
          console.error("Error fetching medicines:", error);
        } else if (data) {
          setSupabaseMedicines(data);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Optimize filtering logic
  useEffect(() => {
    // Use Supabase medicines if available, otherwise use mock data
    const sourceMedicines =
      supabaseMedicines.length > 0
        ? supabaseMedicines.map((med) => ({
            id: med.id,
            name: med.name,
            description: med.description,
            price: med.price,
            category: med.category,
            manufacturer: med.manufacturer,
            inStock: med.in_stock,
            imageUrl: med.image_url,
          }))
        : mockMedicines;

    // Filter medicines based on category and search query
    let filtered = [...sourceMedicines];

    if (category !== "all") {
      filtered = filtered.filter((medicine) => medicine.category === category);
    }

    // Use the searchQuery prop from parent component
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query) ||
          medicine.description.toLowerCase().includes(query) ||
          medicine.manufacturer.toLowerCase().includes(query) ||
          medicine.category.toLowerCase().includes(query),
      );
    }

    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      filtered = filtered.filter(
        (medicine) =>
          medicine.price >= priceRange[0] && medicine.price <= priceRange[1],
      );
    }

    if (showInStockOnly) {
      filtered = filtered.filter((medicine) => medicine.inStock);
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (medicine) => medicine.category === activeCategory,
      );
    }

    setFilteredMedicines(filtered);
  }, [
    category,
    searchQuery,
    priceRange,
    showInStockOnly,
    activeCategory,
    supabaseMedicines,
  ]);

  const handleAddToCart = (medicine: Medicine) => {
    // Get current cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingIndex = cartItems.findIndex((item: any) => item.id === medicine.id);
    if (existingIndex >= 0) {
      // Always set quantity to 1 if added again
      cartItems[existingIndex].quantity = 1;
    } else {
      cartItems.push({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1,
        image: medicine.imageUrl,
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };


  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search medicines..."
            className="pl-10 w-full"
            value={searchQuery}
            readOnly
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>₱{priceRange[0]}</span>
                <span>₱{priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={showInStockOnly}
                  onCheckedChange={(checked) =>
                    setShowInStockOnly(checked as boolean)
                  }
                />
                <label
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show only in-stock items
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Results</h3>
              <p className="text-sm text-gray-600">
                {filteredMedicines.length} medicines found
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs
        defaultValue={category}
        value={activeCategory}
        onValueChange={setActiveCategory}
      >
        <TabsList className="mb-6 w-full overflow-x-auto flex justify-start">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="capitalize">
              {cat === "all" ? "All Medicines" : cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-lg text-blue-600">
                  Loading medicines...
                </span>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    id={medicine.id}
                    name={medicine.name}
                    description={medicine.description}
                    price={medicine.price}
                    category={medicine.category}
                    manufacturer={medicine.manufacturer}
                    inStock={medicine.inStock}
                    imageUrl={medicine.imageUrl}
                    onAddToCart={() => handleAddToCart(medicine)}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-gray-500 mb-2">No medicines found</p>
                  <p className="text-sm text-gray-400">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setPriceRange([0, 1000]);
                      setShowInStockOnly(false);
                      setActiveCategory("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Mock data for development
const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Ambroxol",
    description:
      "Expectorant used to treat respiratory diseases with excessive mucus",
    price: 120.5,
    category: "respiratory",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/ambroxol.jpg",
    batch_order_id: "1",
    supplier_id: "1",
    warehouse_id: "1",
    inventory: [
      { id: "1", warehouse_id: "1", medicine_id: "1", quantity: 250 },
      { id: "2", warehouse_id: "2", medicine_id: "1", quantity: 150 },
    ],
  },
  {
    id: "2",
    name: "Amlodipine",
    description:
      "Calcium channel blocker used to treat high blood pressure and coronary artery disease",
    price: 350.75,
    category: "cardiovascular",
    manufacturer: "Sandoz Pharmaceuticals",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/amlodipine.jpg",
  },
  {
    id: "3",
    name: "Asmagone (Salbutamol Sulfate)",
    description:
      "Bronchodilator that relaxes muscles in the airways, used to treat asthma",
    price: 420.0,
    category: "respiratory",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/asmagone-salburamol-sulfate.jpg",
  },
  {
    id: "4",
    name: "Benedex (Amoxicillin)",
    description: "Antibiotic used to treat bacterial infections",
    price: 650.0,
    category: "antibiotics",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/benedex-amoxicillin.jpg",
  },
  {
    id: "5",
    name: "Butamirate Citrate",
    description: "Antitussive medication used to relieve cough",
    price: 180.25,
    category: "respiratory",
    manufacturer: "Actimed Pharmaceuticals",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/butamirate-citrate.jpg",
  },
  {
    id: "6",
    name: "Butamirate Citrate Tablet",
    description: "Antitussive medication used to relieve cough",
    price: 195.5,
    category: "respiratory",
    manufacturer: "Actimed Pharmaceuticals",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/butamirate-citrate-tablet.jpg",
  },
  {
    id: "7",
    name: "Cepham (Cefalexin)",
    description: "Antibiotic used to treat bacterial infections",
    price: 520.75,
    category: "antibiotics",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/cepham-cefalexin-cap.jpg",
  },
  {
    id: "8",
    name: "Dextro (Dextromethorphan)",
    description:
      "Cough suppressant used to treat cough caused by the common cold or flu",
    price: 220.5,
    category: "respiratory",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/dextro-dextromethorphan-tablet.jpg",
  },
  {
    id: "9",
    name: "Guaiflem (Guaifenesin)",
    description:
      "Expectorant used to reduce chest congestion caused by colds or infections",
    price: 180.75,
    category: "respiratory",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/guaiflem-guaifenesin.jpg",
  },
  {
    id: "10",
    name: "LemonCee (Ascorbic Acid)",
    description: "Vitamin C supplement used to prevent and treat scurvy",
    price: 85.75,
    category: "vitamins",
    manufacturer: "TGP Pharma Inc.",
    inStock: true,
    imageUrl:
      "https://vvxeewfhaleyarchczbx.supabase.co/storage/v1/object/public/medicine/lemoncee-ascorbic-acid-drops.jpg",
  },
];

export default MedicineCatalog;
