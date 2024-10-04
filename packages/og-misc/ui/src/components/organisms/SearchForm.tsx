import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "../atoms/SearchInput";
import { SearchResult } from "../atoms/SearchResult";
import { Item } from "../../viewmodels/item";

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState<Item[]>([]);

  useEffect(() => {
    setSearchItems([
      { name: "Apple", tags: ["fruit"] },
      { name: "Banana", tags: ["fruit"] },
      { name: "Carrot", tags: ["vegetable"] },
      { name: "Donut", tags: ["sweets"] },
    ]);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) {
      return searchItems;
    }
    return searchItems.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, searchItems]);

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <section>
      <SearchInput searchQuery={searchQuery} onSearch={handleSearch} />
      <SearchResult results={filteredItems} />
    </section>
  );
};
