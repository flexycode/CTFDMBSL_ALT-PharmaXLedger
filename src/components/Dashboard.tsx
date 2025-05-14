import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Dashboard() {
  const inventoryStats = useQuery(api.medicines.getInventoryStats);
  
  if (!inventoryStats) return null;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Inventory Value</h3>
        <p className="text-3xl font-bold text-green-600">
          {formatCurrency(inventoryStats.totalValue)}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Items</h3>
        <p className="text-3xl font-bold text-blue-600">
          {inventoryStats.totalItems}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
        <p className="text-3xl font-bold text-orange-600">
          {inventoryStats.lowStockCount}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Expiring Soon</h3>
        <p className="text-3xl font-bold text-red-600">
          {inventoryStats.expiringSoonCount}
        </p>
      </div>
    </div>
  );
}
