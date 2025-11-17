import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citizenshipId: null,
  startDate: "",
  daysCount: 1,
  destinationCountry: "",
  boardType: "",
  dailySelections: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCitizenship(state, action) {
      state.citizenshipId = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setDaysCount(state, action) {
      state.daysCount = action.payload;
    },
    setDestinationCountry(state, action) {
      state.destinationCountry = action.payload;
    },
    setBoardType(state, action) {
      state.boardType = action.payload;
    },
    setDailySelections(state, action) {
      state.dailySelections = action.payload;
    },

    updateDailySelection(state, action) {
      const { dayIndex, field, value } = action.payload;

      const day = state.dailySelections[dayIndex];
      if (!day) return;

      day[field] = value;
    },
  },
});

export const {
  setCitizenship,
  setStartDate,
  setDaysCount,
  setDestinationCountry,
  setBoardType,
  setDailySelections,
  updateDailySelection,
} = bookingSlice.actions;

export default bookingSlice.reducer;
