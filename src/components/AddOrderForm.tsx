import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

export function AddOrderForm({ onClose }: { onClose: () => void }) {
  const createOrder = useMutation(api.orders.create);
  const medicines = useQuery(api.medicines.list, { search: undefined }) || [];
  
  const [items, setItems] = useState<Array<{
    medicineId: Id<"medicines">;
    quantity: number;
    batchNumber: string;
  }>>([]);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddItem = () => {
    if (medicines.length > 0) {
      setItems([...items, {
        medicineId: medicines[0]._id,
        quantity: 1,
        batchNumber: medicines[0].batchNumber
      }]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }
    try {
      await createOrder({
        items,
        deliveryLocation,
        notes: notes || undefined,
      });
      toast.success("Order created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create order");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1">
              <select
                className="w-full border p-2 rounded"
                value={item.medicineId}
                onChange={(e) => {
                  const medicine = medicines.find(m => m._id === e.target.value);
                  setItems(
                    items.map((i, idx) =>
                      idx === index
                        ? {
                            ...i,
                            medicineId: e.target.value as Id<"medicines">,
                            batchNumber: medicine?.batchNumber || ""
                          }
                        : i
                    )
                  );
                }}
              >
                {medicines.map((medicine) => (
                  <option key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              min="1"
              className="border p-2 rounded w-24"
              value={item.quantity}
              onChange={(e) =>
                setItems(
                  items.map((i, idx) =>
                    idx === index ? { ...i, quantity: Number(e.target.value) } : i
                  )
                )
              }
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="px-2 py-2 bg-red-100 text-red-600 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-gray-100 rounded w-full"
        >
          Add Item
        </button>
        <input
          type="text"
          placeholder="Delivery Location"
          required
          className="w-full border p-2 rounded"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        />
        <textarea
          placeholder="Notes (optional)"
          className="w-full border p-2 rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Create Order
        </button>
      </div>
    </form>
  );
}
