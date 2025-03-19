import React, { useState, useEffect } from "react";
import { fetchQueries, respondToQuery } from "../api.js";
import "../Styles/AdminQuery.css";
import { useNavigate } from "react-router-dom"; 

function AdminQuery({ onBack }) {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

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
    <div className="admin-container">
      <h2 className="admin-title">Admin Query Management</h2>
      <button className="admin-back-button" onClick={() => navigate("/adminprofile")}>
        ⬅ Back
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Query</th>
            <th>Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q) => (
            <tr key={q._id}>
              <td>{q.email}</td>
              <td>{q.text}</td>
              <td>{q.response || "Not replied yet"}</td>
              <td>
                <textarea
                  className="admin-textarea"
                  rows="2"
                  value={responses[q._id] || ""}
                  onChange={(e) =>
                    setResponses((prev) => ({ ...prev, [q._id]: e.target.value }))
                  }
                  placeholder="Enter your response..."
                />
                <button
                  className="admin-button"
                  onClick={() => handleResponse(q._id)}
                >
                  Send Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   
    </div>
  );
}

export default AdminQuery;