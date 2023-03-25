// create the map
const myMap = L.map('map', {
    center: [39.829103919622966, -98.57947970000001],
    zoom: 3.5,
    layer: [street, overlayMaps]
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a marker (just for fun!!!)
var marker = L.marker([34.86203568439478, -84.07681774444292], {title: 'Love Shack'}).addTo(myMap)

// add a popup to the marker
marker.bindPopup('This is where I live.')

// arrays that will hold the circle markers
var hourCircles = [];
var dayCircles = [];
var weekCircles = [];
var monthCircles = [];

// Create four separate layer groups, one for each time frame.
var hourLayer = L.layerGroup(hourCircles);
var dayLayer = L.layerGroup(dayCircles);
var weekLayer = L.layerGroup(weekCircles);
var monthLayer = L.layerGroup(monthCircles);
console.log(hourCircles)

// Create an overlay object.
var overlayMaps = {
    'Earthquakes in the past hour': hourLayer,
    'Earthquakes in the past 24 hours': dayLayer,
    'Earthquakes in the past 7 days': weekLayer,
    'Earthquakes in the past 30 days': monthLayer
  };

// overlay selection links
var links = [
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
];

// create circles for earthquakes in the past hour
var data = d3.json(links[0]).then(function(data) {
    features = data.features;
    console.log(features)

    for (var j = 0; j < features.length; j++) {
        geometry = features[j].geometry;
        coordinates = geometry.coordinates;
        longitude = coordinates[0];
        latitude = coordinates[1];
        depth = coordinates[2];
        properties = features[j].properties;
        magnitude = properties.mag;
        
        hourCircles.push(
        L.circle([latitude, longitude], {
            radius: 10000*magnitude,
            color: circleColor(depth),
            fillColor: circleColor(depth),
            fillOpacity: 0.5,
            weight: 0.5
            }).bindPopup(`<h1>Magnitude ${magnitude}</h1><h2>Depth: ${depth}</h2><hr><h3>Lat: ${parseFloat(latitude).toFixed(2)}, Long: ${parseFloat(longitude).toFixed(2)}</h3>`)
        )
    }
})

// create circles for earthquakes in the past day
var data = d3.json(links[1]).then(function(data) {
    features = data.features;
    console.log(features)

    for (var j = 0; j < features.length; j++) {
        geometry = features[j].geometry;
        coordinates = geometry.coordinates;
        longitude = coordinates[0];
        latitude = coordinates[1];
        depth = coordinates[2];
        properties = features[j].properties;
        magnitude = properties.mag;
        
        dayCircles.push(
        L.circle([latitude, longitude], {
            radius: 10000*magnitude,
            color: circleColor(depth),
            fillColor: circleColor(depth),
            fillOpacity: 0.5,
            weight: 0.5
            }).bindPopup(`<h1>Magnitude ${magnitude}</h1><h2>Depth: ${depth}</h2><hr><h3>Lat: ${parseFloat(latitude).toFixed(2)}, Long: ${parseFloat(longitude).toFixed(2)}</h3>`)
        )
    }
})

// create circles for earthquakes in the past week
var data = d3.json(links[2]).then(function(data) {
    features = data.features;
    console.log(features)

    for (var j = 0; j < features.length; j++) {
        geometry = features[j].geometry;
        coordinates = geometry.coordinates;
        longitude = coordinates[0];
        latitude = coordinates[1];
        depth = coordinates[2];
        properties = features[j].properties;
        magnitude = properties.mag;
        
        weekCircles.push(
        L.circle([latitude, longitude], {
            radius: 10000*magnitude,
            color: circleColor(depth),
            fillColor: circleColor(depth),
            fillOpacity: 0.5,
            weight: 0.5
            }).bindPopup(`<h1>Magnitude ${magnitude}</h1><h2>Depth: ${depth}</h2><hr><h3>Lat: ${parseFloat(latitude).toFixed(2)}, Long: ${parseFloat(longitude).toFixed(2)}</h3>`)
        )
    }
})

// create circles for earthquakes in the past month
var data = d3.json(links[2]).then(function(data) {
    features = data.features;
    console.log(features)

    for (var j = 0; j < features.length; j++) {
        geometry = features[j].geometry;
        coordinates = geometry.coordinates;
        longitude = coordinates[0];
        latitude = coordinates[1];
        depth = coordinates[2];
        properties = features[j].properties;
        magnitude = properties.mag;
        
        monthCircles.push(
        L.circle([latitude, longitude], {
            radius: 10000*magnitude,
            color: circleColor(depth),
            fillColor: circleColor(depth),
            fillOpacity: 0.5,
            weight: 0.5
            }).bindPopup(`<h1>Magnitude ${magnitude}</h1><h2>Depth: ${depth}</h2><hr><h3>Lat: ${parseFloat(latitude).toFixed(2)}, Long: ${parseFloat(longitude).toFixed(2)}</h3>`)
        )
    }
})

// create function to color the circles by depth
function circleColor(depth) {
    if (depth <= 10) return 'green'
    else if (depth <= 30) return 'yellow'
    else if (depth <= 50) return 'beige'
    else if (depth <= 70) return 'orange'
    else if (depth <= 90) return 'pink'
    else if (depth > 90) return 'red'
    else return 'black'
};

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

// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

// add a legend
var legend = L.control({position: "bottomright"});

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: green"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: beige"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: pink"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>90+</span><br>';
  

  return div;
};

legend.addTo(map);