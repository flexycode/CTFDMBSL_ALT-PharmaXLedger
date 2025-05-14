import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

export function SupplierDetails({ supplier }: { supplier: Doc<"suppliers"> }) {
  const updateStatus = useMutation(api.suppliers.updateStatus);

  const handleUpdateStatus = async (status: "active" | "inactive") => {
    try {
      await updateStatus({ supplierId: supplier._id, status });
      toast.success(`Supplier marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update supplier status");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Contact Person</h4>
          <p className="mt-1">{supplier.contactPerson}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p className="mt-1 capitalize">{supplier.status}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Email</h4>
          <p className="mt-1">
            <a href={`mailto:${supplier.email}`} className="text-indigo-600 hover:text-indigo-800">
              {supplier.email}
            </a>
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Phone</h4>
          <p className="mt-1">
            <a href={`tel:${supplier.phone}`} className="text-indigo-600 hover:text-indigo-800">
              {supplier.phone}
            </a>
          </p>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm font-medium text-gray-500">Address</h4>
          <p className="mt-1">{supplier.address}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {supplier.status === "active" ? (
          <button
            onClick={() => handleUpdateStatus("inactive")}
            className="px-4 py-2 bg-red-100 text-red-600 rounded"
          >
            Mark as Inactive
          </button>
        ) : (
          <button
            onClick={() => handleUpdateStatus("active")}
            className="px-4 py-2 bg-green-100 text-green-600 rounded"
          >
            Mark as Active
          </button>
        )}
      </div>
    </div>
  );
}
