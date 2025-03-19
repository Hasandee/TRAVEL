import React, { useState, useEffect } from "react";
import "../Styles/AdminFeedback.css";
import { useNavigate } from "react-router-dom";

function AdminFeedback({ onBack }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Fetch feedbacks on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  // Handle the delete feedback action
  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/feedback/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted feedback from the state
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        alert('Feedback deleted successfully.');
      } else {
        throw new Error('Failed to delete feedback');
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback.");
    }
  };

  return (
    <div className="admin-feedback-container">
      <button className="admin-back-button" onClick={() => navigate("/adminprofile")}>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="admin-delete-button"
                    onClick={() => handleDeleteFeedback(feedback._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFeedback;
