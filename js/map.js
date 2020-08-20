//array con le località, in futuro lo preleveremo da un database
var places = ["Cagliari", "Bosa", "Nuoro", "Olbia", "Oristano", "Sassari"];

//in caso di aggiunta comitati basterà modificare questo array inserendo un luogo
var placesCoordinates = [
  new Coordinates("Cagliari", 9.13015, 39.23307), new Coordinates("Bosa", 8.49556, 40.29634),
  new Coordinates("Nuoro", 9.32704, 40.32014), new Coordinates("Olbia", 9.49487, 40.92681),
  new Coordinates("Oristano", 8.59401, 39.90496), new Coordinates("Sassari", 8.52302, 40.73521)
];



// Definisco la variabilie mappa come un oggetto OpenLayers.Map utilizzando il DivMappa, poi aggiungo il Layer OSM (Open Street Map)
var Mappa = new OpenLayers.Map("map");
Mappa.addLayer(new OpenLayers.Layer.OSM());

// Creo l'oggetto contenente le coordinate (prima longitudine e poi latitudine) che sarà al centro della mappa
var centro = new OpenLayers.LonLat(9.16063, 40.10175)
  .transform(
    new OpenLayers.Projection("EPSG:4326"), // Transformazione da WGS 1984..
    Mappa.getProjectionObject() // .. a Spherical Mercator Projection
  );

// Creo una variabile contenete il layer dei marker poi collego il layer dei markers alla mappa
var LayerMarkers = new OpenLayers.Layer.Markers("Markers");
Mappa.addLayer(LayerMarkers);

addMarkers();

// Imposto lo zoom
var zoom = 7;

// Imposto le coordinate di lonLat come centro della mappa di partenza
Mappa.setCenter(centro, zoom);




function addMarkers() {
  places.forEach(function(element) {
    var coordinates = placesCoordinates.find(function(elem) {
      return elem.place === element;
    });

    if (coordinates === undefined) {
      console.error("Coordinates not found: " + element);
    } else {
      var temp = new OpenLayers.LonLat(coordinates.long, coordinates.lat)
        .transform(
          new OpenLayers.Projection("EPSG:4326"), // Transformazione da WGS 1984..
          Mappa.getProjectionObject() // .. a Spherical Mercator Projection
        );
      // Aggiungo al layer dei marker un marker (utilizzando l'oggetto lonLat per le coordinate)
      LayerMarkers.addMarker(new OpenLayers.Marker(temp));
    }
  });
}

//definizione oggetto coordinate
function Coordinates(place, long, lat) {
  this.place = place;
  this.long = long;
  this.lat = lat;
}
