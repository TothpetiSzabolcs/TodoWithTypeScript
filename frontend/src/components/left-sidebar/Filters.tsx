import { FaList } from "react-icons/fa6";
import { BsCheck2Circle } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { GrCircleAlert } from "react-icons/gr";
import { FaFilter } from "react-icons/fa";

type Props = {
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Filters = ({ setActiveFilter, activeFilter, setActiveCategory }: Props) => {

  const handleClick = (filter: string) => {
    setActiveFilter(filter)
    setActiveCategory("")
  }
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="font-semibold text-xl flex items-center gap-2">
        {" "}
        <FaFilter size={25} />
        Filters
      </h1>
      <div className="flex gap-4 justify-between flex-wrap">
        <button
          onClick={() => handleClick("all")}
          className={
            activeFilter === "all"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-blue-100 transition-colors duration-200 text-blue-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          <FaList size={20} />
          All Tasks
        </button>
        <button
          onClick={() => handleClick("completed")}
          className={
            activeFilter === "completed"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-blue-100 transition-colors duration-200 text-blue-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          <BsCheck2Circle size={20} />
          Completed
        </button>
        <button
          onClick={() => handleClick("pending")}
          className={
            activeFilter === "pending"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-blue-100 transition-colors duration-200 text-blue-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          <FaRegCircle size={20} />
          Pending
        </button>
        <button
          onClick={() => handleClick("overdue")}
          className={
            activeFilter === "overdue"
              ? "flex items-center gap-2 w-full p-2 cursor-pointer bg-blue-100 transition-colors duration-200 text-blue-500 rounded-xl"
              : "flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors rounded-xl"
          }
        >
          <GrCircleAlert size={20} />
          Overdue
        </button>
      </div>
    </div>
  );
};

export default Filters;
