// create the map
const myMap = L.map('map', {
    center: [39.829103919622966, -98.57947970000001],
    zoom: 3.5,
    layer: [street, overlayMaps]
});

// Define variables for our tile layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Only one base layer can be shown at a time.
var baseMaps = {
  Street: street,
  Topography: topo
};

// Create four separate layer groups: one for each time frame.
var hour = L.layerGroup(hourCircles);
var day = L.layerGroup(dayCircles);
var week = L.layerGroup(weekCircles);
var month = L.layerGroup(monthCircles);

// Create an overlay object.
var overlayMaps = {
    'All earthquakes in the past hour': hour,
    'All earthquakes in the past day': day,
    'All earthquakes in the past week': week,
    'All earthquakes in the past month': month
  };

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a marker (just for fun!!!)
    var marker = L.marker([34.86203568439478, -84.07681774444292], {title: 'Love Shack'}).addTo(myMap)

// add a popup to the marker
    marker.bindPopup('This is where I live.')

// link to the GeoJSON data.
var link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

var timeCircles = [{hourCircles}, {dayCircles}, {weekCircles}, {monthCircles}]
var hourCircles = [];
var dayCircles = [];
var weekCircles = [];
var monthCircles = [];

// map selection options
var links = [
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
];

// retrieve the data from USGS GeoJSON
for (i = 0; i < links.length; i++) {
    var data = d3.json(links[i]).then(function(data) {
        features = data.features;
        console.log(features)

        for (j = 0; j < features.length; j++) {
            geometry = features[j].geometry;
            coordinates = geometry.coordinates;
            console.log(coordinates[0])
        }
    })
}

// // retrieves the data from the USGS GeoJSON
// for (x = 0; x < links.length; x++) {

// var data = d3.json(links[x]).then(function(data) {
//     console.log(data);

//     var features = data.features;

//     // create lists for the latitude and longitude
//     var latitudes = features.map(d => d.geometry.coordinates[1])
//     var longitudes = features.map(d => d.geometry.coordinates[0])

//     // create a list for the magnitudes
//     var magnitudes = features.map(d => d.properties.mag)

//     // create a list for the depths
//     var depths = features.map(d => d.geometry.coordinates[2])

//     // combine lists
//     let info = [];
//     for (i = 0; i < latitudes.length; i++) {
//         info.push({'latitude': latitudes[i], 
//         'longitude': longitudes[i], 
//         'depth': depths[i], 
//         'magnitude': magnitudes[i]})
//     }

//     // create a circle for each earthquake
//     for (var j = 0; j < info.length; j++) {
//         var circle = info[j];
//         timeCircles[x].push(L.circle([circle.latitude, circle.longitude],{
//             radius: 10000*circle.magnitude,
//             color:  circleColor(circle.depth),
//             fillColor: circleColor(circle.depth),
//             fillOpacity: 0.5,
//             weight: 0.5
//         }).bindPopup(`<h1>Magnitude ${circle.magnitude}</h1><h2>Depth: ${circle.depth} km</h2><hr><h3>Lat: ${parseFloat(circle.latitude).toFixed(2)}, Long: ${parseFloat(circle.longitude).toFixed(2)}</h3>`).addTo(myMap));
//     }
//     });
// };
// // create function to color boroughs
// function circleColor(depth) {
//     if (depth <= 10) return 'green'
//     else if (depth <= 30) return 'yellow'
//     else if (depth <= 50) return 'beige'
//     else if (depth <= 70) return 'orange'
//     else if (depth <= 90) return 'pink'
//     else if (depth > 90) return 'red'
//     else return 'black'
// };

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);