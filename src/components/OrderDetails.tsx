import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

export function OrderDetails({ order }: { order: Doc<"orders"> }) {
  const updateStatus = useMutation(api.orders.updateStatus);
  const medicines = useQuery(api.medicines.list, { search: undefined }) || [];

  const handleUpdateStatus = async (status: "approved" | "rejected" | "shipped" | "delivered") => {
    try {
      await updateStatus({ orderId: order._id, status });
      toast.success(`Order ${status} successfully`);
    } catch (error) {
      toast.error(`Failed to update order status`);
    }
  };

  const getMedicineName = (medicineId: string) => {
    const medicine = medicines.find(m => m._id === medicineId);
    return medicine?.name || "Unknown Medicine";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Order ID</h4>
          <p className="mt-1">#{order._id.slice(-6)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p className="mt-1 capitalize">{order.status}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Request Date</h4>
          <p className="mt-1">{new Date(order.requestDate).toLocaleString()}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Delivery Location</h4>
          <p className="mt-1">{order.deliveryLocation}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
        <ul className="divide-y divide-gray-200 border rounded-lg">
          {order.items.map((item, index) => (
            <li key={index} className="p-3 flex justify-between items-center">
              <span>{getMedicineName(item.medicineId)}</span>
              <span className="text-gray-500">Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {order.notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-500">Notes</h4>
          <p className="mt-1 text-gray-700">{order.notes}</p>
        </div>
      )}

      {order.status === "pending" && (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleUpdateStatus("rejected")}
            className="px-4 py-2 bg-red-100 text-red-600 rounded"
          >
            Reject
          </button>
          <button
            onClick={() => handleUpdateStatus("approved")}
            className="px-4 py-2 bg-green-100 text-green-600 rounded"
          >
            Approve
          </button>
        </div>
      )}

      {order.status === "approved" && (
        <div className="flex justify-end">
          <button
            onClick={() => handleUpdateStatus("shipped")}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded"
          >
            Mark as Shipped
          </button>
        </div>
      )}

      {order.status === "shipped" && (
        <div className="flex justify-end">
          <button
            onClick={() => handleUpdateStatus("delivered")}
            className="px-4 py-2 bg-green-100 text-green-600 rounded"
          >
            Mark as Delivered
          </button>
        </div>
      )}
    </div>
  );
}
