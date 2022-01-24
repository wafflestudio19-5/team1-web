import { useLocation } from "react-router";
import { useMemo } from "react";
import dayjs from "dayjs";

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const hoursBetween = (date: Date) => {
  // calculate past time amount
  return Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000 / 60 / 60
  );
};

export const dayFormat = (date: Date) => {
  return dayjs(date).format(" YY.MM.DD") + " at " + dayjs(date).format("HH:mm");
};
