import { BsCheck2Square } from "react-icons/bs";

const EmptyTaskList = () => {
  return (
    <div className="bg-white text-center flex flex-col w-full justify-center items-center rounded-xl p-15 gap-5">
      <div className="bg-gray-200 rounded-full w-30 h-30 flex justify-center items-center">
        <BsCheck2Square size={60} className="text-gray-500" />
      </div>
      <h1 className="font-semibold text-xl text-gray-700">No Tasks Found</h1>
      <p className="text-gray-500">
        Create your first task to get started with TaskFlow
      </p>
      <button className="px-6 py-3 bg-blue-600 rounded-xl font-semibold text-white cursor-pointer hover:bg-blue-700 transition-all duration-300">
        Add Your First Task
      </button>
    </div>
  );
};

export default EmptyTaskList;
