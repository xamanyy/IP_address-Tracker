const searchIP = document.querySelector('#search-ip');
const buttons = document.querySelector('#btn');
const ip = document.querySelector('#ip');
const loc = document.querySelector('#location');
const tmz = document.querySelector('#tmz');
const isp = document.querySelector('#isp');

const ipDetails = async() =>{
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7dIMBVCycD3ZnBMmfqKh4S65bZgsq&ipAddress=${searchIP.value}`);

        if(!response.ok){
            console.log("first response");
        }

        const data = await response.json();
        console.log(data);

        ip.textContent = data.ip;
        loc.textContent = data.location.city;
        tmz.textContent = data.location.timezone;
        isp.textContent = data.isp;

        var map = L.map('map').setView([data.location.lat, data.location.lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([data.location.lat, data.location.lng]).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();
    }
    catch(err){
        console.log("first error: " + err);
    }
    
}




buttons.addEventListener('click',()=>{
    ipDetails();
});
