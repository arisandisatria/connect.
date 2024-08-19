import FilterPost from "@/components/shared/FilterPost";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useFollowingUser,
  useFollowUser,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { checkIsFollowed } from "@/lib/utils";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { data: currentUser, refetch } = useGetUserById(id || "");
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  // const { ref, inView } = useInView();
  const { mutate: followUser } = useFollowUser();
  const { mutate: followingUser } = useFollowingUser();

  const [postStatsInfo, setPostStatsInfo] = useState<{
    posts: any[];
    followers: string[];
    following: string[];
  }>({
    posts: [],
    followers: [],
    following: [],
  });

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  // }, [inView]);

  useEffect(() => {
    if (currentUser?.$id != id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      setPostStatsInfo({
        posts: currentUser.posts,
        followers: currentUser.followers,
        following: currentUser.following,
      });
    }
  }, [currentUser]);

  if (!currentUser || currentUser?.$id != id) {
    return <Loader />;
  }

  const handleFollow = () => {
    const hasFollowed = currentUser.followers.includes(user.id);

    let newFollowers, newFollowing;

    if (hasFollowed) {
      newFollowers = currentUser.followers.filter(
        (followerId: string) => followerId !== user.id
      );
      newFollowing = user.following.filter(
        (followingId: string) => followingId !== currentUser.$id
      );
    } else {
      newFollowers = [...new Set([...currentUser.followers, user.id])];
      newFollowing = [...new Set([...user.following, currentUser.$id])];
    }

    setPostStatsInfo((prevState) => ({
      ...prevState,
      followers: newFollowers,
      following: newFollowing,
    }));

    followUser({ userId: id || "", followerArray: newFollowers });
    followingUser({ userId: user.id || "", followingArray: newFollowing });
  };

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
                      onClick={handleFollow}
                      type="button"
                      className="shad-button_primary whitespace-nowrap"
                    >
                      {checkIsFollowed(currentUser?.followers, user.id)
                        ? "Followed"
                        : "Follow"}
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
                    {postStatsInfo.posts.length}
                  </span>
                  Posts
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">
                    {postStatsInfo.followers.length}
                  </span>
                  Followers
                </p>
                <p>
                  <span className="mr-1 lg:mr-2 text-primary-500">
                    {postStatsInfo.following.length}
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
