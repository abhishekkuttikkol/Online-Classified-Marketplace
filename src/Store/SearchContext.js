import { createContext, useState } from "react";

export const SearchCategory = createContext(null);

export default function SearchContext({ children }) {
  const [searchTerm, SetSearchTerm] = useState();

  return (
    <SearchCategory.Provider value={{ searchTerm, SetSearchTerm }}>
      {children}
    </SearchCategory.Provider>
  );
}
