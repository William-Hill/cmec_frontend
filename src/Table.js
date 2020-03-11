import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  align-items: center;
  margin-top: 2em;
  .title {
    justify-self: start;
    font-size: 25px;
    font-weight: 600;
    padding-left: 20px;
  }
`;

function Table(props) {
  return (
    <Container>
      {/* Leaving this empty div because deleting it somehow breaks the layout */}
      <h2 className="title">{props.title}</h2>
      <table id="scoresTable" className="table-header-rotated">
        <thead>
          <tr>
            <th />
            {props.tableHeaderValues.map((headerValue, i) => (
              <th key={headerValue} className="rotate">
                <div>{headerValue}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{props.rows}</tbody>
      </table>
    </Container>
  );
}

export default Table;
