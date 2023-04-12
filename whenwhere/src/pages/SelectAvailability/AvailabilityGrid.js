import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './AvailabilityGrid.styles.css';

const styles = {
  selectedCell: {
    backgroundColor: '#00c853',
  },
};

export const AvailabilityGrid = () => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Call API to save selected cells to the database
  }, [selected]);

  // Helper function to determine if a cell is selected
  function isCellSelected(time) {
    return selected.includes(time);
  }

  // Helper function to select/deselect a cell
  function handleCellClick(time) {
    if (isCellSelected(time)) {
      const newSelected = selected.filter((t) => t !== time);
      setSelected(newSelected);
    } else {
      setSelected([...selected, time]);
    }
  }

  // Generate the table rows and cells for the grid
  const rows = [];
  const times = ['9', '10', '11', '12', '13', '14', '15', '16', '17'];

  // Generate the time column
  const timeColumn = times.map((time) => {
    return (
      <td key={`time-${time}`} style={{ fontWeight: 'bold' }}>
        {time}:00
      </td>
    );
  });

  // Generate the availability column
  const availabilityColumn = times.map((time) => {
    const isAvailable = isCellSelected(time);
    const cellStyle = isAvailable ? styles.selectedCell : {};
    return (
      <td
        key={`cell-${time}`}
        style={cellStyle}
        onClick={() => handleCellClick(time)}
      />
    );
  });

  // Add time and availability columns to the rows array
  rows.push(
    <tr key="time-row">
      <th>Time</th>
      <th>Availability</th>
    </tr>
  );
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    rows.push(
      <tr key={`availability-row-${time}`}>
        <td style={{ fontWeight: 'bold' }}>{time}:00</td>
        {availabilityColumn[i]}
      </tr>
    );
  }
  
  

  return (
    <div>
      <Table bordered className="availability-grid">
        <tbody>{rows}</tbody>
      </Table>
      <div>Availability is saved automatically.</div>
    </div>
  );
};
