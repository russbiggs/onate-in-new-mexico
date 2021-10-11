import bbox from '@turf/bbox';
import centroid from '@turf/centroid';

class ListItem {
    constructor(data) {
        this.data = data;
        this.elem = this.init();
        this.init = this.init.bind(this);
    }


    init() {
        const li = document.createElement('li');
        li.classList.add('list-item')
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('item-content');
        contentDiv.innerHTML = `<span class="item-title">${this.data.properties.name}<span><br><span class="item-county">${this.data.properties.county} county</span><br><a class="osm-link" href="https://www.openstreetmap.org/way/${this.data.properties['@id'].split('\/')[1]}">view on OpenStreetMap</a>`
        const mapDiv = document.createElement('div');
        mapDiv.classList.add('map');
        const c = centroid(this.data.geometry);
        mapDiv.id = `map-${this.data.properties['@id']}`
        li.appendChild(contentDiv);
        li.appendChild(mapDiv);
        const ul = document.querySelector('.js-item-list');
        ul.appendChild(li);
        const map = L.map(`map-${this.data.properties['@id']}`, { 
            zoomControl: false,
            keyboard: false,
            dragging: false,
            zoomControl: false,
            boxZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            tap: false,
            touchZoom: false,
        });
        const bounds = bbox(this.data);
        map.fitBounds([
            [bounds[1],
            bounds[0]],
            [bounds[3],
            bounds[2]]
        ]);


        var myStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };
        
        L.geoJSON(this.data, {
            style: myStyle
        }).addTo(map);
        addTileLayer(map);
    }
}


function addTileLayer(map) {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicnVzc2JpZ2dzIiwiYSI6ImNrdW14MzA3ajJsZXUyb3Q5em94dGhhaWUifQ.3ZXKFOlpwoX2bUyaHY61Rg'
    }).addTo(map);
}

export default ListItem;