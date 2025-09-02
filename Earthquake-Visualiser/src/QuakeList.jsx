import React,{useState,useEffect} from "react";
import axios from "axios"

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
    const position = [51.505, -0.09]
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
            
        </div>
    )
}



