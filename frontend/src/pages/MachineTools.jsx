import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getEquipmentList } from "../api/equipement";

const MachineTools = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await getEquipmentList();

        setEquipment(response.data);
      } catch (err) {
        setError("Failed to load machine and tools inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Machines & Tools
        </h1>
        <p className="text-slate-400">
          Complete inventory of machines and tools across departments.
        </p>
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
    </Layout>
  );
};

export default MachineTools;