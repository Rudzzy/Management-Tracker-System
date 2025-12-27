import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getCriticalEquipment } from "../api/equipement";

const CriticalEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchCriticalEquipment = async () => {
      try {
        const response = await getCriticalEquipment();
        setEquipment(response.data);
      } catch (err) {
        setError("Failed to load critical equipment data");
        // Check if error is 401, handled by axios interceptor but maybe local state needs update? 
        // Redirect handled by interceptor
      } finally {
        setLoading(false);
      }
    };

    fetchCriticalEquipment();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Critical Equipment
        </h1>
        <p className="text-slate-400">
          Equipment that requires immediate attention or is marked as unusable.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading critical equipment...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && equipment.length === 0 && (
        <p className="text-slate-400">
          No critical equipment found.
        </p>
      )}

      {!loading && equipment.length > 0 && (
        <div className="overflow-x-auto bg-slate-800/40 border border-slate-700 rounded-2xl">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Equipment Name</th>
                <th className="px-6 py-4">Serial Number</th>
                <th className="px-6 py-4">Department</th>
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
                  <td className="px-6 py-4">{item.serial_number}</td>
                  <td className="px-6 py-4">{item.department}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                      Critical
                    </span>
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

export default CriticalEquipment;