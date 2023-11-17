import { useEffect, useState } from "react";

async function fetchVerse() {
  const url = "products.json";
  const response = await fetch(url);
  return response.json();
}

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    (async () => {
      const newData = await fetchVerse();
      setData(newData);
      setFilteredData(newData);
    })();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let newTypeFilter = data;
    if (event.target.elements.selectType.value !== "All") {
      newTypeFilter = data.filter(
        (d) => d.type === event.target.elements.selectType.value
      );
    }
    const keyWord = newTypeFilter.filter((d) => {
      return d.name.match(event.target.elements.keyWord.value) !== null;
    });
    setFilteredData(keyWord);
  }

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category" name="selectType">
                <option value="All">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g. beans"
                name="keyWord"
              />
            </div>
            <div>
              <button>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {filteredData.length === 0 ? (
            <p>No results to display!</p>
          ) : (
            filteredData.map((d) => {
              return (
                <section className={d.type} key={d.name}>
                  <h2>{d.name}</h2>
                  <p>${d.price}</p>
                  <img src={"images/" + d.image} />
                </section>
              );
            })
          )}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
