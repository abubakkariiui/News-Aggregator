// services/api.jsx

import axios from "axios";

const nytAPIKey = import.meta.env.VITE_API_KEY_NYT;

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=IQuKKAQ1lGkBkOmC63pZ9XZQB7Na3DRF

export const fetchNYTimes = async (
  query = "international",
  sort = "newest",
  page = 0, // Default page number is 0
  beginDate = null,
  endDate = null
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=${sort}&page=${page}&api-key=${nytAPIKey}`;

    // Add beginDate and endDate to the URL if provided
    if (beginDate && endDate) {
      url += `&begin_date=${beginDate}&end_date=${endDate}`;
    }

    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching NYTimes:", error);
    throw error;
  }
};
