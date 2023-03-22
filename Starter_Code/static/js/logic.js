// create the map
const myMap = L.map('map', {
    center: [39.829103919622966, -98.57947970000001],
    zoom: 4
});

// populate the map selection options for the dropdown menu
const choices = [
    {'choice': 'all earthquakes in the past hour',
    'url': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'},
    {'choice': 'all earthquakes in the past 24 hours',
    'url': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'},
    {'choice': 'all earthquakes in the past 7 days',
    'url': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'},
    {'choice': 'all earthquakes in the past 30 days',
    'url': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'}
];

var names = choices.map(d => d.choice);
console.log(names);

var urls = choices.map(d => d.url)
console.log(urls)

// populate the dropdown menu
var dropdown = d3.select('#selDataset');
names.forEach(function(name){dropdown.append('option').text(name).property('value')});

// define the function for the dropdown menu
function optionChanged(mapChoice) {
    choice = choices.filter(d => d.choice == mapChoice)
    url = choice[0].url
    console.log(url)
    redraw(url);
}

// identify the initial value for the initial plots and info
var init_id = urls[0]
console.log(init_id)

function redraw(url) {
    // removes previous map layers
    myMap.eachLayer((layer) => { layer. remove(); });

    // add a tile layer
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(myMap);

    //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //maxZoom: 15, 
        //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //}).addTo(myMap);

    // create a marker (just for fun!!!)
    var marker = L.marker([34.86203568439478, -84.07681774444292], {title: 'Love Shack'}).addTo(myMap)

    // add a popup to the marker
    marker.bindPopup('This is where I live.')
    
    // retrieves the data from the USGS GeoJSON
    var data = d3.json(url).then(function(data){
        console.log(data);

        var features = data.features;

        // create lists for the latitude and longitude
        var latitudes = features.map(d => d.geometry.coordinates[1])

        var longitudes = features.map(d => d.geometry.coordinates[0])

        // create a list for the magnitudes
        var magnitudes = features.map(d => d.properties.mag)

        // create a list for the depths
        var depths = features.map(d => d.geometry.coordinates[2])

        // combine lists
        let info = [];
        for (i = 0; i < latitudes.length; i++) {
            info.push({'latitude': latitudes[i], 
            'longitude': longitudes[i], 
            'depth': depths[i], 
            'magnitude': magnitudes[i]})
        }

        // NEED TO REMOVE OLD CIRCLES
        if (myMap.hasLayer(circle)) {
            myMap.removeLayer(circle);
        }

        // create a circle for each earthquake
        // NEED TO COLOR MAP CIRCLES
        // NEED TO CREATE HOVER AND CLICK FUNCTIONS
        for (var j = 0; j < info.length; j++) {
            var circle = info[j];
            L.circle([circle.latitude, circle.longitude],{
                radius: 10000*circle.magnitude, 
                color: 'red',
                interactive:true,
                click: 'Hi'
            }).addTo(myMap)
        }
    })};

redraw(init_id);