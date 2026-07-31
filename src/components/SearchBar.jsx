import { FaSearch } from "react-icons/fa";
import "../styles/search.css";

function SearchBar({ search, setSearch }) {

    return (

        <div className="search-container">

            <FaSearch className="search-icon"/>

            <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

        </div>

    );

}

export default SearchBar;
