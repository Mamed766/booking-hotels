import React from "react";
import "./DailyConfigTable.scss";
import { useSelector } from "react-redux";
import DailyRow from "./DailyRow";

const DailyConfigTable = () => {
  const booking = useSelector((state: any) => state.booking);
  const {
    dailySelections,
    destinationCountry,
    boardType,
    startDate,
    daysCount,
  } = booking;

  const isReady = startDate && daysCount > 0 && destinationCountry && boardType;

  if (!isReady) {
    return (
      <div className="daily-config-placeholder">
        Please complete the trip configuration to set daily hotel & meal plans.
      </div>
    );
  }

  if (!dailySelections || dailySelections.length === 0) {
    return (
      <div className="daily-config-placeholder">
        No days generated. Please check start date and days count.
      </div>
    );
  }

  return (
    <div className="daily-config">
      <h2 className="daily-title">Daily Hotel & Meal Plan</h2>

      <div className="daily-table-wrapper">
        <table className="daily-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Hotel</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {dailySelections.map((day: any, index: number) => (
              <DailyRow
                key={day.dayIndex ?? index}
                day={day}
                index={index}
                boardType={boardType}
                destinationCountry={destinationCountry}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyConfigTable;
