import L from 'leaflet';
import pin from '../Icon/pin.png';


   export const IconRoute = new L.Icon({
        iconUrl: pin,
        popupAnchor: [5, -10],
        iconSize: [35, 35],
    });


    export const IconStart = new L.Icon({
        iconUrl: './asset/busicon.png',
        popupAnchor: [5, -10],
        iconSize: [50, 50],
    });