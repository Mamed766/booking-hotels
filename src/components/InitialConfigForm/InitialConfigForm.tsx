import React from "react";
import "./InitialConfigForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setCitizenship,
  setStartDate,
  setDaysCount,
  setDestinationCountry,
  setBoardType,
  setDailySelections,
} from "../../store/bookingSlice";

import { countries } from "../../data/countries";
import { boardTypes } from "../../data/boardTypes";
import { useNavigate } from "react-router-dom";

const InitialConfigForm = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state: any) => state.booking);
  const navigate = useNavigate();

  const generateDailySelections = (startDate: string, days: number) => {
    if (!startDate || days < 1) return [];

    const selections = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      selections.push({
        dayIndex: i,
        date: date.toISOString().split("T")[0],
        hotelId: null,
        lunchId: null,
        dinnerId: null,
      });
    }
    return selections;
  };

  const handleStartDate = (value: string) => {
    dispatch(setStartDate(value));
    const updated = generateDailySelections(value, booking.daysCount);
    dispatch(setDailySelections(updated));
  };

  const handleDaysCount = (value: number) => {
    dispatch(setDaysCount(value));
    if (booking.startDate) {
      const updated = generateDailySelections(booking.startDate, value);
      dispatch(setDailySelections(updated));
    }
  };

  const isConfigReady =
    booking.citizenshipId &&
    booking.startDate &&
    booking.daysCount > 0 &&
    booking.destinationCountry &&
    booking.boardType;

  const handleContinue = () => {
    if (!isConfigReady) return;
    navigate("/plan");
  };

  return (
    <div className="config-wrapper">
      <div className="initial-config">
        <h2 className="title">Trip Configuration</h2>

        {/* Citizenship */}
        <div className="form-group">
          <label>Citizenship</label>
          <select
            value={booking.citizenshipId || ""}
            onChange={(e) => dispatch(setCitizenship(Number(e.target.value)))}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={booking.startDate}
            onChange={(e) => handleStartDate(e.target.value)}
          />
        </div>

        {/* Days Count */}
        <div className="form-group">
          <label>Days</label>
          <input
            type="number"
            min={1}
            value={booking.daysCount}
            onChange={(e) => handleDaysCount(Number(e.target.value))}
          />
        </div>

        {/* Destination */}
        <div className="form-group">
          <label>Destination Country</label>
          <select
            value={booking.destinationCountry}
            onChange={(e) => dispatch(setDestinationCountry(e.target.value))}
          >
            <option value="">Select destination</option>
            <option value="Turkey">Turkey</option>
            <option value="UAE">UAE</option>
            <option value="Italy">Italy</option>
          </select>
        </div>

        {/* Board Types */}
        <div className="form-group">
          <label>Board Type</label>
          <div className="board-options">
            {boardTypes.map((b) => (
              <label key={b.code} className="board-item">
                <input
                  type="radio"
                  name="boardType"
                  value={b.code}
                  checked={booking.boardType === b.code}
                  onChange={(e) => dispatch(setBoardType(e.target.value))}
                />
                {b.name}
              </label>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="config-continue-btn"
          onClick={handleContinue}
          disabled={!isConfigReady}
        >
          Continue to Daily Plan
        </button>
      </div>
    </div>
  );
};

export default InitialConfigForm;
