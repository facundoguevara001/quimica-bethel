import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import locations from "../../data/locations";

function LocationsMap() {
    const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);
    const selectedLocation = locations.find(
        (location) => location.id === selectedLocationId
    );
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        selectedLocation.mapQuery
    )}&z=14&output=embed`;

    return (
        <aside className="locations-map" aria-labelledby="locations-title">
            <div className="locations-heading">
                <FaMapMarkerAlt aria-hidden="true" />
                <div>
                    <h2 id="locations-title">Encontranos cerca tuyo</h2>
                    <p>Elegí una sucursal para verla en el mapa.</p>
                </div>
            </div>

            <div className="locations-selector" aria-label="Elegir sucursal">
                {locations.map((location) => (
                    <button
                        key={location.id}
                        type="button"
                        className={location.id === selectedLocationId ? "location-button is-active" : "location-button"}
                        aria-pressed={location.id === selectedLocationId}
                        onClick={() => setSelectedLocationId(location.id)}
                    >
                        <strong>{location.name}</strong>
                        <span>{location.address}</span>
                    </button>
                ))}
            </div>

            <iframe
                className="locations-iframe"
                title={`Mapa de ${selectedLocation.name}`}
                src={mapUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
        </aside>
    );
}

export default LocationsMap;
