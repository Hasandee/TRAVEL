// api.js
const API_URL = "http://localhost:8080/api/queries"; // Ensure this points to the correct backend URL

// Function to submit a new query (for users)
export const submitQuery = async (query) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    console.log(query);
    
    if (!response.ok) {
      throw new Error("Failed to submit query");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting query:", error);
    throw error;
  }
};

// Function to fetch all queries (for the admin or user to see past queries)
export const fetchQueries = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch queries");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching queries:", error);
    throw error;
  }
};

export const fetchLoggedUserQueries = async (email) => {
    try {
      const response = await fetch(`${API_URL}/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch queries");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching queries:", error);
      throw error;
    }
  };

// Function for admin to respond to a query
export const respondToQuery = async (queryId, responseText) => {
  try {
    const response = await fetch(`${API_URL}/${queryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: responseText }),
    });

    if (!response.ok) {
      throw new Error("Failed to update query response");
    }

    return await response.json();
  } catch (error) {
    console.error("Error responding to query:", error);
    throw error;
  }
};
