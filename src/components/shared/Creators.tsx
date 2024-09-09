import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { Models } from "appwrite";

const Creators = () => {
  const { data: creators, isPending: isUserLoading } = useGetUsers();

  return (
    <div className="hidden md:flex md:flex-col px-6 py-12 min-w-[465px] bg-dark-2 overflow-scroll custom-scrollbar">
      <h2 className="h3-bold w-full text-left">Top Creators</h2>

      {isUserLoading && !creators ? (
        <Loader />
      ) : (
        <ul className="grid mt-10 gap-6 grid-cols-2">
          {creators?.documents.map((creator: Models.Document) => (
            <li key={creator.$id}>
              <UserCard creator={creator} desc={creator.username} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Creators;
