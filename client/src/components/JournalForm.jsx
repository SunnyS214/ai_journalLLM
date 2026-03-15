import { useState } from "react";
import API from "../api";

function JournalForm({ onEntryCreated }) {

  const [text, setText] = useState("");
  const [ambience, setAmbience] = useState("forest");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: "123",
      ambience,
      text
    };

    const res = await API.post("/journal", data);

    setText("");
    onEntryCreated(res.data);
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-gray-600 rounded-lg p-6 shadow-sm"
    >

      <h2 className="text-2xl font-semibold mb-4 text-white">
        Write Journal
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        rows="4"
        className="w-full p-3 rounded-md bg-slate-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center justify-between mt-4">

        <select
          value={ambience}
          onChange={(e) => setAmbience(e.target.value)}
          className="bg-slate-800 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none"
        >
          <option value="forest">Forest</option>
          <option value="ocean">Ocean</option>
          <option value="mountain">Mountain</option>
        </select>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Save Entry
        </button>

      </div>

    </form>

  );

}

export default JournalForm;