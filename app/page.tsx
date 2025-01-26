"use client";

import { InputTextForm } from "@/components/InputTextForm";
import { useState } from "react";

export default function Home() {
  const [recoms, setRecoms] = useState([]);
  const [type, setType] = useState("texts");
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-1/3 bg-red-900 pt-12 pl-8 pr-8">
        <h1 className="font-gambarino mb-12 text-4xl">Projekt BMA</h1>
        <div className="flex flex-col justify-center">
          <InputTextForm setTweets={setRecoms} setType={setType}/>
        </div>
      </div>
      <div className="h-full w-2/3 font-geist text-gray-800">
        {(type == "texts") 
          ?
            recoms.map((recom:any) => {
              return (
                <div className="flex border border-solid border-red-600">
                  <div className="w-2/12 flex justify-center items-center border-r border-solid border-red-600">
                    {recom.sim_score}
                  </div>
                  <div className="py-4 px-4 w-11/12">
                    {recom.text}
                  </div>
                </div>
              )
            })
          :
          recoms.map((recom:any) => {
            return (
              <div className="flex border border-solid border-red-600">
                <div className="w-2/12 flex justify-center items-center border-r border-solid border-red-600">
                  {recom.sim_score}
                </div>
                <div className="py-4 px-4 w-5/12 border-r border-solid border-red-600">
                  <img src={`https://res.cloudinary.com/dun29p7aw/images/${recom.fileName}`}/>
                </div>
                <div className="flex w-5/12 justify-center items-center">
                  {recom.description}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
