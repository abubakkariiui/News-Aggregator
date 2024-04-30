import axios from "axios";
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from "./actionTypes";

const apiKey = import.meta.env.VITE_API_KEY;

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

export const searchArticle =
  (query, fromDate, toDate, sortBy) => async (dispatch) => {
    try {
      dispatch(fetchDataRequest());

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${query}&apiKey=${apiKey}`;
      if (fromDate && toDate) {
        url += `&from=${fromDate}&to=${toDate}`;
      }
      if (sortBy) {
        url += `&sortBy=${sortBy}`;
      }

      const response = await axios.get(url);
      const result = response.data;

      dispatch(fetchDataSuccess(result, query));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
