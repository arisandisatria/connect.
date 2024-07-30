import FilterPost from "@/components/shared/FilterPost";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetCurrentUser,
  useGetPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export interface PostStatsInfoProps {
  posts: number;
  followers: number;
  following: number;
}

const Profile = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [postStatsInfo, setPostStatsinfo] = useState<PostStatsInfoProps>({
    posts: 0,
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!currentUser) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex flex-col w-full max-w-5xl">
          <div className="flex gap-4 lg:gap-8 mb-[69px]">
            <img
              src={
                currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-[222px] h-[130px] lg:w-[150px] lg:h-[150px] object-cover rounded-full"
            />

            <div className="flex flex-col gap-[22px]">
              <div className="flex items-start gap-12">
                <div>
                  <div className="flex items-center gap-[10px]">
                    <h1 className="h2-semibold md:h1-semibold ">
                      {currentUser?.name}{" "}
                    </h1>
                    <img
                      src="/assets/icons/verified.svg"
                      width={20}
                      height={20}
                      alt="verified"
                    />
                  </div>
                  <p className="base-regular text-light-3">
                    @{currentUser?.username}
                  </p>
                </div>
                {currentUser?.$id == user.id ? (
                  <div className="mt-2">
                    <Button
                      type="button"
                      onClick={() =>
                        navigate(`/update-profile/${currentUser?.$id}`)
                      }
                      className="shad-button_primary whitespace-nowrap"
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3 mt-2">
                    <Button
                      type="button"
                      className="shad-button_primary whitespace-nowrap"
                    >
                      Follow
                    </Button>
                    <Button
                      type="button"
                      className="shad-button_primary whitespace-nowrap !bg-white !text-dark-2"
                    >
                      Message
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-4 lg:gap-10 body-small md:body-medium">
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">
                    {postStatsInfo.posts}
                  </span>
                  Posts
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">230k</span>
                  Followers
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">68</span>
                  Following
                </p>
              </div>

              <p className="small-medium md:base-regular">{currentUser?.bio}</p>
            </div>
          </div>

          <FilterPost />

          <div className="mt-[57px]">
            {posts?.pages.map((item, index) => (
              <GridPostList
                key={`page-${index}`}
                posts={item?.documents}
                showUser={false}
                showStats={false}
                forProfile={true}
              />
            ))}
          </div>

          {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
