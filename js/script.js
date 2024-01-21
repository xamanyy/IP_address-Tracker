const searchIP = document.querySelector('#search-ip');
const buttons = document.querySelector('#btn');
const ip = document.querySelector('#ip');
const loc = document.querySelector('#location');
const tmz = document.querySelector('#tmz');
const isp = document.querySelector('#isp');
let map;

let myIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [36, 42],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

const ipDetails = async() =>{
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7dIMBVCycD3ZnBMmfqKh4S65bZgsq&ipAddress=${searchIP.value}`);

        if(!response.ok){
            console.log("first response");
        }

        const data = await response.json();

        ip.textContent = data.ip;
        loc.textContent = data.location.city;
        tmz.textContent = data.location.timezone;
        isp.textContent = data.isp;

        if (map) {
            map.off(); // Unbind any events
            map.remove(); // Remove the map instance
        }

        map = L.map('map').setView([data.location.lat, data.location.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([data.location.lat, data.location.lng],{icon: myIcon}).addTo(map)
            // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            // .openPopup();
    }
    catch(err){
        console.log("first error: " + err);
    }
    
}


const ipHomeDetails = async() =>{
    try{
        const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_7dIMBVCycD3ZnBMmfqKh4S65bZgsq&ipAddress=");

        if(!response.ok){
            console.log("first response");
        }

        const data = await response.json();

        ip.textContent = data.ip;
        loc.textContent = data.location.city;
        tmz.textContent = data.location.timezone;
        isp.textContent = data.isp;

        if (map) {
            map.off(); // Unbind any events
            map.remove(); // Remove the map instance
        }

        map = L.map('map').setView([data.location.lat, data.location.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([data.location.lat, data.location.lng],{icon: myIcon}).addTo(map)
            // .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            // .openPopup();
    }
    catch(err){
        console.log("first error: " + err);
    }
    
}

ipHomeDetails();

buttons.addEventListener('click',()=>{
    ipDetails();
});


