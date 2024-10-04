import { useState } from "react";

type SearchProps = {
  searchQuery: string;
  onSearch: (searchQuery: string) => void;
};

export const SearchInput = ({ searchQuery, onSearch }: SearchProps) => {
  const [v, setV] = useState(searchQuery);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search Item..."
        value={v}
        onChange={(e) => {
          setV(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};
