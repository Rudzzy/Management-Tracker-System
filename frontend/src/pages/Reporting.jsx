import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getReportsOverview } from "../api/requestApi";

const Reporting = () => {
  const [reports, setReports] = useState({
    requestsPerTeam: [],
    requestsByStatus: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReportsOverview();

        setReports(response.data);
      } catch (err) {
        setError("Failed to load reports and analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reporting & Analytics
        </h1>
        <p className="text-slate-400">
          Operational insights across equipment, teams, and maintenance requests.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading reports...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && (
        <div className="space-y-8">

          {/* Requests per Team */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Requests per Team
            </h2>

            {reports.requestsPerTeam.length === 0 ? (
              <p className="text-slate-400">No data available.</p>
            ) : (
              <table className="min-w-full text-left text-sm text-slate-300">
                <thead className="text-slate-400 uppercase text-xs border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3">Total Requests</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.requestsPerTeam.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                    >
                      <td className="px-4 py-3 text-white font-medium">
                        {item.team_name}
                      </td>
                      <td className="px-4 py-3">
                        {item.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Requests by Status */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Requests by Status
            </h2>

            {reports.requestsByStatus.length === 0 ? (
              <p className="text-slate-400">No data available.</p>
            ) : (
              <table className="min-w-full text-left text-sm text-slate-300">
                <thead className="text-slate-400 uppercase text-xs border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.requestsByStatus.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-700 hover:bg-slate-700/30 transition"
                    >
                      <td className="px-4 py-3 text-white font-medium">
                        {item.status}
                      </td>
                      <td className="px-4 py-3">
                        {item.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}
    </Layout>
  );
};

export default Reporting;