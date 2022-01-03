import * as React from 'react';
import {Marker} from 'react-map-gl';
import {Pin} from "../Types";


interface PropTypes {
    data:Pin[] ,
    onClick:any
}


export const Pins: (props: PropTypes) => JSX.Element = (props) => {
    const {data, onClick} = props;

    return <>
        {
            data.map((pin, index) => (
                <Marker key={`marker-${index}`} longitude={pin.lng} latitude={pin.lat} offsetTop={-25} offsetLeft={-10} onClick={()=>{
                    onClick(pin)
                }}>
                    <img src="/images/pin.png" alt="" style={{cursor: "pointer"}}/>
                </Marker>
            ))
        }
    </>
}

export default React.memo(Pins);