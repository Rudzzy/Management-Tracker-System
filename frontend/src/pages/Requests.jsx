import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getRequests, updateRequestStatus } from "../api/requestApi";

const STATUS_COLUMNS = [
  { key: "New", label: "New" },
  { key: "In Progress", label: "In Progress" },
  { key: "Repaired", label: "Repaired" },
  { key: "Scrap", label: "Scrap" },
];

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [draggedRequest, setDraggedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchRequests = async () => {
    try {
      const res = await getRequests();
      setRequests(res.data);
    } catch {
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateRequestStatus(id, status);
      fetchRequests();
    } catch {
      alert("Failed to update request status");
    }
  };

  const onDrop = (status) => {
    if (draggedRequest && draggedRequest.status !== status) {
      updateStatus(draggedRequest._id, status);
    }
    setDraggedRequest(null);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-2">
        Maintenance Requests
      </h1>
      <p className="text-slate-400 mb-6">
        Drag and drop requests to update their status.
      </p>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STATUS_COLUMNS.map((col) => (
            <div
              key={col.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(col.key)}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 min-h-[300px]"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                {col.label}
              </h2>

              {requests
                .filter((r) => r.status === col.key)
                .map((req) => (
                  <div
                    key={req._id}
                    draggable
                    onDragStart={() => setDraggedRequest(req)}
                    className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 mb-4 cursor-move hover:bg-slate-700/40 transition"
                  >
                    <h3 className="text-white font-medium">
                      {req.subject}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {req.request_type}
                    </p>
                  </div>
                ))}

              {requests.filter((r) => r.status === col.key).length === 0 && (
                <p className="text-sm text-slate-500">No requests</p>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Requests;