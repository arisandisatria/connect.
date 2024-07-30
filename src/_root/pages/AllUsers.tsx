import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const AllUsers = () => {
  const { data: creators, isPending: isCreatorsLoading } = useGetUsers(10);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            alt="creators"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        {!creators && isCreatorsLoading ? (
          <Loader />
        ) : (
          <ul className="flex gap-12 flex-wrap w-full max-w-5xl">
            {creators?.documents.map((creator: Models.Document) => (
              <li className="w-1/5" key={creator.$id}>
                <UserCard creator={creator} desc={creator.username} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
