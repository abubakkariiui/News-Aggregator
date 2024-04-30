import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { fetchNYTimes } from "../../services/api";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";
import NotFound from "../../components/NotFound/NotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [query, setQuery] = useState("international");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch initial data when component mounts
    fetchNYTimes(query, sort, page, null, null)
      .then((response) => {
        const newData = response.data.response.docs.filter(
          (article) =>
            article.byline?.original !== null &&
            !article.headline?.main.includes("removed")
        );
        setArticles((prevArticles) => [...prevArticles, ...newData]);
        setTotalPages(response.data.response.meta.hits / 10);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [query, sort, page]);

  useEffect(() => {
    // Fetch data when both beginDate and endDate are selected
    if (beginDate && endDate && isDateSelected) {
      setIsLoading(true);
      fetchNYTimes(query, sort, page, beginDate, endDate)
        .then((response) => {
          const newData = response.data.response.docs.filter(
            (article) =>
              article.byline?.original !== null &&
              !article.headline?.main.includes("removed")
          );
          setArticles(newData);
          setTotalPages(Math.ceil(response.data.response.meta.hits / 10));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [query, sort, page, beginDate, endDate, isDateSelected]);

  const handleChangeBeginDate = (date) => {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
      setBeginDate(formattedDate);
    } else {
      setBeginDate(null);
    }
  };

  const handleChangeEndDate = (date) => {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
      setEndDate(formattedDate);
    } else {
      setEndDate(null);
    }
  };

  const handleQuery = (sortBy) => {
    setSort(sortBy);
    setPage(0);
    setArticles([]);
  };

  const handleDateSelect = () => {
    if (beginDate && endDate) {
      setIsDateSelected(true);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages - 1) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-2 flex flex-col sm:flex-row justify-end items-center">
        <div className="mb-2 mr-1 sm:mb-0">
          {" "}
          {/* Hide on small screens */}
          <DropdownMenu
            handleSortBy={handleQuery}
            menuItems={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Relevance", value: "relevance" },
            ]}
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 mr-1 sm:mb-0">
            <DatePicker
              selected={
                beginDate
                  ? new Date(
                      beginDate.substring(0, 4),
                      beginDate.substring(4, 6) - 1,
                      beginDate.substring(6, 8)
                    )
                  : null
              }
              isClearable
              onChange={handleChangeBeginDate}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              className="px-2 py-1 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-2 sm:mb-0">
            <DatePicker
              selected={
                endDate
                  ? new Date(
                      endDate.substring(0, 4),
                      endDate.substring(4, 6) - 1,
                      endDate.substring(6, 8)
                    )
                  : null
              }
              isClearable
              onChange={handleChangeEndDate}
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
              className="px-2 py-1 border rounded-md focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleDateSelect}
          className="px-4 py-1 mt-2 sm:mt-0 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>

      {isError && <NotFound />}
      {!isError && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            News - Top {query} Headlines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
          {isLoading && <Loading />}
          {!isLoading && page < totalPages - 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                  isLoadingMore ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoadingMore ? "Loading..." : "Load More"}{" "}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
