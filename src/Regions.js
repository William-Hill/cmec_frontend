import React, { Fragment } from "react";
import { useGlobal } from "reactn";
import Select from "react-select";

function Regions(props) {
  console.log("props:", props);
  const [selectedRegion, setselectedRegion] = useGlobal("region");
  let regionsList = [];

  function updateRegion(region) {
    console.log("region select:", region);
    setselectedRegion(region);
  }
  for (let region of props.regions) {
    regionsList.push({
      label: Object.values(region)[0],
      value: Object.keys(region)[0]
    });
  }
  console.log("regionsList array:", regionsList);
  return (
    <Fragment>
      <h2>Regions</h2>
      <div className="text-center">
        <Select
          onChange={updateRegion}
          options={regionsList}
          value={{ label: selectedRegion.label, value: selectedRegion }}
        />
      </div>
    </Fragment>
  );
}

export default Regions;
