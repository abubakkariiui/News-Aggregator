import { useQuery } from "@tanstack/react-query";
import { fetchNYTimes } from "../../services/api";
import Loading from "../../components/Loading/Loading";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const Business = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNYTimes("business"),
  });

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex justify-end items-center"></div>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-center">
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
