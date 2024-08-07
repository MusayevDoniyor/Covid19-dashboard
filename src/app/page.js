"use client";
import Aside from "@/components/Aside/Aside";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [latestTotals, setLatestTotals] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchLatestTotals = async () => {
          await sleep(1250);
          const url = "https://covid-19-data.p.rapidapi.com/totals?format=json";
          const options = {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "f9eb3aaa3emsh3482497e9419f00p19839djsn3b0590686bbd",
              "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Network response was not ok");
          return await response.json();
        };

        const fetchListCountries = async () => {
          await sleep(1250);
          const url =
            "https://covid-19-data.p.rapidapi.com/help/countries?format=json";
          const options = {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "f9eb3aaa3emsh3482497e9419f00p19839djsn3b0590686bbd",
              "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Network response was not ok");
          return await response.json();
        };

        const fetchCountryByCode = async () => {
          await sleep(1250);
          const url = `https://covid-19-data.p.rapidapi.com/country/code?format=json&code=it`;
          const options = {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "f9eb3aaa3emsh3482497e9419f00p19839djsn3b0590686bbd",
              "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            },
          };

          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Network response was not ok");
          return await response.json();
        };

        const [totals, countriesList, countryByCode] = await Promise.all([
          fetchLatestTotals(),
          fetchListCountries(),
          fetchCountryByCode(),
        ]);

        setLatestTotals(totals);
        setCountries(countriesList);
        setCountryData(countryByCode);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalDeaths = latestTotals.reduce(
    (acc, total) => acc + total.deaths,
    0
  );

  const totalInfections = latestTotals.reduce(
    (acc, total) => acc + total.confirmed,
    0
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="min-h-screen p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <Aside title="Total Deaths" total={totalDeaths} countries={countries} />
      </div>

      <div className="col-span-1">
        <h2 className="text-xl font-semibold">Additional Center Content</h2>
      </div>

      <div className="col-span-1">
        <Aside
          title="Total Infections"
          total={totalInfections}
          countries={countries}
        />
      </div>
    </main>
  );
}
