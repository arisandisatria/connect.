import { Models } from "appwrite";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type UserCardProps = {
  creator: Models.Document;
  desc?: string;
};

const UserCard = ({ creator, desc }: UserCardProps) => {
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
        <p className="tiny-medium text-light-4">
          {desc ? `@${desc}` : "Followed by jsmastery"}
        </p>
      </div>

      <Button
        type="button"
        className="shad-button_primary whitespace-nowrap mt-3 hover:opacity-85"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
