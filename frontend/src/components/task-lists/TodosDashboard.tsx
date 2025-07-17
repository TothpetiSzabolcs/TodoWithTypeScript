import { Todo } from "../../App";
import EmptyTaskList from "./EmptyTaskList";
import FilteredTodos from "./FilteredTodos";

type Props = {
  activeFilters: string;
  todos: Todo[];
  activeCategory: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  searchQuery: string;
  sortedBy: string
};

const TodosDashboard = ({
  activeFilters,
  todos,
  activeCategory,
  setTodos,
  searchQuery,
  sortedBy
}: Props) => {

  return (
    <>
      {todos.length === 0 && <EmptyTaskList />}
      <div className="bg-white shadow-lg flex flex-col justify-center items-start w-full p-6 rounded-xl gap-5">
        <FilteredTodos
          activeFilters={activeFilters}
          todos={todos}
          activeCategory={activeCategory}
          setTodos={setTodos}
          searchQuery={searchQuery}
          sortedBy={sortedBy}
        />
      </div>
    </>
  );
};

export default TodosDashboard;
