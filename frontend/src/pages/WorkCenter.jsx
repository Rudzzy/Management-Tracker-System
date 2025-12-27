import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getWorkCenterRequests } from "../api/requestApi";

const WorkCenter = () => {
  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchWorkCenterData = async () => {
      try {
        const response = await getWorkCenterRequests();

        setWorkItems(response.data);
      } catch (err) {
        setError("Failed to load work center data");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkCenterData();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Work Center
        </h1>
        <p className="text-slate-400">
          Active maintenance jobs currently being executed.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading work center...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && workItems.length === 0 && (
        <p className="text-slate-400">
          No active work items.
        </p>
      )}

      {!loading && workItems.length > 0 && (
        <div className="space-y-4">
          {workItems.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 hover:bg-slate-700/30 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">
                    {item.subject}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Equipment: {item.equipment_name || "—"}
                  </p>
                  <p className="text-sm text-slate-400">
                    Team: {item.team_name || "—"}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                  In Progress
                </span>
              </div>

              <div className="mt-3 text-sm text-slate-300">
                Assigned Technician:{" "}
                <span className="font-medium text-white">
                  {item.technician_name || "Unassigned"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default WorkCenter;