import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { AddMedicineForm } from "./components/AddMedicineForm";
import { AddOrderForm } from "./components/AddOrderForm";
import { AddSupplierForm } from "./components/AddSupplierForm";
import { Modal } from "./components/Modal";
import { MedicineDetails } from "./components/MedicineDetails";
import { OrderDetails } from "./components/OrderDetails";
import { SupplierDetails } from "./components/SupplierDetails";
import { Dashboard } from "./components/Dashboard";
import { MedicineList } from "./components/MedicineList";
import { Doc } from "../convex/_generated/dataModel";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">PharmaXLedger</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

type ModalState = {
  type: "add" | "view";
  content: "medicine" | "order" | "supplier";
  data?: Doc<"medicines"> | Doc<"orders"> | Doc<"suppliers">;
} | null;

function Content() {
  const [view, setView] = useState<"inventory" | "orders" | "suppliers">("inventory");
  const [modal, setModal] = useState<ModalState>(null);

  const closeModal = () => setModal(null);

  return (
    <div className="flex flex-col gap-8">
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      
      <Authenticated>
        <Dashboard />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView("inventory")}
            className={`px-4 py-2 rounded ${
              view === "inventory" ? "bg-indigo-500 text-white" : "bg-gray-100"
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setView("orders")}
            className={`px-4 py-2 rounded ${
              view === "orders" ? "bg-indigo-500 text-white" : "bg-gray-100"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setView("suppliers")}
            className={`px-4 py-2 rounded ${
              view === "suppliers" ? "bg-indigo-500 text-white" : "bg-gray-100"
            }`}
          >
            Suppliers
          </button>
        </div>

        {view === "inventory" && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Medicine Inventory
              </h3>
              <button
                onClick={() => setModal({ type: "add", content: "medicine" })}
                className="px-4 py-2 bg-indigo-500 text-white rounded"
              >
                Add Medicine
              </button>
            </div>
            <div className="p-4">
              <MedicineList 
                onSelectMedicine={(medicine) => 
                  setModal({ type: "view", content: "medicine", data: medicine })}
              />
            </div>
          </div>
        )}

        {/* Rest of the existing view components */}
        
        <Modal
          isOpen={modal?.type === "add" && modal.content === "medicine"}
          onClose={closeModal}
          title="Add Medicine"
        >
          <AddMedicineForm onClose={closeModal} />
        </Modal>

        <Modal
          isOpen={modal?.type === "add" && modal.content === "order"}
          onClose={closeModal}
          title="Create Order"
        >
          <AddOrderForm onClose={closeModal} />
        </Modal>

        <Modal
          isOpen={modal?.type === "add" && modal.content === "supplier"}
          onClose={closeModal}
          title="Add Supplier"
        >
          <AddSupplierForm onClose={closeModal} />
        </Modal>

        <Modal
          isOpen={modal?.type === "view" && modal.content === "medicine"}
          onClose={closeModal}
          title={modal?.data ? (modal.data as Doc<"medicines">).name : "Medicine Details"}
        >
          {modal?.data && <MedicineDetails medicine={modal.data as Doc<"medicines">} />}
        </Modal>

        <Modal
          isOpen={modal?.type === "view" && modal.content === "order"}
          onClose={closeModal}
          title={`Order #${modal?.data ? (modal.data as Doc<"orders">)._id.slice(-6) : ""}`}
        >
          {modal?.data && <OrderDetails order={modal.data as Doc<"orders">} />}
        </Modal>

        <Modal
          isOpen={modal?.type === "view" && modal.content === "supplier"}
          onClose={closeModal}
          title={modal?.data ? (modal.data as Doc<"suppliers">).name : "Supplier Details"}
        >
          {modal?.data && <SupplierDetails supplier={modal.data as Doc<"suppliers">} />}
        </Modal>
      </Authenticated>
    </div>
  );
}
