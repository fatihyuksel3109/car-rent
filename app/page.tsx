"use client";
import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, transmissions, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";

import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  //search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [transmission, setTransmission] = useState("");
  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        model: model || "",
        transmission: transmission || "",
        limit: limit || 10,
      });

      setAllCars(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model, limit]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" setFilter={setFuel} options={fuels} />
            <CustomFilter
              title="year"
              setFilter={setYear}
              options={yearsOfProduction}
            />
            <CustomFilter
              title="transmission"
              setFilter={setTransmission}
              options={transmissions}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 h-10 rounded-full w-full bg-primary-blue flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={(limit) / 10}
              isNext={(limit) > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="mt-16 h-20 rounded-full w-full bg-primary-blue flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
        )}
      </div>
    </main>
  );
}
