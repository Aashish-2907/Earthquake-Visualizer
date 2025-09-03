import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "topright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend bg-white p-3 rounded shadow text-sm");
      div.innerHTML = `
        <h4 class="font-bold mb-2">Magnitude Scale</h4>
        <div><i style="background:red;width:14px;height:14px;display:inline-block;margin-right:6px;border-radius:50%;"></i> > 5.0</div>
        <div><i style="background:green;width:14px;height:14px;display:inline-block;margin-right:6px;border-radius:50%;"></i> ≤ 5.0</div>
        <br/>
        <div class="text-xs text-gray-600">Circle size = magnitude × 2</div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

//  export default Legend