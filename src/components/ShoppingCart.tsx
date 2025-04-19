import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  parentCompanies?: ParentCompany[];
  subsidiaryCompanies?: SubsidiaryCompany[];
}

export default function ShoppingCart({
  isOpen = false,
  onClose = () => {},
  items = [],
  parentCompanies = [],
  subsidiaryCompanies = [],
}: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [localParentCompanies, setLocalParentCompanies] = useState<ParentCompany[]>(parentCompanies);
  const [localSubsidiaryCompanies, setLocalSubsidiaryCompanies] = useState<SubsidiaryCompany[]>(subsidiaryCompanies);
  const [selectedParentCompany, setSelectedParentCompany] = useState<string>("");
  const [selectedSubsidiaryCompany, setSelectedSubsidiaryCompany] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Always sync cartItems with localStorage
  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem("cartItems");
      setCartItems(stored ? JSON.parse(stored) : []);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // Fetch companies from Supabase on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      // @ts-ignore
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      // @ts-ignore
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      // @ts-ignore
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      // Fetch parent companies
      const { data: parentData } = await supabase.from("parent_companies").select("*");
      setLocalParentCompanies(parentData || []);
      // Fetch subsidiary companies
      const { data: subsidiaryData } = await supabase.from("subsidiary_companies").select("*");
      setLocalSubsidiaryCompanies(subsidiaryData || []);
    };
    fetchCompanies();
  }, []);

  // --- LOGIC ---
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  const TAX_RATE = 0.1; // 10% tax, configurable
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const filteredSubsidiaries = localSubsidiaryCompanies.filter(
    sub => sub.parent_company_id === selectedParentCompany
  );

  const handleCheckout = async () => {
    if (!selectedParentCompany || !selectedSubsidiaryCompany || !selectedPaymentMethod || !customerName.trim() || !customerEmail.trim()) {
      alert("Please complete all required fields, including your name and email.");
      return;
    }
    // Gather payment details
    let paymentDetails = {};
    if (selectedPaymentMethod === "gcash") {
      const gcashNumber = (document.getElementById("gcash-number") as HTMLInputElement)?.value;
      const gcashName = (document.getElementById("gcash-name") as HTMLInputElement)?.value;
      if (!gcashNumber || !gcashName) {
        alert("Please enter GCash details.");
        return;
      }
      paymentDetails = { gcashNumber, gcashName };
    }
    // Create order in Supabase
    try {
      // @ts-ignore
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      // @ts-ignore
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      // @ts-ignore
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("orders").insert([
        {
          customer_name: customerName,
          customer_email: customerEmail,
          parent_company_id: selectedParentCompany,
          subsidiary_company_id: selectedSubsidiaryCompany,
          items: cartItems,
          subtotal,
          tax,
          total,
          payment_method: selectedPaymentMethod,
          payment_details: paymentDetails,
          status: "pending"
        }
      ]);
      if (error) {
        alert("Order creation failed: " + error.message);
        return;
      }
    } catch (e) {
      alert("Order creation failed. Please try again.");
      return;
    }
    setShowConfirmation(true);
    setShowCheckout(false);
    setCartItems([]);
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // --- RENDER ---
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <ShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
            <p className="text-sm text-gray-500 mt-1">
              Start adding items to your cart
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-600 text-sm">₱{item.price.toFixed(2)} each</div>
                      <div className="flex items-center mt-2">
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></Button>
                        <span className="mx-2 w-6 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-4">
                      <div className="text-gray-900 font-semibold">₱{(item.price * item.quantity).toFixed(2)}</div>
                      <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}><X size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Cart Summary */}
              <div className="py-4 border-t">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tax ({TAX_RATE * 100}%)</span>
                  <span>₱{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => setShowCheckout(true)}>
                Checkout
              </Button>
            </div>
            {showCheckout && (
              <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* ...other checkout fields... */}
                    {selectedPaymentMethod === "bank" && (
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input id="bank-name" placeholder="Bank of the Philippine Islands" />
                        <Label htmlFor="bank-account">Account Number</Label>
                        <Input id="bank-account" placeholder="1234567890" maxLength={20} />
                        <Label htmlFor="bank-holder">Account Holder Name</Label>
                        <Input id="bank-holder" placeholder="Account Holder" />
                      </div>
                    )}
                    {selectedPaymentMethod === "gcash" && (
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <Label htmlFor="gcash-number">GCash Number</Label>
                        <Input id="gcash-number" placeholder="09XXXXXXXXX" maxLength={11} />
                        <Label htmlFor="gcash-name">Account Name</Label>
                        <Input id="gcash-name" placeholder="GCash Account Name" />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCheckout(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCheckout}>Confirm Order</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Order Confirmed!</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Thank you for your order. Your items will be processed soon.</p>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setShowConfirmation(false);
                      setCartItems([]);
                      localStorage.removeItem("cartItems");
                      window.dispatchEvent(new Event("cartUpdated"));
                    }}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
