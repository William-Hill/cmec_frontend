import React, { Fragment } from "react";
import { useGlobal } from "reactn";
import Select from "react-select";

function Scalars(props) {
  const [scalar, setScalar] = useGlobal("scalar");
  let scalars = [];

  function updateScalar(scalar) {
    setScalar(scalar.label);
  }

  for (let scalar of props.scalars) {
    // console.log("scalar:", scalar);
    var lastIndex = scalar.lastIndexOf(" ");
    // console.log("lastIndex:", lastIndex);
    let value = scalar.substring(0, lastIndex);
    scalars.push({ label: scalar, value: value });
  }
  return (
    <Fragment>
      <h2>Scalars</h2>
      <div className="text-center">
        <Select
          onChange={updateScalar}
          options={scalars}
          value={{ label: scalar, value: scalar }}
        />
      </div>
    </Fragment>
  );
}

export default Scalars;
