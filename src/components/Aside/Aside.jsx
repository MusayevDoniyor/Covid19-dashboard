import React from "react";

export default function Aside({ title, total, countries }) {
  return (
    <aside className="p-4 border rounded-lg shadow-md">
      <div className="flex flex-col gap-3 mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <h1 className="text-2xl font-bold">{total}</h1>
      </div>

      <div>
        <h3 className="text-lg font-medium">Countries List</h3>
        <ul className="list-disc pl-5">
          {countries.length > 0 ? (
            countries.map((country) => (
              <li key={country.code} className="mb-2">
                <h4 className="font-medium">{country.name}</h4>
              </li>
            ))
          ) : (
            <li>No countries data available</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
