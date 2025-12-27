import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getRequests, updateRequestStatus } from "../api/requestApi";
import CreateRequestModal from "../components/requests/CreateRequestModal";
import { Plus } from "lucide-react";

const STATUS_COLUMNS = [
  { key: "New", label: "New" },
  { key: "In Progress", label: "In Progress" },
  { key: "Repaired", label: "Repaired" },
  { key: "Scrap", label: "Scrap" },
];

const MOCK_REQUESTS = [
  { _id: "1", subject: "Conveyor Belt Issue", status: "New", request_type: "repair", priority: "high", description: "Stuck", equipment_id: "101" },
  { _id: "2", subject: "Routine Check", status: "In Progress", request_type: "routine", priority: "medium", description: "Monthly check", equipment_id: "102" },
  { _id: "3", subject: "Hydraulic Leak", status: "Repaired", request_type: "breakdown", priority: "critical", description: "Leaking oil", equipment_id: "103" }
];

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedRequest, setDraggedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchRequests = async () => {
    try {
      const res = await getRequests();
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.warn("Failed to load requests, using mock data");
      setRequests(MOCK_REQUESTS);
      setError("");
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
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400">
          Drag and drop requests to update their status.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} />
          <span>New Request</span>
        </button>
      </div>

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

      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchRequests}
      />
    </Layout>
  );
};

export default Requests;