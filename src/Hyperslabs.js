import React, { Fragment, useContext, useState } from "react";
import { global, useGlobal, setGlobal } from "reactn";
import * as bulmaToast from "bulma-toast";

function showCheckboxErrorMessage() {
  bulmaToast.toast({
    message: "A maximum of 2 hyperslabs can be selected at a time.",
    type: "is-danger",
    duration: 2000,
    position: "bottom-center",
    closeOnClick: true,
    dismissible: true,
    animate: { in: "fadeIn", out: "fadeOut" }
  });
}

function HyperslabAxisRadioSelector(props) {
  const [hyperslabOptions] = useGlobal("hyperslabs");
  let oppositeHyperslab;
  if (props.hyperslabName === "rowsHyperslab") {
    oppositeHyperslab = "columnsHyperslab";
  } else {
    oppositeHyperslab = "rowsHyperslab";
  }

  const [oppositeHyperslabValue] = useGlobal(oppositeHyperslab);
  const [hyperslabsList] = useGlobal("hyperslabs");
  const [hyperslab, setHyperslab] = useGlobal(props.hyperslabName);
  const [availableHyperslabs, setAvailableHyperslabs] = useGlobal(
    "availableHyperslabs"
  );
  const [hyperslabDropdown, setRowsHyperslabDropdown] = useGlobal(
    props.hyperslabDropdown
  );
  const [global, setGlobal] = useGlobal();

  function updateHyperslab(changeEvent) {
    let targetID = changeEvent.target.id.split("_")[1];
    setAvailableHyperslabs(
      hyperslabsList.filter(
        d => ![global[oppositeHyperslab], targetID].includes(d)
      )
    );
    setRowsHyperslabDropdown(props.selectedHyperslab);
    setHyperslab(targetID);
    setGlobal({
      [props["hyperslabName"]]: targetID
    });
  }
  return (
    <Fragment>
      <h2>{props.title}</h2>
      <div className="radio">
        {hyperslabOptions.map((hyperslab, i) => {
          return (
            <Fragment>
              <input
                className="is-checkradio"
                id={`${props.hyperslabName}_${hyperslab}`}
                type="radio"
                name={`${props.hyperslabName}${hyperslab}Checkbox`}
                checked={props.selectedHyperslab === hyperslab}
                disabled={oppositeHyperslabValue === hyperslab}
                onChange={updateHyperslab}
              />
              <label
                key={hyperslab}
                for={`${props.hyperslabName}_${hyperslab}`}
                className="label_checkbox"
              >
                {hyperslab}
              </label>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}

export default HyperslabAxisRadioSelector;
