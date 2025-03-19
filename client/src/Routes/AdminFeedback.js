import React, { useState, useEffect } from "react";
import "../Styles/AdminFeedback.css";
import { useNavigate } from "react-router-dom"; 

function AdminFeedback({ onBack }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  return (
    <div className="admin-feedback-container">
      <button className="admin-back-button"  onClick={() => navigate("/adminprofile")}>
        ⬅ Back
      </button>
      <h2 className="admin-feedback-title">Admin Feedback Panel</h2>
      {feedbacks.length === 0 ? (
        <p className="admin-no-feedback">No feedback available.</p>
      ) : (
        <table className="admin-feedback-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFeedback;