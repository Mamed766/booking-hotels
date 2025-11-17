import React from "react";
import "./Summary.scss";
import { useSelector } from "react-redux";
import { countries } from "../../data/countries";
import { boardTypes } from "../../data/boardTypes";
import { hotels } from "../../data/hotels";
import { meals } from "../../data/meals";
import {
  getDailyTotal,
  getGrandTotal,
  DaySelection,
} from "../../utils/priceCalculator";

const Summary: React.FC = () => {
  const booking = useSelector((state: any) => state.booking);
  const {
    citizenshipId,
    startDate,
    daysCount,
    destinationCountry,
    boardType,
    dailySelections,
  } = booking;

  const isReady =
    startDate &&
    daysCount > 0 &&
    destinationCountry &&
    boardType &&
    dailySelections &&
    dailySelections.length > 0;

  if (!isReady) {
    return (
      <div className="summary-placeholder">
        Complete your configuration and daily plan to see summary & prices.
      </div>
    );
  }

  const citizenshipName =
    countries.find((c) => c.id === citizenshipId)?.name || "-";

  const boardTypeName =
    boardTypes.find((b) => b.code === boardType)?.name || boardType;

  const availableHotels =
    destinationCountry && (hotels as any)[destinationCountry]
      ? (hotels as any)[destinationCountry]
      : [];

  const countryMeals =
    destinationCountry && (meals as any)[destinationCountry]
      ? (meals as any)[destinationCountry]
      : null;

  const getHotelName = (hotelId: number | null) => {
    if (!hotelId) return "-";
    const found = availableHotels.find((h: any) => h.id === hotelId);
    return found ? found.name : "-";
  };

  const getMealName = (mealId: number | null) => {
    if (!mealId || !countryMeals) return "-";
    const allMeals = [
      ...(countryMeals.lunch || []),
      ...(countryMeals.dinner || []),
    ];
    const found = allMeals.find((m: any) => m.id === mealId);
    return found ? found.name : "-";
  };

  const dailyWithTotals = (dailySelections as DaySelection[]).map((day) => ({
    day,
    breakdown: getDailyTotal(destinationCountry, day),
  }));

  const grandTotal = getGrandTotal(
    destinationCountry,
    dailySelections as DaySelection[]
  );

  return (
    <div className="summary">
      <h2 className="summary-title">Summary & Price</h2>

      {/*  Config Summary */}
      <div className="summary-section">
        <h3>Configuration Summary</h3>
        <div className="summary-config-grid">
          <div className="summary-card">
            <span className="label">Citizenship</span>
            <span className="value">{citizenshipName}</span>
          </div>
          <div className="summary-card">
            <span className="label">Start Date</span>
            <span className="value">{startDate || "-"}</span>
          </div>
          <div className="summary-card">
            <span className="label">Days</span>
            <span className="value">{daysCount}</span>
          </div>
          <div className="summary-card">
            <span className="label">Destination</span>
            <span className="value">{destinationCountry}</span>
          </div>
          <div className="summary-card">
            <span className="label">Board Type</span>
            <span className="value">{boardTypeName}</span>
          </div>
        </div>
      </div>

      {/*  Daily Selections */}
      <div className="summary-section">
        <h3>Daily Selections</h3>
        <div className="daily-list">
          {dailySelections.map((day: any, index: number) => (
            <div key={index} className="daily-item">
              <div className="daily-header">
                <span className="day-chip">Day {index + 1}</span>
                <span className="day-date">{day.date}</span>
              </div>
              <div className="daily-body">
                <div className="row">
                  <span className="label">Hotel:</span>
                  <span className="value">{getHotelName(day.hotelId)}</span>
                </div>
                <div className="row">
                  <span className="label">Lunch:</span>
                  <span className="value">{getMealName(day.lunchId)}</span>
                </div>
                <div className="row">
                  <span className="label">Dinner:</span>
                  <span className="value">{getMealName(day.dinnerId)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Calculation */}
      <div className="summary-section">
        <h3>Price Breakdown</h3>
        <div className="price-table-wrapper">
          <table className="price-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Hotel</th>
                <th>Meals</th>
                <th>Total / Day ($)</th>
              </tr>
            </thead>
            <tbody>
              {dailyWithTotals.map(({ day, breakdown }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{day.date}</td>
                  <td>${breakdown.hotelPrice}</td>
                  <td>
                    {breakdown.lunchPrice > 0 && (
                      <span>Lunch: ${breakdown.lunchPrice}&nbsp;</span>
                    )}
                    {breakdown.dinnerPrice > 0 && (
                      <span>Dinner: ${breakdown.dinnerPrice}</span>
                    )}
                    {breakdown.lunchPrice === 0 &&
                      breakdown.dinnerPrice === 0 && <span>-</span>}
                  </td>
                  <td>${breakdown.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grand-total">
          <span>Total for all days:</span>
          <span className="grand-total-value">${grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
