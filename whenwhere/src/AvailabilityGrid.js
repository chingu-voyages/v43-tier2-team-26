import React, { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AvailabilityGrid.styles.css';

function AvailabilityGrid() {
  const [selected, setSelected] = useState([]);

  // Helper function to determine if a cell is selected
  function isCellSelected(row, col) {
    return selected.some((cell) => cell.row === row && cell.col === col);
  }

  // Event handlers for clicking and dragging on the grid
  function handleMouseDown(row, col) {
    setSelected([{ row, col }]);
  }

  function handleMouseEnter(row, col) {
    if (selected.length) {
      const startRow = selected[0].row;
      const startCol = selected[0].col;
      const endRow = row;
      const endCol = col;
      const newSelected = [];

      for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
        for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
          newSelected.push({ row: r, col: c });
        }
      }

      setSelected(newSelected);
    }
  }

  function handleMouseUp() {
    // Save selected cells to the database
  }

  // Generate the table rows and cells for the grid
  const rows = [];
  const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
  for (let r = 0; r < times.length; r++) {
    const cells = [];
    cells.push(
      <td key={`time-${r}`}>
        {times[r]}
      </td>
    );
    for (let c = 0; c < 1; c++) {
      const isSelected = isCellSelected(r, c);
      cells.push(
        <td
          key={`${r}-${c}`}
          className={isSelected ? 'selected' : ''}
          onMouseDown={() => handleMouseDown(r, c)}
          onMouseEnter={() => handleMouseEnter(r, c)}
          onMouseUp={handleMouseUp}
        />
      );
    }
    rows.push(<tr key={r}>{cells}</tr>);
  }

  return (
    <Table bordered className="availability-grid">
      <thead>
        <tr>
          <th>Time</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default AvailabilityGrid;