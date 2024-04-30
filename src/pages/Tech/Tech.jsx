import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../components/NewsCard/NewsCard";
import { fetchTechCrunch } from "../../services/api";
import Loading from "../../components/Loading/Loading";
import DropdownMenu from "../../components/DropDown/DropdownMenu";
import { useState } from "react";

const Tech = () => {
  const [sortBy, setSortBy] = useState("publishedAt");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", sortBy],
    queryFn: () => fetchTechCrunch(sortBy), // Pass a function that returns fetchTechCrunch with sortBy parameter
  });

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex justify-end items-center">
        <DropdownMenu
          handleSortBy={handleSortBy}
          menuItems={[
            { label: "Relevancy", value: "relevancy" },
            { label: "Popularity", value: "popularity" },
            { label: "Published At", value: "publishedAt" },
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
          <h1 className="text-2xl font-semibold mb-6 text-center">
            News - Top Tech Headlines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.articles
              ?.filter(
                (article) =>
                  article.author !== null && !article.title.includes("removed")
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

export default Tech;
