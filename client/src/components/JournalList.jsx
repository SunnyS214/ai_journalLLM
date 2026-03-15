// import { useState } from "react";
// import API from "../api";

// function JournalList({ entries }) {

//   const [analysis, setAnalysis] = useState({});

//   const handleAnalyze = async (entry) => {

//     try {

//       const res = await API.post("/journal/analyze", {
//         text: entry.text
//       });

//       setAnalysis((prev) => ({
//         ...prev,
//         [entry._id]: res.data.analysis
//       }));

//     } catch (error) {
//       console.error("Emotion analysis failed", error);
//     }

//   };

//   return (

//     <div className="mt-8">

//       <h2 className="text-2xl font-semibold mb-4">
//         Previous Entries
//       </h2>

//       <div className="space-y-4">

//         {entries.map((entry) => (

//           <div
//             key={entry._id}
//             className="bg-white/5 border border-gray-600 rounded-lg p-4 shadow-sm"
//           >

//             <p className="text-gray-200 mb-2">
//               {entry.text}
//             </p>

//             <small className="text-gray-400 block mb-3">
//               Ambience: {entry.ambience}
//             </small>

//             {entry.emotion && (
//               <p className="text-green-400 mb-2">
//                 Emotion: {entry.emotion}
//               </p>
//             )}

//             <button
//               onClick={() => handleAnalyze(entry)}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
//             >
//               Analyze Emotion
//             </button>

//             {analysis[entry._id] && (
//               <div className="mt-3 text-sm text-gray-300">
//                 <strong>Analysis:</strong>
//                 <pre className="whitespace-pre-wrap">
//                   {analysis[entry._id]}
//                 </pre>
//               </div>
//             )}

//           </div>

//         ))}

//       </div>

//     </div>

//   );

// }

// export default JournalList;























import { useState } from "react";
import API from "../api";

function JournalList({ entries }) {

  const [analysis, setAnalysis] = useState({});

  const handleAnalyze = async (entry) => {

    try {

      const res = await API.post("/journal/analyze", {
        text: entry.text
      });

      // save result for this specific entry
      setAnalysis((prev) => ({
        ...prev,
        [entry._id]: res.data
      }));

    } catch (error) {
      console.error("Emotion analysis failed", error);
    }

  };

  return (

    <div className="mt-8">

      <h2 className="text-2xl font-semibold mb-4 text-white">
        Previous Entries
      </h2>

      <div className="space-y-4">

        {entries.map((entry) => (

          <div
            key={entry._id}
            className="bg-white/5 border border-gray-600 rounded-lg p-4 shadow-sm"
          >

            <p className="text-gray-200 mb-2">
              {entry.text}
            </p>

            <small className="text-gray-400 block mb-3">
              Ambience: {entry.ambience}
            </small>

            {entry.emotion && (
              <p className="text-green-400 mb-2">
                Emotion: {entry.emotion}
              </p>
            )}

            <button
              onClick={() => handleAnalyze(entry)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              Analyze Emotion
            </button>

            {analysis[entry._id] && (
              <div className="mt-3 text-sm text-gray-300 space-y-1">

                <p>
                  <span className="font-semibold">Emotion:</span>{" "}
                  {analysis[entry._id].emotion}
                </p>

                <p>
                  <span className="font-semibold">Keywords:</span>{" "}
                  {analysis[entry._id].keywords?.join(", ")}
                </p>

                <p>
                  <span className="font-semibold">Summary:</span>{" "}
                  {analysis[entry._id].summary}
                </p>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default JournalList;