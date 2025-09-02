import React,{useState,useEffect} from "react";
import axios from "axios"
import {MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
// import { MapBox } from "./MapBox";

export default function QuakeList (){
    const[quakes,setQuakes]=useState([])
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true)

    const fetchQuakes = async ()=>{
        try {
            const res=await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
            console.log(res.data.features)
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
        <div>
            {/* <h2>Test Earthquake Data:</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                { quakes.map((quake)=>(
                    <li key={quake.id}>{quake.properties.place}-{quake.properties.time}</li>
                ))
                }
            </ul> */}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                <MapContainer center={[20, 0]} zoom={2} >
                <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />

                 {quakes.map((quake)=>{
                    const [lon,lat]=quake.geometry.coordinates
                    return(
                        <Marker key ={quake.id} position={[lat,lon]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    )     
                })}
                
        </MapContainer>
                
            </ul>
            
            
        </div>
    )
}



