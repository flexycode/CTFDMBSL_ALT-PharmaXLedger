import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { CATEGORIES, DOSAGE_FORMS, Category, DosageForm } from "../../convex/medicines";

export function AddMedicineForm({ onClose }: { onClose: () => void }) {
  const addMedicine = useMutation(api.medicines.add);
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    batchNumber: "",
    quantity: 0,
    expiryDate: "",
    manufacturer: "",
    location: "",
    minimumStock: 0,
    unitPrice: 0,
    category: CATEGORIES[0] as Category,
    dosageForm: DOSAGE_FORMS[0] as DosageForm,
    strength: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMedicine({
        ...formData,
        expiryDate: new Date(formData.expiryDate).getTime(),
      });
      toast.success("Medicine added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add medicine");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicine Name
          </label>
          <input
            type="text"
            placeholder="Enter medicine name"
            required
            className="border p-2 rounded w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Generic Name
          </label>
          <input
            type="text"
            placeholder="Enter generic name"
            required
            className="border p-2 rounded w-full"
            value={formData.genericName}
            onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="border p-2 rounded w-full"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage Form
          </label>
          <select
            className="border p-2 rounded w-full"
            value={formData.dosageForm}
            onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value as DosageForm })}
          >
            {DOSAGE_FORMS.map((form) => (
              <option key={form} value={form}>
                {form}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Strength
          </label>
          <input
            type="text"
            placeholder="e.g., 500mg, 50ml"
            required
            className="border p-2 rounded w-full"
            value={formData.strength}
            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Number
          </label>
          <input
            type="text"
            placeholder="Enter batch number"
            required
            className="border p-2 rounded w-full"
            value={formData.batchNumber}
            onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Stock Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity"
            required
            min="0"
            className="border p-2 rounded w-full"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            required
            className="border p-2 rounded w-full"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer
          </label>
          <input
            type="text"
            placeholder="Enter manufacturer"
            required
            className="border p-2 rounded w-full"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Storage Location
          </label>
          <input
            type="text"
            placeholder="Enter storage location"
            required
            className="border p-2 rounded w-full"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Stock Alert Level
          </label>
          <input
            type="number"
            placeholder="Enter minimum stock"
            required
            min="0"
            className="border p-2 rounded w-full"
            value={formData.minimumStock}
            onChange={(e) => setFormData({ ...formData, minimumStock: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Price (₱)
          </label>
          <input
            type="number"
            placeholder="Enter unit price"
            required
            min="0"
            step="0.01"
            className="border p-2 rounded w-full"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            placeholder="Enter description"
            className="border p-2 rounded w-full"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
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
          Add Medicine
        </button>
      </div>
    </form>
  );
}
