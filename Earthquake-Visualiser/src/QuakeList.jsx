// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MapContainer, Marker, TileLayer, Popup,FeatureGroup,Circle,Rectangle,CircleMarker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { FaSortAmountDown } from "react-icons/fa";
// import { FaSortAmountDownAlt } from "react-icons/fa";
// import { circleMarker } from "leaflet";
// import Legend from "./Legend.jsx"

// export default function QuakeList() {
//   const [quakes, setQuakes] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showData, setShowData] = useState(false);
//   const [asc, setAsc] = useState(false);
//   const redOptions={color:"red"}

//   const fetchQuakes = async () => {
//     try {
//       const res = await axios.get(
//         "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
//       );
//       setQuakes(res.data.features);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuakes();
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row md:h-screen bg-gray-100">
//       {/* Left Panel */}
//       <div className=" w-full max-h-[60vh] md:w-1/2 md:order-1 order-2 p-6 overflow-y-auto md:max-h-full ">
//         {loading && (
//           <div className="flex items-center gap-2 text-blue-500">
//             <AiOutlineLoading3Quarters className="animate-spin" />
//             <span>Loading Earthquake Data...</span>
//           </div>
//         )}

//         {error && <p className="text-red-500">{error}</p>}

//         {/* Buttons */}
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => setShowData(!showData)}
//             className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded shadow"
//           >
//             {showData ? "Hide Data" : "Show Data"}
//           </button>

//           {showData && (
//             <button
//               onClick={() => setAsc(!asc)}
//               className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded flex items-center gap-2 shadow"
//             >
//         { asc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />
//     }
//               {asc ? "Sort Desc" : "Sort Asc"}
//             </button>
//           )}
//         </div>

//         {/* Earthquake List */}
//         {showData && (
//           <ul className="space-y-3 ">
//             {[...quakes]
//               .sort((a, b) =>
//                 asc
//                   ? a.properties.mag - b.properties.mag
//                   : b.properties.mag - a.properties.mag
//               )
//               .map((quake) => (
//                 <li
//                   key={quake.id}
//                   className="bg-white p-4 rounded shadow flex justify-between items-center hover:bg-gray-50 transition"
//                 >
//                   <span className="font-medium">{quake.properties.place}</span>
//                   <span className="font-bold text-blue-600">
//                     {quake.properties.mag}
//                   </span>
//                 </li>
//               ))}
//           </ul>
//         )}
//       </div>

//       {/* /* Right part for Map */ }
//       <div className="w-full h-[40vh] md:w-1/2 md:h-full md:order-2 order-1">
//         <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {quakes.map((quake) => {
//             const [lon, lat] = quake.geometry.coordinates;
//             return ( 
//                 <CircleMarker
//                     key={quake.id} center={[lat, lon]} radius={quake.properties.mag*2}
//                     pathOptions={{color:quake.properties.mag>5?"red":"green",
//                     fillColor:quake.properties.mag>5?"red":"green",
//                     fillOpacity:0.6
//                 }}
//                 >
//                 <Popup>
//                   <span className="font-semibold">
//                     {quake.properties.place}
//                   </span>
//                   <br />
//                   Magnitude: {quake.properties.mag}
//                 </Popup>
//                 </CircleMarker>
//             );
//           })}
//           <Legend/>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import Legend from "./Legend.jsx";

export default function QuakeList() {
  const [quakes, setQuakes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(false);
  const [asc, setAsc] = useState(false);

  const fetchQuakes = async () => {
    try {
      const res = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      setQuakes(res.data.features);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuakes();
  }, []);

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/2 h-full p-6 overflow-y-auto">
        {loading && (
          <div className="flex items-center gap-2 text-blue-500">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <span>Loading Earthquake Data...</span>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {/* Buttons */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowData(!showData)}
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded shadow"
          >
            {showData ? "Hide Data" : "Show Data"}
          </button>

          {showData && (
            <button
              onClick={() => setAsc(!asc)}
              className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded flex items-center gap-2 shadow"
            >
              {asc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
              {asc ? "Sort Desc" : "Sort Asc"}
            </button>
          )}
        </div>

        {/* Earthquake List */}
        {showData && (
          <ul className="space-y-3">
            {[...quakes]
              .sort((a, b) =>
                asc
                  ? a.properties.mag - b.properties.mag
                  : b.properties.mag - a.properties.mag
              )
              .map((quake) => (
                <li
                  key={quake.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-medium">{quake.properties.place}</span>
                  <span className="font-bold text-blue-600">
                    {quake.properties.mag}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Right Panel (Map) */}
      <div className="w-1/2 h-full">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {quakes.map((quake) => {
            const [lon, lat] = quake.geometry.coordinates;
            return (
              <CircleMarker
                key={quake.id}
                center={[lat, lon]}
                radius={quake.properties.mag * 2}
                pathOptions={{
                  color: quake.properties.mag > 5 ? "red" : "green",
                  fillColor: quake.properties.mag > 5 ? "red" : "green",
                  fillOpacity: 0.6
                }}
              >
                <Popup>
                  <span className="font-semibold">{quake.properties.place}</span>
                  <br />
                  Magnitude: {quake.properties.mag}
                </Popup>
              </CircleMarker>
            );
          })}
          <Legend />
        </MapContainer>
      </div>
    </div>
  );
}



