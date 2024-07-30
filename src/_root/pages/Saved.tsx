import FilterPost from "@/components/shared/FilterPost";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";

const Saved = () => {
  const { data: savedPosts, isPending: isSavedPostsLoading } =
    useGetSavedPosts();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/bookmark.svg"
            alt="saved"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>

        <FilterPost isProfile={false} />

        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {!savedPosts && isSavedPostsLoading ? (
            <Loader />
          ) : (
            <GridPostList
              posts={savedPosts?.documents}
              showUser={false}
              showStats={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
