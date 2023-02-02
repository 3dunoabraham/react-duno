import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";


import { IService, ILink } from "../scripts/types";
import { DEFAULT_PLAN_COLUMNS_ARRAY, DEFAULT_PLAN_KEYS_ARRAY } from "../scripts/constants";
import { getStrategyResult } from "../scripts/helpers";
// const TELEGRAM_WRAPPER = require('./telegram.js');
// let telegramWraper = new TELEGRAM_WRAPPER({ddcabotParent: dcaBot})

async function test() {
    console.log("test");
    let result = getBotUpdates();
}

const getBotUpdates = () =>
    fetch(
        "https://api.telegram.org/bot5389030729:AAF9fnNmzr2wf-B0PMgax0yDowu0DUILZYQ/getUpdates"
    ).then((response) => {
        console.log("response", response);
        return response.json();
    });

    // const getUserTelegramId = async (uniqueString) => {
    //   const { result } = await getBotUpdates();

    //   const messageUpdates = result.filter(
    //     ({ message }) => message?.text !== undefined
    //   );

    //   const userUpdate = messageUpdates.find(
    //     ({ message }) => message.text === `/start ${uniqueString}`
    //   );

    //   return userUpdate.message.from.id;
    // };


function Gallery({
    links, services,
}: { links: ILink[], services: IService[] }) {
// new TELEGRAM_WRAPPER({});
    useEffect(()=>{
        console.log(services)
    },[])
    return (
    <div className="body pos-rel flex-col flex-justify-start">

        <div className="bg-glass-6 pos-abs bord-r-10 tx-white py-100 z-999 fade-in px-8 w-max-700px flex-center"
            style={{
                transform:"translateY(200px)", border:"1px solid #777",
                boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <h1 className="tx-xl flex-col flex-align-start mr-8 " >
                <span className="tx-bold-3">react-duno</span>
                {/* <span className="tx-bold-3 mb-4">DCA</span> */}
                <span className="tx-md tx-bold-7 opaci-chov--50 opaci-75 tx-ls-1">
                    Dynamic Dollar Cost Average Grid
                </span>
            </h1>
            <a className="duno-btn tx-white py-4 px-8 bord-r-50 tx-lg"
                href="/chart/1d?token=btc"
                style={{boxShadow:"0px 0px 25px #CF589433"}}
            >
                CHART
            </a>
        </div>

        {/* Images will go here */}
        <div className="flex-col flex-justify-center huerotate-1  tx-white" >
            <div className="w-400px hover-4 ">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" >
                      <path  fill="#CF5894"
                          d={
"M44.8,-72.3C56.8,-70.6,64.5,-56.1,70.7,-41.9C76.9,-27.8,81.7,-13.9,81.3,"+
"-0.2C80.9,13.4,75.3,26.9,64.3,32.7C53.3,38.5,36.8,36.8,25.1,41.5C13.5,46.2,6.8,57.4,-2.7,"+
"62C-12.1,66.6,-24.2,64.7,-35.6,59.9C-47,55,-57.7,47.3,-58.5,36.8C-59.3,26.4,-50.2,13.2,-50.3,-0.1C-50.4,-13.3,-59.7,-26.6,-58,"+
"-35.4C-56.2,-44.2,-43.4,-48.6,-31.9,-50.6C-20.4,-52.5,-10.2,-52.1,3.1,-57.5C16.4,-62.8,32.7,-74,44.8,-72.3Z"
                          }
                          transform="translate(100 100)"
                          />
                </svg>
            </div>






            <div className="mt-200"></div>
            <h1 className="mt-200 pt-200 tx-xxxl opaci-5 tx-ls-8 flex-col" onClick={() => { test(); }}>
                <span>CONTROL</span>
                <span className="pl-200 ml-100">PANEL</span>
            </h1>
            <div className="w-100 ">
                <div className=" w-700px pos-abs  opaci-25 " style={{ transform:"translate(30%,-30%)",filter: "blur(50px) brightness(180%)" }}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#CF5894" d="M40.8,-56.9C54.5,-54.6,68.6,-46.2,78.1,-33.3C87.7,-20.5,92.8,-3.2,89.7,12.3C86.6,27.9,75.3,41.7,61.6,48.2C47.9,54.7,31.8,54,18.4,53.9C5.1,53.8,-5.5,54.3,-13.8,50.3C-22,46.3,-27.9,37.8,-37.4,30.4C-46.8,23,-59.9,16.8,-66.7,6.2C-73.5,-4.4,-74.1,-19.3,-64.8,-25.4C-55.5,-31.6,-36.2,-29,-23.8,-31.9C-11.3,-34.7,-5.7,-43.1,3.9,-49.2C13.5,-55.3,27,-59.1,40.8,-56.9Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>
            <div className=" w-1080px pos-rel flex-col ">

                <div className="flex-row">
                    <div className="flex-col w-150px  bg-w-opaci-10  bord-r-10">
                        {DEFAULT_PLAN_KEYS_ARRAY.map((aColumnName,index)=>{
                            if (aColumnName == "id") return
                            if (aColumnName == "token") return <div className="px-3 py-6 mt-1 w-150px" key={index}></div>
                            return(
                                <div key={index}
                                    className="hov-bord-1-w flex-1 px-3 py-4 bg-w-10 mt-1 bord-r-5 box-shadow-hov-5 w-150px tx-sm opaci-chov--50 tx-start"
                                >
                                    {aColumnName}
                                </div>
                            )
                        })}
                        <div className="px-3 py-6 mt-3 w-150px" ></div>
                    </div>
                    <div className="pos-rel flex-row bg-w-opaci-10 bord-r-10 ma-2 px-4 mt-0 py-4">
                        {services.map((service) => (
                            <div key={service.id} className="">
                                <Service service={service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-200 pt-200"></div>

        <div className="flex-col gap-3 mt-4 pb-200 ">
            <div className="tx-xl tx-white tx-ls-2 opaci-chov--10 ">
                <Link href="/dashboard?token=btc" target="_blank">
                    <a className="tx-white">DASHBOARD</a>
                </Link>
            </div>
            <div className="tx-xl tx-ls-5 tx-white tx-ls-2 opaci-chov--10 mt-3">
                <Link href="/faq" target="_blank">
                    <a className="tx-white nodeco">FAQ</a>
                </Link>
            </div>
            <div className="tx-lgx tx-white tx-ls-2 opaci-chov--10 ">
                <Link href="/contact" target="_blank">
                    <a className="tx-white nodeco">Contact</a>
                </Link>
            </div>
            <div className="tx-lgx tx-white tx-ls-2 opaci-chov--10 ">
                <Link href="/contact" target="_blank">
                    <a className="tx-white nodeco">Blog</a>
                </Link>
            </div>
            {links.map((link) => (
                <div key={link.id}>
                    <ContactLink link={link} />
                </div>
            ))}
        </div>

    </div>
    )
}

function HrH() {
    return (
        <hr/>
    )
}
function Service({ service }: { service: IService }) {
    const theArray = []
    return (
        <div className="text-bold-4 tx-lg  bord-r-10 noverflow block flex-col mx-1">
            <div className="flex-1 mt-1 px-8 hov-bord-1-w box-shadow-hov-5 mr-1 bg-w-10 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                {/*<div>domain:</div>*/}
                <div>{service.token}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.timeframe}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.min}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.max}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.minMedian}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.maxMedian}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.ceil}</div>
            </div>
            <div className="flex-1 mt-1 px-8  box-shadow-hov-5 mr-1 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                <div>{service.floor}</div>
            </div>
            <div className="flex-1 mt-1 px-8 hov-bord-1-w box-shadow-hov-5 mr-1 bg-w-10 bg-w-opaci-10 opaci-chov--50 pb-2 pt-4 bord-r-8">
                {/*<div>domain:</div>*/}
                <div>{getStrategyResult(service, 0)}</div>
            </div>
        </div>
    )
}




function Image2() {
    return <i>Text</i>;
}
function ContactLink({ link }: { link: ILink }) {
    return (
    <div className="flex-center opaci-75">
        <a
            href={link.href}
            className="text-bold-4 tx-lg py-2 px-4 block opaci-chov--50 tx-primary"
            target="_blank"
        >
            {link.name}
        </a>
    </div>
    )
}

export default Gallery;

export const getStaticProps = async () => {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    let links = (await supabaseAdmin.from("links").select("*").order("id")).data || []
    let services = (await supabaseAdmin.from("strats").select("*").order("id")).data || []
    return {
        props: {
            links: links,
            services: services,
        },
    };
};
