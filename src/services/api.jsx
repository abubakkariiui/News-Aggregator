// services/api.jsx

import axios from "axios";

axios.defaults.baseURL = "https://newsapi.org/v2";

const apiKey = import.meta.env.VITE_API_KEY;
const nytAPIKey = import.meta.env.VITE_API_KEY_NYT;

const pageSize = 20;

export const fetchTopHeadlines = async (sortBy = "publishedAt") => {
  try {
    const response = await axios.get(
      `/top-headlines?country=us&pageSize=${pageSize}&category=business&sortBy=${sortBy}&apiKey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};

// You can add more functions for different endpoints

// https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=561c89854df44356b5098bc06c0b36fb

export const fetchTechCrunch = async (sortBy = "publishedAt") => {
  try {
    const response = await axios.get(
      `/top-headlines?sources=techcrunch&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching TechCrunch:", error);
    throw error;
  }
};

// https://newsapi.org/v2/top-headlines?country=us&category={}&apiKey=561c89854df44356b5098bc06c0b36fb

export const fetchCategory = async (category) => {
  try {
    const response = await axios.get(
      `/top-headlines?country=us&pageSize=${pageSize}&category=${category}&apiKey=${apiKey}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=IQuKKAQ1lGkBkOmC63pZ9XZQB7Na3DRF

export const fetchNYTimes = async (query = "international") => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${nytAPIKey}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching NYTimes:", error);
    throw error;
  }
};
