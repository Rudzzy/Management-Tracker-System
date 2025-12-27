import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getRequests } from "../api/requestApi";

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await getRequests();

        setRequests(response.data);
      } catch (err) {
        setError("Failed to load maintenance requests");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequests();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Maintenance Overview
        </h1>
        <p className="text-slate-400">
          Overview of all corrective and preventive maintenance activities.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading maintenance data...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && requests.length === 0 && (
        <p className="text-slate-400">
          No maintenance requests found.
        </p>
      )}

      {!loading && requests.length > 0 && (
        <div className="overflow-x-auto bg-slate-800/40 border border-slate-700 rounded-2xl">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4">Duration (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {req.subject}
                  </td>
                  <td className="px-6 py-4">
                    {req.request_type}
                  </td>
                  <td className="px-6 py-4">
                    {req.status === "New" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                        New
                      </span>
                    )}
                    {req.status === "In Progress" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                        In Progress
                      </span>
                    )}
                    {req.status === "Repaired" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                        Repaired
                      </span>
                    )}
                    {req.status === "Scrap" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                        Scrapped
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {req.scheduled_date
                      ? new Date(req.scheduled_date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {req.duration_hours ?? "—"}
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

export default Maintenance;