import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

export function MedicineDetails({ medicine }: { medicine: Doc<"medicines"> }) {
  const adjustStock = useMutation(api.medicines.adjustStock);

  const handleUpdateQuantity = async (newQuantity: number) => {
    try {
      const diff = newQuantity - medicine.quantity;
      if (diff === 0) return;
      
      await adjustStock({
        medicineId: medicine._id,
        type: diff > 0 ? "increase" : "decrease",
        quantity: Math.abs(diff),
        reason: "Manual adjustment",
      });
      toast.success("Quantity updated successfully");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Generic Name</h4>
          <p className="mt-1">{medicine.genericName}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Batch Number</h4>
          <p className="mt-1">{medicine.batchNumber}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Manufacturer</h4>
          <p className="mt-1">{medicine.manufacturer}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Location</h4>
          <p className="mt-1">{medicine.location}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Expiry Date</h4>
          <p className="mt-1">{new Date(medicine.expiryDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Unit Price</h4>
          <p className="mt-1">₱{medicine.unitPrice.toFixed(2)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Current Stock</h4>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              min="0"
              className="border p-1 rounded w-24"
              value={medicine.quantity}
              onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
            />
            {medicine.quantity < medicine.minimumStock && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                Low Stock
              </span>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Minimum Stock Level</h4>
          <p className="mt-1">{medicine.minimumStock}</p>
        </div>
      </div>
    </div>
  );
}
