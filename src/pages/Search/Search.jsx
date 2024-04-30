import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNYTimes } from "../../store/action";
import { capitaLize } from "../../utils/helpers";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import NotFound from "../../components/NotFound/NotFound";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt"); // Default sorting
  const { articles, loading, error } = useSelector((state) => state.search);
  const { query } = useParams();

  const dispatch = useDispatch();

  const title = capitaLize(searchQuery);
  document.title = `${title} - News`;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchNYTimes(query));
  };

  const handleSortBy = (option) => {
    setSortBy(option);
  };

  useEffect(() => {
    setSearchQuery(query);
    dispatch(fetchNYTimes(query));
  }, [query, sortBy, dispatch]);

  return (
    <>
      <div className="w-full p-6">
        <form
          onSubmit={handleSearch}
          className="mb-4 flex justify-end items-center"
        >
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
          <>
            <Loading />
          </>
        ) : error ? (
          <>
            <NotFound />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-center">
              News - Top {query} Headlines
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {articles?.response?.docs
                ?.filter(
                  (article) =>
                    article.byline.original !== null &&
                    !article.headline.main.includes("removed")
                )
                .map((article, index) => (
                  <>
                    <ArticleCard key={index} article={article} />
                  </>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
