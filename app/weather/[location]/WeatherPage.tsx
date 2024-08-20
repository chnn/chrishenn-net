"use client";

import type { NextPage } from "next";
import { useParams } from "next/navigation";

import { useState } from "react";

import { Heading } from "./Heading";
import { DayOrWeekToggle } from "./DayOrWeekToggle";
import { WeatherDewPointChart } from "./WeatherDewPointChart";
import { LoadingChart } from "./LoadingChart";

const COORDINATES_REGEX = /-?\d\d?\d?\.\d\d\d\d,-?\d\d?\d?\.\d\d\d\d/;

export const WeatherPage = () => {
  const [dayOrWeek, setDayOrWeek] = useState<"day" | "week">("week");

  const params = useParams();
  const coordinates = decodeURIComponent(params.location as string);

  if (coordinates && !COORDINATES_REGEX.test(coordinates)) {
    window.alert(`invalid coordinates "${coordinates}"`);
  }

  console.log(coordinates);

  return (
    <div className="py-5 lg:px-5">
      <div className="flex justify-center mb-6 px-5">
        <DayOrWeekToggle
          dayOrWeek={dayOrWeek}
          onChangeDayOrWeek={setDayOrWeek}
          className="w-full sm:w-96"
        />
      </div>
      <Heading level={2} className="px-5 lg:px-0">
        Temperature & Dew Point
      </Heading>
      {coordinates &&
      COORDINATES_REGEX.test(coordinates) &&
      typeof window !== "undefined" ? (
        <WeatherDewPointChart coordinates={coordinates} dayOrWeek={dayOrWeek} />
      ) : (
        <LoadingChart text="Loading..." />
      )}
      <Heading level={2} className="px-5 mt-12 lg:px-0">
        Precipitation & Sky Cover
      </Heading>
      <LoadingChart text="Not implemented" />
      <Heading level={2} className="px-5 mt-12 lg:px-0">
        Wind
      </Heading>
      <LoadingChart text="Not implemented" />
    </div>
  );
};
