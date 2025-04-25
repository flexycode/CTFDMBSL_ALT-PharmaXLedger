import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  subsidiary_company_id: string;
  created_at?: string;
}

interface SubsidiaryCompany {
  id: string;
  name: string;
}

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [subsidiaryCompanies, setSubsidiaryCompanies] = useState<
    SubsidiaryCompany[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<Warehouse>>({
    name: "",
    location: "",
    capacity: 0,
    subsidiary_company_id: "",
  });

  // Fetch warehouses and subsidiary companies
  useEffect(() => {
    fetchWarehouses();
    fetchSubsidiaryCompanies();
  }, []);

  const fetchWarehouses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("warehouses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching warehouses:", error);
      } else {
        setWarehouses(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubsidiaryCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from("subsidiary_companies")
        .select("id, name");

      if (error) {
        console.error("Error fetching subsidiary companies:", error);
      } else {
        setSubsidiaryCompanies(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "capacity" ? parseInt(value) || 0 : value,
    });
  };

  const handleAddWarehouse = () => {
    setCurrentWarehouse(null);
    setFormData({
      name: "",
      location: "",
      capacity: 0,
      subsidiary_company_id: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditWarehouse = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      location: warehouse.location,
      capacity: warehouse.capacity,
      subsidiary_company_id: warehouse.subsidiary_company_id,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteWarehouse = (warehouse: Warehouse) => {
    setCurrentWarehouse(warehouse);
    setIsDeleteDialogOpen(true);
  };

  const saveWarehouse = async () => {
    setIsLoading(true);
    try {
      if (currentWarehouse) {
        // Update existing warehouse
        const { error } = await supabase
          .from("warehouses")
          .update(formData)
          .eq("id", currentWarehouse.id);

        if (error) {
          console.error("Error updating warehouse:", error);
        } else {
          fetchWarehouses();
          setIsDialogOpen(false);
        }
      } else {
        // Add new warehouse
        const { error } = await supabase.from("warehouses").insert([formData]);

        if (error) {
          console.error("Error adding warehouse:", error);
        } else {
          fetchWarehouses();
          setIsDialogOpen(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteWarehouse = async () => {
    if (!currentWarehouse) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("warehouses")
        .delete()
        .eq("id", currentWarehouse.id);

      if (error) {
        console.error("Error deleting warehouse:", error);
      } else {
        fetchWarehouses();
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubsidiaryName = (id: string) => {
    const company = subsidiaryCompanies.find((c) => c.id === id);
    return company ? company.name : "Unknown";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Warehouse Management</h2>
        <Button onClick={handleAddWarehouse}>
          <Plus className="mr-2 h-4 w-4" /> Add Warehouse
        </Button>
      </div>

      {isLoading && warehouses.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading warehouses...</span>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Subsidiary Company</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-gray-500"
                  >
                    No warehouses found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                warehouses.map((warehouse) => (
                  <TableRow key={warehouse.id}>
                    <TableCell className="font-medium">
                      {warehouse.name}
                    </TableCell>
                    <TableCell>{warehouse.location}</TableCell>
                    <TableCell>{warehouse.capacity.toLocaleString()}</TableCell>
                    <TableCell>
                      {getSubsidiaryName(warehouse.subsidiary_company_id)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditWarehouse(warehouse)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleDeleteWarehouse(warehouse)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Warehouse Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentWarehouse ? "Edit Warehouse" : "Add New Warehouse"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Warehouse Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter warehouse name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter warehouse location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="Enter warehouse capacity"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subsidiary_company_id">Subsidiary Company</Label>
              <select
                id="subsidiary_company_id"
                name="subsidiary_company_id"
                value={formData.subsidiary_company_id}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select Subsidiary Company</option>
                {subsidiaryCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveWarehouse} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Warehouse"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the warehouse "
              {currentWarehouse?.name}"? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteWarehouse}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Warehouse"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WarehouseManagement;
