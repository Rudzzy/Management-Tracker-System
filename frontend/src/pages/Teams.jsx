import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { getTeams } from "../api/requestApi";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();

        setTeams(response.data);
      } catch (err) {
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Maintenance Teams
        </h1>
        <p className="text-slate-400">
          View maintenance teams and their assigned technicians.
        </p>
      </div>

      {loading && (
        <p className="text-slate-400">Loading teams...</p>
      )}

      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {!loading && !error && teams.length === 0 && (
        <p className="text-slate-400">
          No teams found.
        </p>
      )}

      {!loading && teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team._id}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                {team.team_name}
              </h2>

              <p className="text-sm text-slate-400 mb-4">
                Specialization: {team.specialization || "—"}
              </p>

              <h3 className="text-sm font-semibold text-slate-300 mb-2">
                Technicians
              </h3>

              {team.members && team.members.length > 0 ? (
                <ul className="space-y-2">
                  {team.members.map((member) => (
                    <li
                      key={member.user_id}
                      className="flex justify-between items-center bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2"
                    >
                      <span className="text-slate-200">
                        {member.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {member.role}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No technicians assigned.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Teams;