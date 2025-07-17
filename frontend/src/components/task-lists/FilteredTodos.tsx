import { Todo } from "../../App";
import TaskElement from "./TaskElement";
import EmptyTaskList from "./EmptyTaskList";

type Props = {
  activeFilters: string;
  todos: Todo[];
  activeCategory: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  searchQuery: string;
  sortedBy: string
};

const FilteredTodos = ({
  activeFilters,
  todos,
  activeCategory,
  setTodos,
  searchQuery,
  sortedBy
}: Props) => {
  const today: Date = new Date();

  const sortedTodos: Todo[] = [...todos].sort((a: Todo,b: Todo) => {
    if(sortedBy === "created") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if(sortedBy === "priority"){
      const order: string[] = ["High", "Medium", "Low"];
      return order.indexOf(a.priority) - order.indexOf(b.priority)
    }
    if(sortedBy === "category"){
      const order: string[] = ["Health", "Work", "Personal"]
      return order.indexOf(a.category) - order.indexOf(b.category)
    }
    if(sortedBy === "task") {
      return a.task.localeCompare(b.task)
    }
    return 0
  })

  const filteredTodos = sortedTodos
    .filter((todo) => {
      if (activeFilters === "completed") return todo.completed;
      if (activeFilters === "pending") return !todo.completed;
      if (activeFilters === "overdue") return new Date(todo.dueDate) < today;
      return activeFilters = "all"; 
    })
    .filter((todo) => {
      if (activeCategory) return todo.category === activeCategory;
      return true;
    })
    .filter((todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (filteredTodos.length === 0) return <EmptyTaskList />;

  return (
    <>
      {filteredTodos.map((todo) => (
        <TaskElement
          key={todo._id}
          todo={todo}
          setTodos={setTodos}
          todos={todos}
        />
      ))}
    </>
  );  
};

export default FilteredTodos;
