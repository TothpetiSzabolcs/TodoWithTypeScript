import CreatingForm from "./CreatingForm";
import { Todo } from "../../App";
import Filters from "./Filters";
import Categories from "./Categories";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
  activeCategory: string,
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
};

const LeftSideBar = ({ todos, setTodos, setActiveFilter, activeFilter, activeCategory, setActiveCategory }: Props) => {
  return (
    <div className="w-[18%] flex flex-col gap-4">
      <div className="shadow-lg bg-white rounded-xl">
        <CreatingForm todos={todos} setTodos={setTodos}/>
      </div>

      <div className="shadow-lg bg-white rounded-xl">
        <Filters
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className="shadow-lg bg-white rounded-xl">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} setActiveFilter={setActiveFilter}/>
      </div>
    </div>
  );
};

export default LeftSideBar;
