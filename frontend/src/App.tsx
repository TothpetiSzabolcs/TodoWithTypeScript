import Header from "./components/header/Header";
import StatsDashboard from "./components/task-status/StatsDashboard";
import { Toaster } from "sonner";
import LeftSideBar from "./components/left-sidebar/LeftSideBar";
import SearchBar from "./components/search-bar/SearchBar";
import TodosDashboard from "./components/task-lists/TodosDashboard";
import { useEffect, useState } from "react";
import { getAllTodo } from "./utils/TodoFetching";

export type Todo = {
  _id: string;
  task: string;
  completed: boolean;
  priority: string;
  category: string;
  dueDate: Date;
  createdAt: Date
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [sortedBy, setSortedBy] = useState("created")

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const fetchAllTodo = async () => {
    const { data } = await getAllTodo();
    setTodos(data);
  };

  return (
    <div className="bg-[#e1e7ff] h-full">
      <Toaster position={"bottom-right"} />
      <Header />
      <StatsDashboard todos={todos} />
      <div className="flex justify-center gap-10">
        <LeftSideBar
          todos={todos}
          setTodos={setTodos}
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="flex flex-col gap-5 w-[59%] items-center">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortedBy={setSortedBy}/>
          <TodosDashboard
            activeFilters={activeFilter}
            todos={todos}
            activeCategory={activeCategory}
            setTodos={setTodos}
            searchQuery={searchQuery}
            sortedBy={sortedBy}

          />
        </div>
      </div>
    </div>
  );
};

export default App;
