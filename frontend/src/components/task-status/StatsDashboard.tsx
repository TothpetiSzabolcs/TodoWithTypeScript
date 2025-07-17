import { FaList } from "react-icons/fa6";
import { BsCheck2Circle } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { FaCircleNotch } from "react-icons/fa";
import { Todo } from "../../App";


type Props = {
  todos: Todo[];
};

const StatsDashboard = ({ todos }: Props) => {

  const completedTodos: number = todos.filter((todo) => todo.completed).length;
  const inProgressTodos: number = todos.filter(
    (todo) => !todo.completed
  ).length;
  const completionRate: number =
    todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="grid grid-cols-4 items-center justify-center gap-10 w-[80%]">
        <div className=" flex items-center justify-between bg-white shadow-md hover:shadow-lg rounded-xl p-5">
          <div className="flex flex-col justify-between">
            <p className="text-gray-600 text-sm font-semibold">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-600">{todos.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaList className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className=" flex items-center justify-between bg-white shadow-md hover:shadow-lg rounded-xl p-5">
          <div className="flex flex-col justify-between">
            <p className="text-gray-600 text-sm font-semibold">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTodos}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <BsCheck2Circle className="w-7 h-7 text-green-600" />
          </div>
        </div>
        <div className=" flex items-center justify-between bg-white shadow-md hover:shadow-lg rounded-xl p-5">
          <div className="flex flex-col justify-between">
            <p className="text-gray-600 text-sm font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-orange-400">
              {inProgressTodos}
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <LuClock4 className="w-7 h-7 text-orange-400" />
          </div>
        </div>
        <div className=" flex items-center justify-between bg-white shadow-md hover:shadow-lg rounded-xl p-5">
          <div className="flex flex-col justify-between">
            <p className="text-gray-600 text-sm font-semibold">
              Completion Rate
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {completionRate}%
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <FaCircleNotch className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
