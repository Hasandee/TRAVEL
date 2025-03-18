// Query.js (Frontend)
import React, { useState, useEffect } from "react";
import { submitQuery, fetchLoggedUserQueries } from "../api.js";

function Query() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);

  // Assuming the user's email is stored in localStorage after login
  const loggedUser = localStorage.getItem("user_data"); // Get the logged-in user's email

  
    const parsedUser = JSON.parse(loggedUser);
  

    const loggedUserEmail = parsedUser.user?.email;
  
   


 
  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const data = await fetchLoggedUserQueries(loggedUserEmail);
    setQueries(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    // Send the user's email with the query
    await submitQuery({ text: query, email: loggedUserEmail}); 
    setQuery("");
    loadQueries();
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Submit a Query</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border p-2"
          rows="3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Submit
        </button>
      </form>

      <h3 className="text-lg font-bold mb-2">Your Past Queries</h3>
      <ul>
        {queries.map((q) => (
          <li key={q._id} className="border p-2 my-2">
            <strong>Your Query:</strong> {q.text}
            {q.response && (
              <p className="text-green-600"><strong>Admin Reply:</strong> {q.response}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Query;
