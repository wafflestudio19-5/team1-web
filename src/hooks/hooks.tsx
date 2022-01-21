import { useLocation } from "react-router";
import { useMemo } from "react";
import dayjs from "dayjs";

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const daysBetween = (date: Date) => {
  return new Date().getDate() - new Date(date).getDate();
};

export const dayFormat = (date: Date) => {
  return dayjs(date).format(" YY/MM/DD") + " at " + dayjs(date).format("HH:mm");
};
