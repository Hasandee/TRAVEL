import React, { useState, useEffect } from "react";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  // Fetch all feedbacks
  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please provide your email and feedback message.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      const newFeedback = await res.json();
      setFeedbacks([newFeedback, ...feedbacks]); // Update state with new feedback
      setMessage(""); // Clear input field
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Submit Feedback
        </button>
      </form>

      <h2>All Feedback</h2>
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

export default Feedback;
