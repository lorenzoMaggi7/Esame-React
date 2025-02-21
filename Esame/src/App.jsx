import React, { useState, useEffect } from "react";

const App = () => {
  const [table, setTable] = useState("persona");
  const [allData, setAllData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/database.json");
      if (!response.ok)
        throw new Error("Errore nel caricamento del file JSON");
      const jsonData = await response.json();
      setAllData(jsonData); // Salva tutti i dati
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadData();
  }, []);


  const handleReloadData = () => {
    console.log("Carica Dati button clicked");
    loadData();
  };

  const data = allData[table] || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center p-5">
      <header className="bg-black bg-opacity-50 p-5 rounded-lg">
        <h1 className="text-3xl font-bold">Benvenuto nell'Accademia</h1>
        <nav className="mt-4">
          <ul className="flex justify-center gap-5">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                Chi Siamo
              </a>
            </li>
            <li>
              <a href="#tables" className="hover:underline">
                Dati
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section
        id="about"
        className="mt-10 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold">Chi Siamo</h2>
        <p className="mt-2">
          L'Accademia offre corsi di formazione di alta qualità per gli
          studenti desiderosi di apprendere nuove competenze.
        </p>
      </section>

      <section
        id="tables"
        className="mt-10 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold">Consulta i Dati</h2>
        <div className="mt-4">
          <label className="mr-2">Scegli una tabella:</label>
          <select
            className="p-2 rounded text-black"
            value={table}
            onChange={(e) => setTable(e.target.value)}
          >
            <option value="persona">Persone</option>
            <option value="assenza">Assenze</option>
            <option value="wp">WP</option>
          </select>
        </div>

        <button
          onClick={handleReloadData}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          {loading ? "Caricamento..." : "Carica Dati"}
        </button>

        {loading && <p className="mt-4">Caricamento dati...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {!loading && !error && data.length > 0 && (
          <table className="mt-6 w-full border-collapse border border-white">
            <thead>
              <tr className="bg-blue-600">
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border border-white p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-white text-black">
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border border-gray-300 p-2">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : JSON.stringify(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && data.length === 0 && (
          <p className="mt-4">Nessun dato disponibile per questa tabella.</p>
        )}
      </section>

      <footer className="mt-10 p-5 bg-black bg-opacity-50 rounded-lg">
        <p>&copy; 2025 Accademia. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default App;
