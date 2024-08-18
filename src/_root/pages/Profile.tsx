import FilterPost from "@/components/shared/FilterPost";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
// import { checkIsFollowed } from "@/lib/utils";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser, isRefetching: isLoadingUser } = useGetUserById(
    id || ""
  );
  const navigate = useNavigate();
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  // const { ref, inView } = useInView();
  // const { mutate: followUser } = useFollowUser();

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  // }, [inView]);

  if (!currentUser || isLoadingUser) {
    return <Loader />;
  }

  // const followerList = showUserData?.followers.map(
  //   (user: Models.Document) => user.$id
  // );

  // const [postStatsInfo, setPostStatsinfo] = useState({
  //   posts: 0,
  //   followers: followerList || [],
  //   following: 0,
  // });

  // const handleFollow = (e: React.MouseEvent) => {
  //   e.stopPropagation();

  //   let newFollower: string[] = [...postStatsInfo.followers];

  //   const hasFollowed = newFollower.includes(currentUser.$id);

  //   if (hasFollowed) {
  //     newFollower = newFollower.filter((id) => id != currentUser.$id);
  //   } else {
  //     newFollower.push(currentUser.$id);
  //   }

  //   setPostStatsinfo((prevState) => ({
  //     ...prevState,
  //     followers: newFollower,
  //   }));
  //   followUser({ userId: id || "", followerArray: newFollower });
  // };

  return (
    <div key={id} className="flex flex-1">
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
                {currentUser?.$id && id == user.id ? (
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
                      // onClick={handleFollow}
                      type="button"
                      className="shad-button_primary whitespace-nowrap"
                    >
                      {/* {checkIsFollowed(postStatsInfo.followers, currentUser.$id)
                        ? "Followed"
                        : "Follow"} */}
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
                    {/* {postStatsInfo.posts} */}0
                  </span>
                  Posts
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">
                    {/* {postStatsInfo.followers?.length || 0} */}0
                  </span>
                  Followers
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">
                    {/* {postStatsInfo.following} */}0
                  </span>
                  Following
                </p>
              </div>

              <p className="small-medium md:base-regular">{currentUser?.bio}</p>
            </div>
          </div>

          <FilterPost />

          <div className="mt-[57px]">
            {/* {posts?.pages.map((post, index) => (
              <GridPostList
                key={`page-${index}`}
                posts={post?.documents}
                showUser={false}
                showStats={false}
              />
            ))} */}
            <GridPostList
              // key={`page-${index}`}
              posts={currentUser.posts}
              showUser={false}
              showStats={false}
            />
          </div>

          {/* {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
