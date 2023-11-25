import { MapContainer, TileLayer, Marker, Popup , useMapEvents, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {IconRoute, IconStart} from './IconRoute';
import LeftSide from './LeftSide';
import '../App.css'


const GetLatLong = ({Coords, setItem}) => {
    const map = useMapEvents({
        click(e) {
            setItem(e.latlng);
        },

    });

    return Coords == null ? null : (
        <>
        <Marker position={Coords} icon={IconRoute}>
            <Popup>this is your destination</Popup>
        </Marker>
        </>
    )
}

const LocationMarker = () => {

    const [posSource, setPosSource] = useState([-6.90208974723932, 107.61861026284961]);
    const [posTarget, setPosTarget] = useState(null);
    const [verTarget, setVerTarget] = useState(null);
    const [verSource, setVerSource] = useState(null);
    const [route, setRoute] = useState(null);
    const [dist, setDist] = useState();
    const [timeEst, setTimeEst] = useState();

    const getColor = (d) => {
        return d == "T1" ? 'blue' : d == "T2" ? 'red' : 
        d == "T3" ? 'green' : d == "T4" ? 'yellow' : d == "T5" ? 'darkorange' : 
        d == "T6" ? 'purple' : d == "T7" ? 'maroon' : d == "T8" ? 'gray' : 
        d == "T9" ? 'brown' : d == "T10" ? 'beige' : d == "T11" ? 'lime' : 
        d == "T12" ? 'teal' : d == "T13" ? 'aqua' : d == "T14" ? 'olive' : 
        d == "T15" ? 'purple' : d == "T16" ? 'coral' : d == "T17" ? 'cyan' : 
        d == "T18" ? 'crimson' : d == "T19" ? 'chocolate' : d == "T20" ? 'cadetblue' : 
        d == "T21" ? 'khaki' : 'black';
    }

    const routePops = (feature, layer)=>{
        layer.bindPopup((feature.properties.distance*1000).toFixed(1) + " meters", {permanent: true, 
            direction: "left"});
    }


    const styleRoute = (feature) => {
        return {
       //  fillColor: 'red',
          weight: 6,
          opacity: 1,
          color: getColor(feature.properties.trayekid),
        };
      }
    
    const clickHandler = (e) => {
        setPosSource(e.latlng);
    }

    const calculateTime = (data) => {
        let timeJournal = 0;
        timeJournal = data/0.2;
        return timeJournal.toFixed(1);
    }

    const distanceHandler = (data) => {
        let arr1 = [];
        for(let x= 0; x< data.length; x++){
           arr1.push(parseFloat(data[x].properties.distance));
        };
        let sumArr = arr1.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0,
        );
        return sumArr.toFixed(1);
    }

    const clearHandle = () => {
        setRoute(null);
        setPosTarget(null);
        setDist("");
        setTimeEst("");
    }

    useEffect(()=>{
        if(posTarget != null && posSource != null){
            let urlT = `http://localhost:8080/geoserver/transportbdg/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=transportbdg:nbdg_vertex&viewparams=x:${posTarget.lng};y:${posTarget.lat};&outputformat=json`;
            let urlS = `http://localhost:8080/geoserver/transportbdg/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=transportbdg:nbdg_vertex&viewparams=x:${posSource.lng};y:${posSource.lat};&outputformat=json`;



            fetch(urlT)
            .then(res=>res.json())
            .then((data) => {
                setVerTarget(data.features[0].properties.id);
                console.log(data.features[0].properties);
            })
            .catch((error)=>console.log(error));
      

            fetch(urlS)
            .then(res=>res.json())
            .then((data) =>{ 
                setVerSource(data.features[0].properties.id);
                console.log(data.features[0].properties);
            })
            .catch((error)=>console.log(error));
    
    }
    },[posTarget, posSource]);

    useEffect(()=>{
        
    if(verSource != null && verTarget != null){
    let url = `http://localhost:8080/geoserver/transportbdg/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=transportbdg:shortestbdg&viewparams=source:${verSource};target:${verTarget};&outputformat=application/json`

    fetch(url)
    .then(res=>res.json())
    .then((data) => {
        setRoute(data);
       
    })
    .catch((error)=>console.log(error));
    }
    },[verTarget, verSource])

    useEffect(()=>{
    if(route != null){
        setDist(distanceHandler(route.features));
        setTimeEst(calculateTime(distanceHandler(route.features)));
    }
    }, [route])


    return (
        <>
         <LeftSide left={route === null ? [] : (route.features)} distance={dist === null ? 0 : (dist)} tArrival={timeEst === null ? 0 : (timeEst)} cleardata={clearHandle}/>

         <MapContainer center={[-6.90208974723932, 107.61861026284961]} zoom={17} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                    name="OpenStreetMap"
                    attribution='false'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
            <GetLatLong Coords={posTarget} setItem={setPosTarget}/>
            <Marker position={posSource} draggable={true} eventHandlers={{click: clickHandler}} icon={IconStart}>
                <Popup>Journey: {dist} km, {timeEst} minutes</Popup>
            </Marker>
            {route === null ? null : (<GeoJSON key={Object.keys(route.features)} data={route.features} style={styleRoute} onEachFeature={routePops}/> )}
        </MapContainer>

        </>
    )
}

function Maps() {
  return (
    <>
    
        <LocationMarker/>

    </>
  )
}

export default Maps