import { useEffect, useState } from "react";
import API from "./api";

import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import Insights from "./components/Insights";

function App() {

  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);

  const userId = "123";

  const fetchEntries = async () => {
    try {

      const res = await API.get(`/journal/${userId}`);
      setEntries(res.data);

    } catch (error) {
      console.error("Failed to fetch entries", error);
    }
  };

  const fetchInsights = async () => {
    try {

      const res = await API.get(`/journal/insights/${userId}`);
      setInsights(res.data);

    } catch (error) {
      console.error("Failed to fetch insights", error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchInsights();
  }, []);

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          AI Journal
        </h1>

        <JournalForm onEntryCreated={fetchEntries} />

        <JournalList entries={entries} />

        <div className="text-center">

          <button
            onClick={fetchInsights}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition"
          >
            Refresh Insights
          </button>

        </div>

        <Insights insights={insights} />

      </div>

    </div>

  );
}

export default App;