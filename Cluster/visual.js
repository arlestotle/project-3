const url = "http://127.0.0.1:5000/"

d3.json(url).then(function(rawData){

function grabbin(open, clos){

  for (let i = 0; i < open.length; i++) {

    row = open[i];

    // Will add persons name and age but needs formating 
    
  
    clos.push([[row.Latitude, row.Longitude], row["Person Name"], row["Missing Age"], row["Missing From"]]); 
  }

}

function count(loc,town){
  let count = 0
  for (let y = 0; y < loc.length; y++){
    if (loc[y][0][0] == town[0] && loc[y][0][1] == town[1]){
      count++
    }
  }
  return count
}

let local = []
grabbin(rawData, local);

console.log(count(local, local[0][0]))

let cityMarkers = [];

for (let i = 0; i < local.length; i++) {
  // loop through the cities array, create a new marker, and push it to the cityMarkers array
  cityMarkers.push(
    L.marker(local[i][0]).bindPopup("<h1>" + local[i][1] + ", Age: " + local[i][2]+ "</h1>")
  );
};

let cityMarkers1 = [];

for (let x = 0; x < local.length; x++) {
  // loop through the cities array, create a new marker, and push it to the cityMarkers array
    cityMarkers1.push(
      L.circle(local[x][0], {
        stroke: false,
        fillOpacity: 0.75,
        color: "red",
        fillColor: "red",
        radius: count(local, local[x][0])*300
      })
  );
  }

  let cityLayer2 = L.markerClusterGroup();

  for (let m = 0; m < local.length; m++) {

    // Set the data location property to a variable.
    

    // Check for the location property.
   

      // Add a new marker to the cluster group, and bind a popup.
      let rat_marker = L.marker([local[m]][0][0], [local[m]][0][1]).bindPopup(`${local[m][1]}, Age: ${local[m][2]}`);
      cityLayer2.addLayer(rat_marker);
    }

  




// Add all the cityMarkers to a new layer group.
// Now, we can handle them as one group instead of referencing each one individually.
let cityLayer = L.layerGroup(cityMarkers);

let cityLayer1 = L.layerGroup(cityMarkers1);



// Define variables for our tile layers.

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// Only one base layer can be shown at a time.
let baseMaps = {
  Street: street,
  Topography: topo,
};

// Overlays that can be toggled on or off
let overlayMaps = {
  Locatons: cityLayer,
  Radius: cityLayer1,
  clust: cityLayer2
};

// Create a map object, and set the default layers.

let myMap = L.map("map", {
  center: [32.3732122, -94.0432419],
  zoom: 6,
  layers: [street]
});

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});