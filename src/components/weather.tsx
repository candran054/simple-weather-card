import React, { useState } from "react";
import Image from "next/image";

interface Props {
  weatherData: any;
  watch: any;
}

export default function Weather({ weatherData, watch }: Props) {
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setSearch(true);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(watch);
    setSearch(false);
  };

  return (
    <div className="flex flex-col gap-5 bg-white px-6 py-4 rounded-lg">
      <div className="flex flex-col w-60 justify-center items-center">
        <div className="flex w-full justify-between">
          <div className="flex justify-center bg-slate-600 w-9 h-9 rounded-3xl">
            <p className="text-white text-xl">+</p>
          </div>
          <Image src="/images/sunny.png" width={50} height={50} alt="sunny" />
        </div>
        {search ? (
          <form onSubmit={handleSearchSubmit}>
            <input
              className="w-20"
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        ) : (
          <>
            <p
              onClick={handleSearchClick}
              className="text-xl text-gray-600 font-bold cursor-pointer"
            >
              {search ? "" : weatherData?.name}
            </p>
          </>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="desc">temp</p>
          <p className="value">{weatherData?.main?.temp}</p>
          <p className="desc">feels like</p>
          <p className="value">{weatherData?.main?.feels_like}</p>
        </div>
        <div className="flex flex-col">
          <p className="desc">humidity</p>
          <p className="value">{weatherData?.main?.humidity}</p>
          <p className="desc">pressure</p>
          <p className="value">{weatherData?.main?.pressure}</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 border-t border-b border-solid border-y-slate-500 mt-5 py-5">
        <div className="flex text-center flex-col">
          <p className="desc">visibility</p>
          <p className="value">{weatherData?.visibility}</p>
        </div>
        <div className="flex text-center flex-col">
          <p className="desc">wind</p>
          <p className="value">{weatherData?.wind?.speed}</p>
        </div>
      </div>
    </div>
  );
}
