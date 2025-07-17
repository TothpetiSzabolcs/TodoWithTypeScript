import { BiSolidCategoryAlt } from "react-icons/bi";

type Props = {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Categories = ({
  activeCategory,
  setActiveCategory,
  setActiveFilter,
}: Props) => {


  const handleClick = (category: string) => {
  setActiveCategory(category);
  setActiveFilter("");
};


  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="flex items-center gap-4">
        <BiSolidCategoryAlt size={30} /> Categories
      </h1>
      <div className="flex gap-4 justify-between flex-wrap">

        <button
          onClick={() => handleClick("Work")}
          className={
            activeCategory === "Work"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-blue-100 transition-colors duration-200 text-blue-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          🔵 Work 
        </button>
        <button
          onClick={() => handleClick("Personal")}
          className={
            activeCategory === "Personal"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-purple-100 transition-colors duration-200 text-purple-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          🟣 Personal
        </button>
        <button
          onClick={() => handleClick("Health")}
          className={
            activeCategory === "health"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-green-100 transition-colors duration-200 text-green-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          🟢 Health
        </button>
      </div>
    </div>
  );
};

export default Categories;
