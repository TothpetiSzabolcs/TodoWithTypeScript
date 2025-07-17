import { IoSearchOutline } from "react-icons/io5";

type Props = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setSortedBy: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({searchQuery, setSearchQuery, setSortedBy}: Props) => {
  
  return (
    <>
      <div className="w-full flex gap-5 h-20 items-center justify-center p-6 bg-white shadow-lg rounded-xl">
        <div className="w-full relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
            <IoSearchOutline size={25} />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          ></input>
        </div>
        <div className="flex flex-1 gap-5">
          <select
            name=""
            id=""
            onChange={(e) => setSortedBy(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="created">Sort by Created</option>
            <option value="priority">Sort by Priority</option>
            <option value="category">Sort by Category</option>
            <option value="task">Sort by Task</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
