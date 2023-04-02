import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './AvailabilityGrid.styles.css';

const styles = {
  selectedCell: {
    backgroundColor: '#00c853',
  },
};

function AvailabilityGrid() {
  const [selected, setSelected] = useState([]);

  // Helper function to determine if a cell is selected
  function isCellSelected(row, col) {
    return selected.some((cell) => cell.row === row && cell.col === col);
  }

  // Helper function to deselect a cell
  function deselectCell(row, col) {
    const newSelected = selected.filter((cell) => !(cell.row === row && cell.col === col));
    setSelected(newSelected);
  }

  // Event handlers for clicking and dragging on the grid
  function handleMouseDown(row, col) {
    if (isCellSelected(row, col)) {
      deselectCell(row, col);
    } else {
      setSelected([...selected, { row, col }]);
    }
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
          if (!isCellSelected(r, c)) {
            newSelected.push({ row: r, col: c });
          }
        }
      }

      setSelected([...selected, ...newSelected]);
    }
  }

  function handleMouseUp() {
    // Save selected cells to the database
  }

  // Generate the table rows and cells for the grid
  const rows = [];
  const times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

  // Create an array of boolean values to represent selected times
  const timeSelection = times.map((time) => {
    return selected.some((cell) => cell.row === times.indexOf(time));
  });

  // Generate the time column
  const timeColumn = times.map((time) => {
    return (
      <td key={`time-${time}`} style={{ fontWeight: 'bold' }}>
        {time}
      </td>
    );
  });

  // Generate the availability column
  const availabilityColumn = timeSelection.map((isSelected, index) => {
    const cellStyle = isSelected ? styles.selectedCell : {};
    return (
      <td
        key={`cell-${index}`}
        style={cellStyle}
        onMouseDown={() => handleMouseDown(index, 0)}
        onMouseEnter={() => handleMouseEnter(index, 0)}
        onMouseUp={handleMouseUp}
      />
    );
  });

  // Add time and availability columns to the rows array
  rows.push(
    <tr key="time-row">
      {timeColumn}
      <td key="availability-label" style={{ fontWeight: 'bold' }}>
        Availability
      </td>
    </tr>
  );
  rows.push(
    <tr key="availability-row">
      {availabilityColumn}
      <td key="availability-label" style={{ fontWeight: 'bold' }}>
        Availability
      </td>
    </tr>
  );

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