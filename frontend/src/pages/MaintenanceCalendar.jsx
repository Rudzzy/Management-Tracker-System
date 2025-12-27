import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getCalendarRequests } from "../api/requestApi";
import { Plus } from "lucide-react";

const MaintenanceCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await getCalendarRequests();

        setEvents(response.data);
      } catch (err) {
        setError("Failed to load maintenance calendar");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Maintenance Calendar
          </h1>
          <p className="text-slate-400">
            Scheduled preventive and corrective maintenance activities.
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          <Plus size={20} />
          <span>Schedule Maintenance</span>
        </button>
      </div>

      {loading && (
        <p className="text-slate-400">Loading calendar...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-slate-400">
          No scheduled maintenance activities.
        </p>
      )}

      {!loading && events.length > 0 && (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 hover:bg-slate-700/30 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">
                    {event.subject}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Equipment: {event.equipment_name || "—"}
                  </p>
                </div>
                <div className="text-sm text-slate-300">
                  {event.scheduled_date
                    ? new Date(event.scheduled_date).toLocaleDateString()
                    : "Unscheduled"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MaintenanceCalendar;