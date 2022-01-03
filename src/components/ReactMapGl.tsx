import React, {SyntheticEvent} from 'react';
import {useState} from 'react';
import ReactMapGL, {
    Popup, GeolocateControl,
    FullscreenControl,
    NavigationControl,
    ScaleControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Pins} from './Pins';
import {Pin} from "../Types";
import {getLocations, storeLocations} from "../Api/locations";
import {useMutation, useQuery, useQueryClient} from "react-query";
import styled from "styled-components";
import {Modal} from "./UiComponents/Modal";
import {PopupContent} from "./UiComponents/PopupContent";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
const initialState = {
    viewport: {
        width: '100%',
        height: '100vh',
        longitude: -0.2416815,
        latitude: 51.5285582,
        zoom: 8
    },
};
type Viewport = {
    width: (string | number),
    height: (string | number),
    latitude: number,
    longitude: number,
    zoom: number
};
const geolocationStyle = {
    top: 0,
    left: 0,
    padding: '10px'
};
const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px'
};
const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};
const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

interface Point {
    lng: number,
    lat: number
}


const LocationTypes = ["Business", "Education", "Home"]
type LocationType = "Business" | "Education" | "Home" | undefined
export const ReactMapGl: () => JSX.Element = () => {
    const [viewport, setViewport] = useState<Viewport>(initialState.viewport);
    const [popupInfo, setPopupInfo] = useState<Pin | undefined>(undefined);
    const [selectedPoint, setSelectedPoint] = useState<Point | undefined>();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState<string>();
    const [type, setType] = useState<LocationType>('Business');
    const {data: Locations} = useQuery<Pin[]>('locations', getLocations)
    const client = useQueryClient()

    const selectLocation = (lngLat: [number, number]) => {
        setSelectedPoint({lng: lngLat[0], lat: lngLat[1]})
        setShowModal(true)
    }
    const closeModal = () => {
        setSelectedPoint(undefined)
        setShowModal(false)
    }

    const saveLocation = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!name) {
            alert('please fill the name field')
        } else {
            const response = await storeLocations({name, type, lat: selectedPoint?.lat, lng: selectedPoint?.lng})
            console.log(response)
        }
    }
    return (
        <>
            <Container><ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
                onClick={(e) => selectLocation(e.lngLat)}
            >
                <Pins data={Locations || []} onClick={(pin: Pin) => setPopupInfo(pin)}/>
                {popupInfo && (
                    <Popup
                        tipSize={10}
                        anchor="top"
                        longitude={popupInfo.lng}
                        latitude={popupInfo.lat}
                        onClose={() => setPopupInfo(undefined)}
                    >
                        <PopupContent data={popupInfo} onClose={() => setPopupInfo(undefined)
                        }/>
                    </Popup>
                )}
                <GeolocateControl style={geolocationStyle}/>
                <FullscreenControl style={fullscreenControlStyle}/>
                <NavigationControl style={navStyle}/>
                <ScaleControl style={scaleControlStyle}/>
            </ReactMapGL></Container>
            <Modal showModal={showModal} closeModal={() => {
                closeModal()
            }}>
                <form className='' onSubmit={async (e) => {
                    await saveLocation(e)
                    await client.invalidateQueries("locations")
                    closeModal()
                }}>
                    <div className='form-group'>
                        <label className='input-label' htmlFor="name">Location Name:</label>
                        <input id='name' className='form-control' type="name" onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </div>
                    <div className='form-group'>
                        <label className='input-label' htmlFor="type">Location Type:</label>
                        <select className='form-select' name="type" id="type" value={type} onChange={(e) => {
                            setType(e.target.value as LocationType)
                        }}>
                            {LocationTypes.map((item) => <option key={`item-${item}`} value={item}>
                                {item}
                            </option>)}
                        </select>
                    </div>

                    {/*<div className='form-group'>*/}
                    {/*    <span className='input-label'>Logo:</span>*/}
                    {/*    <label htmlFor="logo" className='file-input'>*/}
                    {/*        <p className='file-label'>Upload</p>*/}
                    {/*        <input type="file" name="logo" id='logo'/>*/}
                    {/*    </label>*/}
                    {/*</div>*/}

                    <div>
                        <button className='btn btn-primary' type="submit">save</button>
                        <button type="button" className='btn btn-secondary' onClick={() => closeModal()}>cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}


const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`