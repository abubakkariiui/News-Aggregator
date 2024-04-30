import { useQuery } from "@tanstack/react-query";
import { fetchNYTimes } from "../../services/api";
import Loading from "../../components/Loading/Loading";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import DropdownMenu from "../../components/DropDown/DropdownMenu";
import { useState } from "react";

const Business = () => {
  const [sort, setSort] = useState("newest");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", sort],
    queryFn: () => fetchNYTimes("business", sort),
  });

  // Function to handle query
  const handleQuery = (sortBy) => {
    setSort(sortBy);
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
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            News - Top Business Headlines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.response?.docs
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
  );
};

export default Business;
