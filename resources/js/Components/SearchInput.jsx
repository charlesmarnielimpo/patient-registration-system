import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = ({ search, setSearch, ...props }) => {
    return (
        <div className="relative flex w-full max-w-xl justify-start sm:max-w-sm md:max-w-xs">
            <Input
                className="!pl-9"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                {...props}
            />

            <SearchIcon
                size={16}
                className="absolute left-3 top-[11px] z-10 text-gray-400 dark:text-gray-500"
            />
        </div>
    );
};

export default SearchInput;
