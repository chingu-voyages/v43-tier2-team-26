import React, { useState } from 'react';
// import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AvailabilityGrid.styles.css'


export const AvailabilityGrid = ({ daysDiff, timeDiff }) => {
  const [selectedCells, setSelectedCells] = useState([]);

  const toggleCell = (rowIndex, colIndex) => {
    const cell = `${rowIndex},${colIndex}`;
    if (selectedCells.includes(cell)) {
      setSelectedCells(selectedCells.filter((c) => c !== cell));
    } else {
      setSelectedCells([...selectedCells, cell]);
    }
  };

  const getCellClass = (rowIndex, colIndex) => {
    const cell = `${rowIndex},${colIndex}`;
    return selectedCells.includes(cell) ? "selected" : "";
  };

  const renderTableHeader = () => {
    const headers = [];
    for (let i = 0; i < daysDiff; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const month = date.toLocaleDateString("en-US", { month: "short" });
      const day = date.toLocaleDateString("en-US", { day: "numeric" });
      headers.push(
        <th key={i} className="header">
          <div className="day">{dayOfWeek}</div>
          <div className="date">
            {month} {day}
          </div>
        </th>
      );
    }
    return <tr>{headers}</tr>;
  };

  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < timeDiff; i++) {
      const startHour = i + 9;
      const endHour = startHour + 1;
      const row = (
        <tr key={i}>
          <td className="time">{`${startHour}:00 - ${endHour}:00`}</td>
          {Array.from({ length: daysDiff }).map((_, j) => (
            <td
              key={j}
              className={getCellClass(i, j)}
              onClick={() => toggleCell(i, j)}
            ></td>
          ))}
        </tr>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <table className="availability-grid">
      <thead>{renderTableHeader()}</thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};