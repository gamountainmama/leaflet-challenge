// create the map
const myMap = L.map('map', {
    center: [39.829103919622966, -98.57947970000001],
    zoom: 5
});

// add a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

// create a marker (just for fun!!!)
var marker = L.marker([34.86203568439478, -84.07681774444292], {
    title: 'Love Shack'
}).addTo(myMap)

// add a popup to the marker
marker.bindPopup('This is where Carol lives.')

// read in the GeoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
var data = d3.json(url).then(function(data){
    console.log(data);

    var features = data.features;
    console.log(features);

    // create a list for the coordinates
    var latitudes = features.map(d => d.geometry.coordinates[0])
    console.log(latitudes);

    var longitudes = features.map(d => d.geometry.coordinates[1])
    console.log(longitudes);

    // create a list for the magnitudes
    var magnitudes = features.map(d => d.properties.mag)
    console.log(magnitudes);

    // create a list for the depths
    var depths = features.map(d => d.geometry.coordinates[2])
    console.log(depths);

    // combine lists
    let info = [];
    for (i = 0; i < latitudes.length; i++) {
        info.push({'latitude': latitudes[i], 'longitude': longitudes[i], 'depth': depths[i], 'magnitude': magnitudes[i]})
    }
    console.log(info)

    // create circles for each earthquake
    for (var j = 0; j < info.length; j++) {
        var marker = info[j];
        console.log(marker)
        L.circle([marker.latitude, marker.longitude],{radius: 100000*marker.magnitude, color: marker.depth}).addTo(myMap)
    }
});