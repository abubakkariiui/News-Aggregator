import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { fetchNYTimes } from "../../services/api";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";
import NotFound from "../../components/NotFound/NotFound";

const Home = () => {
  const [query, setQuery] = useState("international");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchNYTimes(query, sort, page)
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

  const handleQuery = (sortBy) => {
    setSort(sortBy);
    setPage(0);
    setArticles([]);
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
      <div className="mb-2 flex justify-end items-center">
        <DropdownMenu
          handleSortBy={handleQuery}
          menuItems={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
            { label: "Relevance", value: "relevance" },
          ]}
        />
      </div>
      {isError && <NotFound />}
      {!isError && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            News - Top {query} Headlines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
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
