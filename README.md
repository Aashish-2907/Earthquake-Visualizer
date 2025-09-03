Earthquake-Visualiser
A React-based web application to visualize real-time earthquake data on a map. The project fetches earthquake data from the USGS Earthquake API and displays it interactively using Leaflet.js.

🛠 Tech Stack
Frontend: React
HTTP Requests: Axios
Map Visualization: Leaflet.js
Styling: Tailwind CSS
Build Tool: Vite
🌐 Features
Fetches real-time earthquake data from USGS.
Displays earthquake locations on an interactive map.
Each earthquake marker shows magnitude and location.
Responsive UI built with Tailwind CSS.
📁 Project Structure
Earthquake-Visualiser/ │ ├── node_modules/ ├── public/ ├── src/ │ ├── components/ # React components │ ├── App.jsx # Main app component │ ├── main.jsx # Entry point │ └── index.css # Tailwind CSS styles ├── package.json ├── package-lock.json ├── vite.config.js └── README.md

🚀 Installation
Clone the repository:
git clone <your-repo-url>
cd Earthquake-Visualiser

2. Install dependencies:

npm install

🏃‍♂️ Running Locally

Start the development server:

npm run dev


Open your browser and navigate to the URL provided in the terminal (usually http://localhost:5173).

⚡ Build for Production

To create a production build:

npm run build


Preview the production build locally:

npm run preview

📌 Usage

Open the application in your browser.

Explore the interactive map showing earthquake locations.

Click on markers to see details like magnitude and location.

📜 API Reference

USGS Earthquake API:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

💻 License

This project is licensed under the MIT License.
