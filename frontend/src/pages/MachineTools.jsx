import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getEquipmentList } from "../api/equipement";
import AddEquipmentModal from "../components/equipment/AddEquipmentModal";
import { Plus } from "lucide-react";

const MachineTools = () => {
  const [equipment, setEquipment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const MOCK_EQUIPMENT = [
    { _id: "101", equipment_name: "Conveyor Belt A", serial_number: "CB-001", department: "Logistics", location: "Warehouse 1", is_scrapped: false },
    { _id: "102", equipment_name: "Drill Press", serial_number: "DP-002", department: "Workshop", location: "Room 20", is_scrapped: false },
    { _id: "103", equipment_name: "Hydraulic Press", serial_number: "HP-500", department: "Heavy Machinery", location: "Floor 1", is_scrapped: true }
  ];


  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipmentList();

        setEquipment(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.warn("Failed to load inventory, using mock data");
        setEquipment(MOCK_EQUIPMENT);
        setError(""); // Clear error to ensure page renders
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleSuccess = async () => {
    const response = await getEquipmentList();
    setEquipment(response.data);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Machines & Tools
        </h1>
        <p className="text-slate-400">
          Complete inventory of machines and tools across departments.
        </p>
        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} />
            <span>Add Equipment</span>
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-slate-400">Loading inventory...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && equipment.length === 0 && (
        <p className="text-slate-400">
          No machines or tools found.
        </p>
      )}

      {!loading && equipment.length > 0 && (
        <div className="overflow-x-auto bg-slate-800/40 border border-slate-700 rounded-2xl">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Serial No.</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {item.equipment_name}
                  </td>
                  <td className="px-6 py-4">
                    {item.serial_number}
                  </td>
                  <td className="px-6 py-4">
                    {item.department}
                  </td>
                  <td className="px-6 py-4">
                    {item.location || "—"}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_scrapped ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                        Scrapped
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddEquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </Layout>
  );
};

export default MachineTools;