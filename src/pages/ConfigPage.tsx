import React from "react";
import { useNavigate } from "react-router-dom";
import InitialConfigForm from "../components/InitialConfigForm/InitialConfigForm";
import "./ConfigPage.scss";

const ConfigPage: React.FC = () => {
  return (
    <div className="config-page">
      <InitialConfigForm />
    </div>
  );
};

export default ConfigPage;
