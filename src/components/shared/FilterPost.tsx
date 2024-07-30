const FilterPost = ({ isProfile = true }) => {
  const isTabActive = true;

  return (
    <div className="flex justify-between w-full max-w-5xl">
      <div className="flex justify-between items-center rounded-[10px] overflow-hidden border border-dark-4/80">
        <div
          className={`${
            isTabActive && "bg-dark-3"
          } flex-center gap-2.5 py-1 px-[18px] lg:py-3 lg:px-[50px] border border-dark-4/80 cursor-pointer`}
        >
          <img
            src="/assets/icons/gallery.svg"
            alt="post"
            width={20}
            height={20}
          />
          <p className="base-medium">Posts</p>
        </div>
        <div className="flex-center gap-2.5 py-1 px-[18px] lg:py-3 lg:px-[50px] border border-dark-4/80 cursor-pointer">
          <img src="/assets/icons/reel.svg" alt="post" width={20} height={20} />
          <p className="base-medium">Reels</p>
        </div>
        {isProfile ? (
          <div className="flex-center gap-2.5 py-1 px-[18px] lg:py-3 lg:px-[50px] border border-dark-4/80 cursor-pointer">
            <img
              src="/assets/icons/collection.svg"
              alt="post"
              width={20}
              height={20}
            />
            <p className="base-medium">Tagged</p>
          </div>
        ) : (
          <div className="flex-center gap-2.5 py-1 px-[18px] lg:py-3 lg:px-[50px] border border-dark-4/80 cursor-pointer">
            <img
              src="/assets/icons/collection.svg"
              alt="post"
              width={20}
              height={20}
            />
            <p className="base-medium">Collections</p>
          </div>
        )}
      </div>

      <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
        <p className="small-medium md:base-medium text-light-2">All</p>
        <img
          src="/assets/icons/filter.svg"
          alt="filter"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default FilterPost;
