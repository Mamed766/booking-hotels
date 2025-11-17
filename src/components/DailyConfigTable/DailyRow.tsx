import React from "react";
import { useDispatch } from "react-redux";
import { updateDailySelection } from "../../store/bookingSlice";
import { hotels } from "../../data/hotels";
import { meals } from "../../data/meals";

type DailyRowProps = {
  day: any;
  index: number;
  boardType: string;
  destinationCountry: string;
};

const DailyRow: React.FC<DailyRowProps> = ({
  day,
  index,
  boardType,
  destinationCountry,
}) => {
  const dispatch = useDispatch();

  const availableHotels =
    destinationCountry && (hotels as any)[destinationCountry]
      ? (hotels as any)[destinationCountry]
      : [];

  const countryMeals =
    destinationCountry && (meals as any)[destinationCountry]
      ? (meals as any)[destinationCountry]
      : null;

  const lunchOptions = countryMeals?.lunch || [];
  const dinnerOptions = countryMeals?.dinner || [];

  const isNoBoard = boardType === "NB";
  const isHalfBoard = boardType === "HB";

  const disableLunch = isNoBoard || (isHalfBoard && day.dinnerId);
  const disableDinner = isNoBoard || (isHalfBoard && day.lunchId);

  const handleHotelChange = (value: string) => {
    dispatch(
      updateDailySelection({
        dayIndex: index,
        field: "hotelId",
        value: value ? Number(value) : null,
      })
    );
  };

  const handleLunchChange = (value: string) => {
    const parsed = value ? Number(value) : null;

    dispatch(
      updateDailySelection({
        dayIndex: index,
        field: "lunchId",
        value: parsed,
      })
    );

    // HB ise → lunch seçilince dinner sıfırlanır
    if (isHalfBoard && parsed !== null) {
      dispatch(
        updateDailySelection({
          dayIndex: index,
          field: "dinnerId",
          value: null,
        })
      );
    }
  };

  const handleDinnerChange = (value: string) => {
    const parsed = value ? Number(value) : null;

    dispatch(
      updateDailySelection({
        dayIndex: index,
        field: "dinnerId",
        value: parsed,
      })
    );

    // HB ise → dinner seçilince lunch sıfırlanır
    if (isHalfBoard && parsed !== null) {
      dispatch(
        updateDailySelection({
          dayIndex: index,
          field: "lunchId",
          value: null,
        })
      );
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{day.date}</td>

      {/* Hotel select */}
      <td>
        <select
          value={day.hotelId || ""}
          onChange={(e) => handleHotelChange(e.target.value)}
        >
          <option value="">Select hotel</option>
          {availableHotels.map((h: any) => (
            <option key={h.id} value={h.id}>
              {h.name} (${h.price})
            </option>
          ))}
        </select>
      </td>

      {/* Lunch select */}
      <td>
        <select
          value={day.lunchId || ""}
          onChange={(e) => handleLunchChange(e.target.value)}
          disabled={disableLunch}
        >
          <option value="">Select lunch</option>
          {lunchOptions.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.name} (${m.price})
            </option>
          ))}
        </select>
      </td>

      {/* Dinner select */}
      <td>
        <select
          value={day.dinnerId || ""}
          onChange={(e) => handleDinnerChange(e.target.value)}
          disabled={disableDinner}
        >
          <option value="">Select dinner</option>
          {dinnerOptions.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.name} (${m.price})
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default DailyRow;
