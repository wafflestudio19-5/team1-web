import { useLocation } from "react-router";
import { useMemo } from "react";
import dayjs from "dayjs";
import { Answer } from "../interface/interface";

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const removeSpace = (content: string) => {
  return content.replace(/(\s*)/g, "");
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

export const handleSorting = (sortType: string) => {
  switch (sortType) {
    case "Newest":
      return (a: Answer, b: Answer) =>
        (new Date(b.createdAt) ? 1 : 0) - (new Date(a.createdAt) ? 1 : 0);
    case "Votes":
      return (a: Answer, b: Answer) => (b.votes ? 1 : 0) - (a.votes ? 1 : 0);
    default:
      break;
  }
};

export const makePageList = (
  currentPage: number,
  totalPages: number
): ("..." | number)[] => {
  if (totalPages <= 10) {
    let l = [];
    for (let i = 1; i <= totalPages; i++) l.push(i);
    return l;
  } else if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  } else if (currentPage > totalPages - 4) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  }
};

export const makeQuery = (filter: string, page: number) =>
  `?tab=${filter}&page=${page}`;
