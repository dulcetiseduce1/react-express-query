import { useEffect, useState } from "react";

function App() {
  // Custom Hook
  const { search, animals } = useAnimalSearch();

  // UI
  return (
    <main>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="Search Animal"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}
        {animals.lenght === 0 && "No animals found"}
      </ul>
    </main>
  );
}

// componente animal
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong>
      {name}({age} years old)
    </li>
  );
}

//custom Hook
function useAnimalSearch() {
  //animal state dell'array vuoto
  const [animals, setAnimals] = useState([]);

  //caching ricerche
  useEffect(() => {
    //il browser ha uan localStorageAPI noi prenderemo l'item lastQuery l'ultima cosa che l'utente scrive nel form
    const lastQuery = localStorage.getItem("lastQuery");
    // search prenderà quel valore
    search(lastQuery);
    // dirà a useeffect di runnare la function una volta al mount
  }, []);

  // funzione search con async che prende una query come argument
  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" +
        // formatta testo in q=testo
        new URLSearchParams({ q })
    );
    //convert response in json
    const data = await response.json();
    //set dello state su componente animals
    setAnimals(data);
    // i risultati saranno rilevanti a quello che viene salvato in lastQuery (la ricerca)
    localStorage.setItem("lastQuery", q);
  };
  return { search, animals };
}
export default App;
