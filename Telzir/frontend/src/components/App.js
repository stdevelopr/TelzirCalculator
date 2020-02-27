import React from "react";
import SelectBox from "./SelectBox";
import { Wave } from "react-animated-text";

document.body.style.margin = "0px";
const App = () => (
  <div
    style={{
      height: "-webkit-fill-available",
      backgroundColor: "lightseagreen"
    }}
  >
    <div
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        color: "white",
        fontSize: "100px"
      }}
    >
      <div>
        <Wave text="Telzir" effect="color" effectChange="gold" speed={2} />
      </div>
    </div>
    <div style={{ display: "grid", justifyContent: "center" }}>
      <h2 style={{ color: "white" }}>Calculadora de custos</h2>
      <SelectBox />
    </div>
  </div>
);

export default App;
