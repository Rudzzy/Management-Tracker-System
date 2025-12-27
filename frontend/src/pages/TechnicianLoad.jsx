import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getTechnicianLoad } from "../api/requestApi";

const TechnicianLoad = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchTechnicianLoad = async () => {
      try {
        const response = await getTechnicianLoad();
        setTechnicians(response.data);
      } catch (err) {
        setError("Failed to load technician workload data");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianLoad();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Technician Load
        </h1>
        <p className="text-slate-400">
          Workforce utilization and active workload distribution.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading technician metrics...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && technicians.length === 0 && (
        <p className="text-slate-400">
          No technician workload data available.
        </p>
      )}

      {!loading && technicians.length > 0 && (
        <div className="overflow-x-auto bg-slate-800/40 border border-slate-700 rounded-2xl">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Technician</th>
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4">Active Requests</th>
                <th className="px-6 py-4">Utilization (%)</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => (
                <tr
                  key={tech.user_id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {tech.name}
                  </td>
                  <td className="px-6 py-4">
                    {tech.team_name || "—"}
                  </td>
                  <td className="px-6 py-4">
                    {tech.active_requests}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${tech.utilization}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-300">
                        {tech.utilization}%
                      </span>
                    </div>
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

export default TechnicianLoad;