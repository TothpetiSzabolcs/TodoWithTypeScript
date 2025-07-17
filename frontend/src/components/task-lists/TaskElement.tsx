import { Todo } from "../../App";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Priorities from "./Priorities";
import { IoIosCheckmark } from "react-icons/io";
import { deleteTodo } from "../../utils/TodoFetching";
import { useState } from "react";
import EditModal from "./editModal";
import { updateTodo } from "../../utils/TodoFetching";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

type Category = "Work" | "Personal" | "Health";

const categoryBorderColors: Record<Category, string> = {
  Work: "border-blue-500",
  Personal: "border-purple-500",
  Health: "border-green-500",
};
const TaskElement = ({ todo, setTodos, todos }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const isOverDue = new Date(todo.dueDate) < new Date();

  const borderColor =
    categoryBorderColors[todo.category as Category] || "border-gray-300";

  const handleDelete = async (id: string) => {
    await deleteTodo(id);

    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };
  const handleToggle = async (checked: boolean, id: string) => {
    const updatedTodo = {
      ...todo,
      completed: checked,
    };

    await updateTodo(id, updatedTodo);

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: checked } : todo
      )
    );
  };

  return (
    <>
      {isEditing && (
        <EditModal
          todo={todo}
          setTodos={setTodos}
          close={() => setIsEditing(false)}
          todos={todos}
        />
      )}
      <div
        className={`flex gap-10 w-full justify-between shadow-md rounded-xl p-4 hover:translate-x-2 transition-all duration-300 border-l-4 ${borderColor} ${
          isOverDue ? "bg-[#FEF0F0]" : ""
        }`}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            name=""
            id=""
            className="w-5 h-5 cursor-pointer"
            checked={todo.completed}
            onChange={(e) => handleToggle(e.target.checked, todo._id)}
          />
        </div>
        <div className="flex flex-col gap-1 items-start justify-center w-full">
          <h1
            className={
              !todo.completed
                ? `font-semibold text-xl`
                : `font-semibold text-xl text-gray-500`
            }
          >
            {todo.task}
          </h1>
          <div className="flex text-sm text-gray-500 gap-4">
            <Priorities priority={todo.priority} />
            {todo.dueDate && (
              <span
                className={
                  new Date(todo.dueDate) < new Date() ? `text-red-800` : ""
                }
              >
                📅 {new Date(todo.dueDate).toLocaleDateString("hu-HU")}
              </span>
            )}
            {todo.completed && (
              <span className="flex items-center text-xs">
                <IoIosCheckmark size={20} />
                Completed
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center p-2">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-100 transition-colors duration-300">
            <FaRegEdit
              size={18}
              className="cursor-pointer text-gray-500  hover:text-gray-700 transition-colors duration-300"
              onClick={() => handleEdit()}
            />
          </div>
          <div className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-100 transition-colors duration-300">
            <FaTrash
              size={15}
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskElement;
