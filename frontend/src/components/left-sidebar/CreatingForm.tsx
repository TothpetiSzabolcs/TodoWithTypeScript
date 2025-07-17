import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "../../App";
import { createTodo } from "../../utils/TodoFetching";
import { Resolver } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

const schema = z.object({
  task: z.string().min(1, "Task must be minimum 1 characters long"),
  completed: z.boolean(),
  priority: z.string(),
  category: z.string(),
  dueDate: z.coerce.date(),
});

export type TodoFormData = z.infer<typeof schema>;

const CreatingForm = ({ todos, setTodos }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    defaultValues: {
      task: "",
      completed: false,
      priority: "",
      category: "",
      dueDate: new Date(),
    },
    resolver: zodResolver(schema) as Resolver<TodoFormData>,
    mode: "onBlur",
  });

  const onSubmit = async (data: TodoFormData) => {
    const res = await createTodo(data);
    setTodos((prev)=> [...prev,res.data ])
    reset();
  };

  const categories = [...new Set(todos.map((todo) => todo.category))];
  const priorities = [...new Set(todos.map((todo) => todo.priority))];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 gap-4">
      <h1 className="font-bold text-xl flex items-center gap-2">
        {" "}
        <FiPlus size={30} />
        Quick Add Task
      </h1>
      <input
        {...register("task")}
        className="border rounded-xl border-gray-300 h-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="What needs to be done?"
      />
      {errors.task && <p className="text-red-600">{errors.task.message}</p>}

      <div className="flex justify-center gap-10">
        <select
          {...register("category")}
          id="categorySelect"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          <option value="">Category</option>
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          {...register("priority")}
          id="prioritySelect"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        >
          <option value="">Priority</option>
          {priorities.map((priority, i) => (
            <option key={i} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <input
        {...register("dueDate")}
        type="date"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 border border-gray-300 rounded-lg text-white hover:bg-blue-700 cursor-pointer transition-all duration-300"
      >
        Add New Task
      </button>
    </form>
  );
};

export default CreatingForm;
