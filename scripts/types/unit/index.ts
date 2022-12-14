import { MapOrEntries } from 'usehooks-ts'


export interface IUnitModelStyle {
    id: number;
    label: string;
    description: string;
    created_at: string;
}

export type IUnitBaseOpts = {
    model_styles: any;
    types: any;
    statuses: any;
    conditions: any;
    manufacturers: any;
    dealers: any;
    distributors: any;
    owners: any;
    // model_styles: MapOrEntries<string,IUnitModelStyle>;
}

export type IUnit = {
    uid: string;
    vin: string;
    // type: string;
    brand: string;
    dealer: string; // dealer_id: string; // dealer_name: string;
    distributor: string;
    manufacturer: string; // manufacture: string; // manuf: string; // sub_manufacture: string;
    owner: string;
    model_style: string;
    size: any;
    condition: string;
    status: string; // status_type: string;
    
    images: string;
    image: string;
    registration_title: any;
    characteristics: any;
    color: string;
    price: any;
    location_related: any;
    locations: any;
    location: any; physical_as_of: any;
    retail_price: string; min_retail_price: string; agreement_price: string; min_agreement_price: string;
    gps: any; serial: string;
    investors: any;
    previous_investor: string; current_investor: string;
}
