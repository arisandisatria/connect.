import { Models } from "appwrite";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import { useUserContext } from "@/context/AuthContext";
// import {
//   useFollowingUser,
//   useFollowUser,
//   useGetUserById,
// } from "@/lib/react-query/queriesAndMutations";

type UserCardProps = {
  creator: Models.Document;
  desc?: string;
};

const UserCard = ({ creator, desc }: UserCardProps) => {
  // const { user } = useUserContext();
  // const { data: currentUser } = useGetUserById(user.id || "");
  // const { mutate: followUser } = useFollowUser();
  // const { mutate: followingUser } = useFollowingUser();
  // const navigate = useNavigate();

  // const currentUserActive = user.id == creator.$id;

  // const isFollowingCreator = currentUser?.following?.includes(creator.$id);

  // const handleFollow = (e: any) => {
  //   e.preventDefault();

  //   if (currentUser) {
  //     const hasFollowed = currentUser.followers.includes(user.id);

  //     let newFollowers, newFollowing;

  //     if (hasFollowed) {
  //       newFollowers = currentUser.followers.filter(
  //         (followerId: string) => followerId !== user.id
  //       );
  //       newFollowing = user.following.filter(
  //         (followingId: string) => followingId !== currentUser.$id
  //       );
  //     } else {
  //       newFollowers = [...new Set([...currentUser.followers, user.id])];
  //       newFollowing = [...new Set([...user.following, currentUser.$id])];
  //     }

  //     followUser({ userId: creator.$id || "", followerArray: newFollowers });
  //     followingUser({ userId: user.id || "", followingArray: newFollowing });
  //   }
  // };

  return (
    <Link
      to={`/profile/${creator.$id}`}
      className="flex-center flex-col py-6 post-card w-[190px] h-[190px]"
    >
      <img
        src={creator.imageUrl || `/assets/icons/profile-placeholder.svg`}
        alt="creator"
        width={54}
        height={54}
        className="rounded-full w-[54px] h-[54px] object-cover"
      />

      <div className="flex-center flex-col gap-0.5 mt-2.5">
        <p className="small-medium">{creator.name}</p>
        <p className="tiny-medium text-light-4">{`@${desc}`}</p>
      </div>

      <Button
        type="button"
        disabled
        // onClick={(e) => {
        //   currentUserActive ? navigate(`/profile/${user.id}`) : handleFollow(e);
        // }}
        className="shad-button_primary whitespace-nowrap mt-3 hover:opacity-85"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
