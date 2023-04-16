import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AvailabilityGrid.styles.css'

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

  // Generate the table rows for the grid
  const rows = [];
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const isAvailable = isCellSelected(time);
    const cellStyle = isAvailable ? styles.selectedCell : {};

    rows.push(
      <tr key={`availability-row-${time}`}>
        <td style={{ fontWeight: 'bold' }}>{time}</td>
        <td
          style={cellStyle}
          onClick={() => handleCellClick(time)}
        />
      </tr>
    );
  }

  return (
    <div>
      <Table bordered className="availability-grid">
        <thead>
          <tr>
            <th>Time</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <div>Availability is saved automatically.</div>
    </div>
  );
};
