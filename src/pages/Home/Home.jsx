import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { fetchNYTimes } from "../../services/api";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";

const Home = () => {
  const [query, setQuery] = useState("international");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", query],
    queryFn: () => fetchNYTimes(query),
  });

  // Function to handle query
  const handleQuery = (sortBy) => {
    setQuery(sortBy);
  };

  return (
    <>
      <div className="w-full p-6">
        <div className="mb-4 flex justify-end items-center">
          <div className="mb-4 flex justify-end items-center">
            <DropdownMenu
              handleSortBy={handleQuery}
              menuItems={[
                { label: "Relevancy", value: "relevancy" },
                { label: "Popularity", value: "popularity" },
                { label: "Published At", value: "publishedAt" },
              ]}
            />
          </div>
        </div>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-center">
              News - {query}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.data?.response?.docs
                ?.filter(
                  (article) =>
                    article.byline.original !== null &&
                    !article.headline.main.includes("removed")
                )
                .map(
                  (article, index) => (
                    console.log(article),
                    (
                      <>
                        <ArticleCard key={index} article={article} />
                      </>
                    )
                  )
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
