import React, { useState, useEffect } from "react";
import { fetchQueries, respondToQuery } from "../api.js";
import "../Styles/AdminQuery.css";
import { useNavigate } from "react-router-dom";

function AdminQuery({ onBack }) {
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});
  const [editingQueryId, setEditingQueryId] = useState(null); // Track which query is being edited
  const navigate = useNavigate();

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const data = await fetchQueries();
    setQueries(data);
  };

  const handleResponse = async (queryId) => {
    if (!responses[queryId] || responses[queryId].trim() === "") {
      // If the response is empty or only contains whitespace, show an alert
      alert("Response cannot be empty.");
      return;
    }

    // Send the response
    await respondToQuery(queryId, responses[queryId]);

    // Clear the response field after sending the reply
    setResponses((prev) => ({ ...prev, [queryId]: "" }));

    // Reload the queries
    loadQueries();

    // Show success alert
    alert("Query Reply successfully");
  };

  const handleEditResponse = (queryId) => {
    setEditingQueryId(queryId);
    setResponses((prev) => ({ ...prev, [queryId]: queries.find(q => q._id === queryId).response }));
  };

  const handleUpdateResponse = async (queryId) => {
    if (!responses[queryId] || responses[queryId].trim() === "") {
      // If the response is empty or only contains whitespace, show an alert
      alert("Response cannot be empty.");
      return;
    }

    // Update the response
    await respondToQuery(queryId, responses[queryId]);

    // Stop editing
    setEditingQueryId(null);

    // Reload the queries
    loadQueries();

    // Show success alert
    alert("Query Reply successfully updated");
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
            <tr key={q._id} className={q.response ? "" : "not-replied"}> {/* Apply class if no response */}
              <td>{q.email}</td>
              <td>{q.text}</td>
              <td>{q.response || "Not replied yet"}</td>
              <td>
                {/* If the query has already been replied to */}
                {q.response ? (
                  <div>
                    {editingQueryId === q._id ? (
                      <>
                        <textarea
                          className="admin-textarea"
                          rows="2"
                          value={responses[q._id] || ""}
                          onChange={(e) =>
                            setResponses((prev) => ({ ...prev, [q._id]: e.target.value }))
                          }
                          placeholder="Enter your updated response..."
                        />
                        <button
                          className="admin-button"
                          onClick={() => handleUpdateResponse(q._id)}
                        >
                          Update Reply
                        </button>
                        <button
                          className="admin-button cancel-button"
                          onClick={() => setEditingQueryId(null)}
                        >
                          Cancel Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="admin-button"
                          onClick={() => handleEditResponse(q._id)}
                        >
                          Edit Reply
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminQuery;
