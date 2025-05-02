import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../Css/Counttable.css";
import { useNavigate } from "react-router-dom";

const Counttable = () => {
  const [teamData, setTeamData] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const navigate = useNavigate();

  // Fetch team data
  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://signpostphonebook.in/try_totalcount_for_new_database.php"
      );
      const data = await response.json();

      setTeamData(data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch calendar data for a specific user
  const fetchCalendarData = async (userid) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/fetch_events_for_new_database.php?userid=${userid}`
      );
      if (!response.ok) throw new Error("Failed to fetch calendar data.");
      const data = await response.json();

      if (Array.isArray(data)) {
        setCalendarEvents(
          data.map((entry) => ({
            title: `Count: ${entry.count}`,
            date: entry.date,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  // Fetch business list data for a specific member
  const fetchBusinessList = async (memberId) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/try_fetch_buisnessname.php?id=${memberId}`
      );
      const text = await response.text();
      console.log("business name's:", text); // Debug raw response
      const data = JSON.parse(text); // Parse JSON data
      if (data.error) {
        console.error(data.error);
        setBusinessList([]);
      } else if (data.message) {
        console.log(data.message);
        setBusinessList([]);
      } else {
        setBusinessList(data); // Set the list of business names
      }
    } catch (error) {
      console.error("Error fetching business list:", error);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const openCalendarModal = (member) => {
    setSelectedMember(member);
    fetchCalendarData(member.userid);
    setIsModalOpen(true);
  };

  const closeCalendarModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setCalendarEvents([]);
  };

  const openListModal = () => {
    if (selectedMember) {
      fetchBusinessList(selectedMember.id);
      setIsListModalOpen(true);
    }
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
    setBusinessList([]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="team-container">
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          navigate("/admin");
        }}
      >{`<< Back`}</button>
      <h2 className="team-title">Team</h2>
      <table className="team-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Total Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((member) => (
            <tr key={member.userid}>
              <td>{member.userid}</td>
              <td>{member.name || "No Name"}</td>
              <td>{member.total_count || "N/A"}</td>
              <td>
                <button
                  onClick={() => openCalendarModal(member)}
                  aria-label={`Open calendar for ${member.name}`}
                >
                  <ArrowForwardIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedMember.name}'s Calendar</h3>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height={"70vh"}
            />
            <button className="clsbtn" onClick={closeCalendarModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counttable;
