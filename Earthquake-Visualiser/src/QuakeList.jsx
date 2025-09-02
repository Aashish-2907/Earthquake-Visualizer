import React,{useState,useEffect} from "react";
import axios from "axios"
import {MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSortAmountDown } from "react-icons/fa";
// import { MapBox } from "./MapBox";

export default function QuakeList (){
    const[quakes,setQuakes]=useState([])
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true)
    const [showData,setshowData]=useState(false);
    const [asc,setAsc]=useState(false);

    const fetchQuakes = async ()=>{
        try {
            const res=await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
            // console.log(res.data.features)
            setQuakes(res.data.features);
        } catch (error) {
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect (()=>{
     fetchQuakes();   
    },[])

  
    return(
            <div className="flex">
                 <div className="w-1/2 p-4">
                    {loading && <AiOutlineLoading3Quarters />}
                    {error && <p className="text-red-500">{error}</p>}
                    <button  onClick={()=>{setshowData(!showData);}} className="bg-blue-500 text-white px-6 py-4 rounded cursor-pointer">
                        {showData ? "Hide Data" : "Show Data"}
                    </button>
                    {showData && (
                    <button 
                         onClick={() => setAsc(!asc)} 
                         className="ml-4 bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                    <FaSortAmountDown />
                     {asc ? "Sort Desc" : "Sort Asc"}
                    </button>
                    
                    )}
                    <ul className="space-y-4 mt-4">
                    {showData && 
                    [...quakes]
                     .sort((a, b) => asc ? a.properties.mag - b.properties.mag : b.properties.mag - a.properties.mag)
                    .map((quake) => (
                    <li key={quake.id}>
                    {quake.properties.place} - 
                    <span className="mx-8 font-bold">Magnitude:</span> 
                    {quake.properties.mag}
                     </li>
      ))
  }
</ul>
                     <ul className="space-y-4">
                        { showData && quakes.map((quake)=>(
                            <li key={quake.id} >
                                {quake.properties.place}- <span className="mx-8 font-bold">Magnitude:</span>{quake.properties.mag}
                                {/* {showData && <FaSortAmountDown/>} */}
                            </li>
                            
                    ))}
                      
                     </ul>
         
            </div>
            {loading && <AiOutlineLoading3Quarters />}
            {error && <p>{error}</p>}
            <div className="w-1/2 h-screen">
                <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
                <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />

                 {quakes.map((quake)=>{
                    const [lon,lat]=quake.geometry.coordinates
                    return(
                        <Marker key ={quake.id} position={[lat,lon]}>
                            <Popup>
                                Shock of Magnitude:{quake.properties.mag}
                            </Popup>
                        </Marker>
                    )     
                })}         
        </MapContainer> 
            </div>
        </div>                       
    );
}



