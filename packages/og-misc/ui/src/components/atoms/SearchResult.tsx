import { Item, ItemAction } from "../../viewmodels/item";

interface SearchResultProps {
  results: Item[];
}

export const SearchResult = ({ results }: SearchResultProps) => {
  function isNonResult(): boolean {
    return results.length === 0;
  }

  const selectedItemHandler = (name: string) => {
    console.log(name + " selected");
  };

  return (
    <>
      {isNonResult() ? (
        <div>No results found</div>
      ) : (
        <section>
          {results.map((result, idx) => (
            <SearchResult.Item
              key={`search-result-item-${idx}`}
              name={result.name}
              tags={result.tags}
              selectItem={selectedItemHandler}
            />
          ))}
        </section>
      )}
    </>
  );
};

SearchResult.Item = ({ name, tags, selectItem }: Item & ItemAction) => {
  return (
    <div className="item" onClick={() => selectItem(name)}>
      <h4>{name}</h4>
      <p>{tags.join(", ")}</p>
    </div>
  );
};
