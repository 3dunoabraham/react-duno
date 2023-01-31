
export type ILink = {
    id: number;
    href: string;
    src: string;
    name: string;
};
export type IService = {
    id: number;
    token: string;
    timeframe: string;
    state: number;
    ceil: number;
    floor: number;
    min: number;
    max: number;
    minMedian: number;
    maxMedian: number;
    minMaxAvg: number;
    // domain: number;
    // hosting: number;
    // ssl: number;
    // ownership: number;
    // languages: number;
    // seo: number;
    // pages: number;
    // searchbar: number;
    // socialmedia: number;
    // products: number;
    // posts: number;
    // website: number;
    // app: number;
};
