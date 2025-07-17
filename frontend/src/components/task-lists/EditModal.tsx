import { Todo } from "../../App";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateTodo } from "../../utils/TodoFetching";
import { TodoFormData } from "../left-sidebar/CreatingForm";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  close: () => void;
  todos: Todo[];
};

const EditModal = ({ todo, setTodos, close, todos }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      task: todo.task,
      priority: todo.priority,
      category: todo.category,
      dueDate: new Date(todo.dueDate),
      completed: todo.completed,
    },
  });

  const categoryList = [...new Set(todos.map((todo) => todo.category))];
  const priorityList = [...new Set(todos.map((todo) => todo.priority))];

  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    const updatedTodo = {
      ...data,
      _id: todo._id,
      completed: todo.completed,
      createdAt: todo.createdAt
    };
    await updateTodo(todo._id, updatedTodo);
    setTodos((prev) =>
      prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
    close();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[30%]"
      >
        <h2 className="text-xl font-semibold text-center">Edit Task</h2>
        <input
          {...register("task")}
          className="border p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <select
          {...register("category")}
          className="border p-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          {categoryList.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <select
          {...register("priority")}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          {priorityList.map((priority) => (
            <option value={priority}>{priority}</option>
          ))}
        </select>
        <input
          type="date"
          {...register("dueDate")}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="flex gap-6 justify-evenly">
          <button
            type="button"
            onClick={close}
            className="bg-gray-300 px-8 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
