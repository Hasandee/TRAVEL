import React, { useState, useEffect } from "react";
import { fetchQueries, respondToQuery } from "../api.js";

function AdminQuery() {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const data = await fetchQueries();
    setQueries(data);
  };

  const handleResponse = async (queryId) => {
    if (!responses[queryId]) return;
    await respondToQuery(queryId, responses[queryId]);
    setResponses((prev) => ({ ...prev, [queryId]: "" }));
    loadQueries();
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Admin Query Management</h2>
      <ul>
        {queries.map((q) => (
          <li key={q._id} className="border p-2 my-2">
            <strong>User Query:</strong> {q.text}
            <strong>User Email:</strong> {q.email}
            <p><strong>Response:</strong> {q.response || "Not replied yet"}</p>
            <textarea
              className="w-full border p-2 mt-2"
              rows="2"
              value={responses[q._id] || ""}
              onChange={(e) =>
                setResponses((prev) => ({ ...prev, [q._id]: e.target.value }))
              }
              placeholder="Enter your response..."
            />
            <button
              className="bg-green-500 text-white p-2 mt-2"
              onClick={() => handleResponse(q._id)}
            >
              Send Reply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminQuery;
