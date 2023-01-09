import React, { Children, useEffect, useState, useRef, isValidElement, cloneElement } from 'react';

const MapContainer = ({ results, children, ...options }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    React.useEffect(() => {
        const defaultCenterCoordinate = { lat: 3.1348303682222918, lng: 101.7130285638099 }

        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: defaultCenterCoordinate,
                zoom: 13,
                mapTypeControl: false,
                disableDefaultUI: true,
            }));
        }
    }, [ref, map]);

    React.useEffect(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options])
    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }} ref={ref} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { map });
                }
            })}
        </>
    );
};


export const Marker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};

export default MapContainer;