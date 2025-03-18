import React, { useState, useEffect } from "react";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks
  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Feedback Panel</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((feedback) => (
          <div key={feedback._id} style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Feedback:</strong> {feedback.message}</p>
            <p><small>{new Date(feedback.createdAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFeedback;
