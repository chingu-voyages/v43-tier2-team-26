import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./AvailabilityGrid.styles.css";

export const GroupGrid = () => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [availableGroupMembers, setAvailableGroupMembers] = useState([]);

  useEffect(() => {
    // fetch data and set as availabilityData state
    // data = array of objects (=one hours of availability w/ properties for time and array of available group members)
    const fakeAvailabilityData = [      { time: "09:00", availableMembers: ["User A", "User B"] },
      { time: "10:00", availableMembers: ["User A", "User B"] },
      { time: "11:00", availableMembers: ["User A", "User B"] },
      { time: "12:00", availableMembers: ["User A", "User B"] },
      { time: "13:00", availableMembers: ["User A"] },
      { time: "14:00", availableMembers: ["User A"] },
      { time: "15:00", availableMembers: ["User A", "User B"] },
      { time: "16:00", availableMembers: ["User B"] },
      { time: "17:00", availableMembers: [] },
    ];
    setAvailabilityData(fakeAvailabilityData);
  }, []);

  const handleAvailabilityHover = (time, availableMembers) => {
    setAvailableGroupMembers(availableMembers);
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>Time</th>
            <th>Availability</th>
          </tr>
        </thead>

        <tbody>
          {availabilityData.map((hour) => {
            const groupMembers = ["User A", "User B"]; // update this array as necessary
            const availablePercentage =
              (hour.availableMembers.length / groupMembers.length) * 100;
            return (
              <tr key={hour.time}>
                <td style={{ fontWeight: "bold" }}>{hour.time}</td>
                <td
                  className={hour.availableMembers.length > 0 ? "available" : ""}
                  style={
                    hour.availableMembers.length > 0
                      ? {
                          backgroundColor:
                            availablePercentage >= 75
                              ? "var(--good-match)"
                              : availablePercentage >= 50
                              ? "var(--okay-match)"
                              : "var(--bad-match)",
                        }
                      : {}
                  }
                  onMouseOver={() =>
                    handleAvailabilityHover(hour.time, hour.availableMembers)
                  }
                  onMouseOut={() => setAvailableGroupMembers([])}
                ></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>Group members available:</div>
      <ul id="groupmemberslist">
        {availableGroupMembers.map((member) => (
          <li id="groupmembers" key={member}>
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
};
