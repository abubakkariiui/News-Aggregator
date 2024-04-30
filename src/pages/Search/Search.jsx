import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchArticle } from "../../store/action";
import ArticleCard from "../../components/NewsCard/NewsCard";
import { capitaLize } from "../../utils/helpers";
import NotFound from "../../components/NotFound/NotFound";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt"); // Default sorting
  const { articles, loading } = useSelector((state) => state.search);
  const { query } = useParams();

  const dispatch = useDispatch();

  const title = capitaLize(searchQuery);
  document.title = `${title} - News`;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchArticle(query, fromDate, toDate, sortBy));
  };

  const handleSortBy = (option) => {
    setSortBy(option);
  };

  useEffect(() => {
    setSearchQuery(query);
    dispatch(searchArticle(query, fromDate, toDate, sortBy));
  }, [query, fromDate, toDate, sortBy, dispatch]);

  return (
    <div className="w-full p-6">
      <form
        onSubmit={handleSearch}
        className="mb-4 flex justify-end items-center"
      >
        <div className="flex mr-2 items-center">
          <label htmlFor="fromDate" className="text-sm mr-1">
            From Date:
          </label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-1 border rounded focus:outline-none focus:border-blue-500"
            placeholder="From Date"
          />
        </div>
        <div className="flex mr-2 items-center">
          <label htmlFor="toDate" className="text-sm mr-1">
            To Date:
          </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-1 border rounded focus:outline-none focus:border-blue-500"
            placeholder="To Date"
          />
        </div>
        <div className="flex justify-end mr-2">
          <DropdownMenu
            handleSortBy={handleSortBy}
            menuItems={[
              { label: "Relevancy", value: "relevancy" },
              { label: "Popularity", value: "popularity" },
              { label: "Published At", value: "publishedAt" },
            ]}
          />
        </div>
      </form>

      {loading ? (
        <Loading />
      ) : articles && articles.totalResults === 0 ? (
        <div className="flex justify-center items-center">
          <NotFound query={title} />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
            News - Top {title} Headlines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles?.articles
              ?.filter(
                (article) =>
                  article.author !== null &&
                  !article.title.toLowerCase().includes("removed")
              )
              .map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
