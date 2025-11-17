import { hotels } from "../data/hotels";
import { meals } from "../data/meals";

export type DaySelection = {
  date: string;
  hotelId: number | null;
  lunchId: number | null;
  dinnerId: number | null;
  [key: string]: any;
};

export const getHotelPrice = (
  destinationCountry: string,
  hotelId: number | null
): number => {
  if (!destinationCountry || !hotelId) return 0;
  const list = (hotels as any)[destinationCountry] || [];
  const found = list.find((h: any) => h.id === hotelId);
  return found ? found.price : 0;
};

const findMeal = (
  destinationCountry: string,
  mealId: number | null
): any | null => {
  if (!destinationCountry || !mealId) return null;

  const countryMeals = (meals as any)[destinationCountry];
  if (!countryMeals) return null;

  const allMeals = [
    ...(countryMeals.lunch || []),
    ...(countryMeals.dinner || []),
  ];

  return allMeals.find((m: any) => m.id === mealId) || null;
};

export const getMealPrice = (
  destinationCountry: string,
  mealId: number | null
): number => {
  const meal = findMeal(destinationCountry, mealId);
  return meal ? meal.price : 0;
};

export const getDailyTotal = (
  destinationCountry: string,
  day: DaySelection
) => {
  const hotelPrice = getHotelPrice(destinationCountry, day.hotelId);
  const lunchPrice = getMealPrice(destinationCountry, day.lunchId);
  const dinnerPrice = getMealPrice(destinationCountry, day.dinnerId);

  const total = hotelPrice + lunchPrice + dinnerPrice;

  return {
    hotelPrice,
    lunchPrice,
    dinnerPrice,
    total,
  };
};

export const getGrandTotal = (
  destinationCountry: string,
  days: DaySelection[]
): number => {
  if (!destinationCountry || !days || days.length === 0) return 0;

  return days.reduce((sum, day) => {
    const { total } = getDailyTotal(destinationCountry, day);
    return sum + total;
  }, 0);
};
