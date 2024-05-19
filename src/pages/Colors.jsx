import React from "react";
import { useParams } from "react-router-dom";

export default function Colors() {
  const { season } = useParams();

  return (
    <div>
      <h1 className="text-4xl font-bold">Colors for {season}</h1>
      <p className="text-lg">Welcome to the {season} colors page.</p>
    </div>
  );
}
