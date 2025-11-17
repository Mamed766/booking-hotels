import React from "react";
import DailyConfigTable from "../components/DailyConfigTable/DailyConfigTable";
import Summary from "../components/Summary/Summary";

const PlanPage: React.FC = () => {
  return (
    <div>
      <DailyConfigTable />
      <Summary />
    </div>
  );
};

export default PlanPage;
