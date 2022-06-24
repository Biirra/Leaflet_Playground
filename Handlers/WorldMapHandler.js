const DEFAULT_CHART = 'Dark';
const DEFAULT_ZOOM_LEVEL = 13;
const DEFAULT_COORDINATES = [52.704475, 5.753059];

const WORLD_MAPS = {
    "Satellite": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Satellite',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Streets": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Streets',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Outdoors": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Outdoors',
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Dark": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Dark',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Light": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Light',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    })
};