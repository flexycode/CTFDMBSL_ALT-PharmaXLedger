import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function MedicineList({ onSelectMedicine }: { onSelectMedicine: (medicine: any) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "low_stock" | "expiring_soon">("all");
  
  const medicines = useQuery(api.medicines.list, { 
    search: search || undefined,
    filter
  });

  if (!medicines) return null;

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search medicines..."
          className="flex-1 border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "low_stock" | "expiring_soon")}
        >
          <option value="all">All Items</option>
          <option value="low_stock">Low Stock</option>
          <option value="expiring_soon">Expiring Soon</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <li 
              key={medicine._id} 
              className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectMedicine(medicine)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {medicine.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {medicine.genericName} - Batch: {medicine.batchNumber}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-900">Stock: {medicine.quantity}</p>
                    <p className="text-sm text-gray-500">
                      ₱{medicine.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {medicine.quantity <= medicine.minimumStock && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                        Low Stock
                      </span>
                    )}
                    {medicine.expiryDate <= Date.now() + (30 * 24 * 60 * 60 * 1000) && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                        Expiring Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
