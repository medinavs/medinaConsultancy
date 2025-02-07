interface Location {
    lat: number;
    lng: number;
}

export interface Geometry {
    location: Location;
}

export interface DataItem {
    name: string;
    formatted_address: string;
    email: string;
    formatted_phone_number: string;
    geometry: Geometry;
}