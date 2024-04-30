import axios from "axios";
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./actionTypes";

const nytAPIKey = import.meta.env.VITE_API_KEY_NYT;

const fetchDataRequest = () => ({
  type: SEARCH_REQUEST,
});

const fetchDataSuccess = (result, query) => ({
  type: SEARCH_SUCCESS,
  payload: {
    articles: result,
    query: query,
  },
});

const fetchDataFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const searchArticle = (query) => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${query}&apiKey=${apiKey}`;

    const response = await axios.get(url);
    const result = response.data;

    dispatch(fetchDataSuccess(result, query));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const fetchNYTimes =
  (query = "international") =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${nytAPIKey}`
      );
      dispatch(fetchDataSuccess(response.data, query)); // Assuming you dispatch the same success action as for searchArticle
    } catch (error) {
      console.error("Error fetching NYTimes:", error);
      dispatch(fetchDataFailure(error.message));
    }
  };
