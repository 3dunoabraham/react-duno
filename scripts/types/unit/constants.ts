

export const FAKE_UNIT = {
    "uid":"8889-8818",
    "vin":"123ABCV63261356",
    // "type":"1", //?
    "brand":"Stor-Mor", /*fk label*/ // default to manufacturer
    "dealer":"Barbies Trailers", /*fk label*/ // "dealer_id":"1", //fk // "dealer_name":"n/a",
    "distributor":"Stor-Mor", /*fk label*/
    "manufacturer":"Big Tex", /*fk label*/ // "manufacture":"1", //fk // "manuf":"Big Tex", //fk // "sub_manufacture":"1", //fk
    "owner":"Silverline", /*fk label*/
    "model_style":"Cargo", /*fk label*/
    "size":{width:{feet:1,inches:2},height:{feet:3,inches:4},length:{feet:5,inches:6}}, /*json*/ // width:ft/inch, length:ft/inch, height:ft/inch
    "condition":"1", /*enum*/
    "status":"1", /*enum*/ // "status_type":"New8",

    "images": [
        "https://i.imgur.com/4yCs9Ed.png", "https://i.imgur.com/0s5StWl.png",
        "https://i.imgur.com/kZ0VSZk.png", "https://i.imgur.com/NVJUGYl.png", "https://i.imgur.com/8e2GPpS.png",
        "https://i.imgur.com/WX2Gjzt.png", "https://i.imgur.com/nryX2xi.png",
        "https://i.imgur.com/uQiOKC0.png", 
    ],
    "image": "https://via.placeholder.com/720x480",

    "serial":"abc-8888881888688",
    "location_related":"1", 
    "locations": { location:null, physical_as_of: null },
    "location":"now", 
    "physical_as_of":"now", 
    "registration_title": {mso: "AAFG8eGHr3", title_number: "11552346851", title_state: "5", title_status: "1", },
    "price": {retail_price:"3200", min_retail_price:"2990.9", agreement_price:null, min_agreement_price:"2000", },
    "retail_price": "1400", "min_retail_price": "1100", "agreement_price": "1900", "min_agreement_price": "900",
    "characteristics": {color:null, axles:null, hitch_type:null, shipping_weight:null, gvwr:null, },
    "color":"Gr8",
    "gps": {manufacturer:null,serial:null, },
    "investors": {current_investor:null,previous_investor:null, },
    "previous_investor":"", "current_investor":"",
}
export const DEFAULT_UNIT = {...FAKE_UNIT}
export const _DEFAULT_UNIT = {
    "uid":"8889-8818",
    "vin":"8889-8818",
    // "type":"1", //?
    "brand":"Stor-Mor", /*fk label*/ // default to manufacturer
    "dealer":"Barbies Trailers", /*fk label*/ // "dealer_id":"1", //fk // "dealer_name":"n/a",
    "distributor":"Stor-Mor", /*fk label*/
    "manufacturer":"Big Tex", /*fk label*/ // "manufacture":"1", //fk // "manuf":"Big Tex", //fk // "sub_manufacture":"1", //fk
    "owner":"Silverline", /*fk label*/
    "model_style":"Cargo", /*fk label*/
    "size":{width:{feet:null,inches:null},height:{feet:null,inches:null},length:{feet:null,inches:null}}, /*json*/ // width:ft/inch, length:ft/inch, height:ft/inch
    "condition":"1", /*enum*/
    "status":"1", /*enum*/ // "status_type":"New8",

    "images": [
        "https://i.imgur.com/4yCs9Ed.png", "https://i.imgur.com/0s5StWl.png",
        "https://i.imgur.com/kZ0VSZk.png", "https://i.imgur.com/NVJUGYl.png", "https://i.imgur.com/8e2GPpS.png",
        "https://i.imgur.com/WX2Gjzt.png", "https://i.imgur.com/nryX2xi.png",
        "https://i.imgur.com/uQiOKC0.png", 
    ],
    "image": "https://via.placeholder.com/720x480",

    "serial":"abc-8888881888688",
    "location_related":"1", 
    "locations": { location:null, physical_as_of: null },
    "location":"now", 
    "physical_as_of":"now", 
    "registration_title": {mso: null, title_number: null, title_state: null, title_status: null, },
    "price": {retail_price:null, min_retail_price:null, agreement_price:null, min_agreement_price:null, },
    "retail_price": "1400", "min_retail_price": "1100", "agreement_price": "1900", "min_agreement_price": "900",
    "characteristics": {color:null, axles:null, hitch_type:null, shipping_weight:null, gvwr:null, },
    "color":"Gr8",
    "gps": {manufacturer:null,serial:null, },
    "investors": {current_investor:null,previous_investor:null, },
    "previous_investor":"", "current_investor":"",
}
export const DEFAULT_MODEL_STYLE_OBJARRAY = [
    {id:"0", label:"Car", desc:"",created_at:""},
    {id:"1", label:"Car Hauler", desc:"",created_at:""},
    {id:"2", label:"Trailer", desc:"",created_at:""},
    {id:"2", label:"Cargo", desc:"",created_at:""},
]

// export const DEFAULT_TITLE_STATE_OBJARRAY = [
//     {id:"1", label:"CA", desc:"",created_at:""},
//     {id:"2", label:"TZ", desc:"",created_at:""},
//     {id:"3", label:"WE", desc:"",created_at:""},
//     {id:"4", label:"HA", desc:"",created_at:""},
//     {id:"5", label:"MI", desc:"",created_at:""},
//     {id:"6", label:"CE", desc:"",created_at:""},
//     {id:"7", label:"PU", desc:"",created_at:""},
//     {id:"8", label:"SE", desc:"",created_at:""},
//     {id:"9", label:"TA", desc:"",created_at:""},
// ]