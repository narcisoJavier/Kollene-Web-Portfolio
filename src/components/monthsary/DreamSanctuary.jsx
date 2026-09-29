import { useState } from "react";
import { dreamSanctuaryRooms } from "../../data/monthsaryData";

export default function DreamSanctuary() {
  const [selectedRoomId, setSelectedRoomId] = useState(dreamSanctuaryRooms[0].id);
  const [visitedRooms, setVisitedRooms] = useState(new Set([dreamSanctuaryRooms[0].id]));

  const activeRoom = dreamSanctuaryRooms.find((r) => r.id === selectedRoomId) || dreamSanctuaryRooms[0];

  const handleSelectRoom = (id) => {
    setSelectedRoomId(id);
    setVisitedRooms((prev) => new Set([...prev, id]));
  };

  const allVisited = visitedRooms.size === dreamSanctuaryRooms.length;

  return (
    <div className="sanctuary-section" id="sanctuary">
      <div className="section-intro">
        <span className="section-badge">Future Master Plan</span>
        <h3 className="section-heading">Drafting Our Dream Sanctuary</h3>
        <p className="section-subtext">
          A blueprint designed for two. Click each room to explore our future home together.
        </p>
      </div>

      <div className="sanctuary-progress">
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(visitedRooms.size / dreamSanctuaryRooms.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {visitedRooms.size} of {dreamSanctuaryRooms.length} rooms explored
        </span>
      </div>

      {allVisited && (
        <div className="unlocked-key-banner animate-fade-in">
          <span className="key-icon">🔑</span>
          <div className="key-text">
            <strong>Master Blueprint Complete!</strong>
            <span>Our forever home is fully planned. All that's left is to live it with you.</span>
          </div>
        </div>
      )}

      <div className="sanctuary-layout">
        {/* Interactive Floor Plan Selector */}
        <div className="floorplan-nav">
          <div className="floorplan-label">INTERACTIVE FLOOR PLAN</div>
          <div className="room-buttons">
            {dreamSanctuaryRooms.map((room) => {
              const isSelected = room.id === selectedRoomId;
              const isVisited = visitedRooms.has(room.id);
              return (
                <button
                  key={room.id}
                  className={`room-nav-btn ${isSelected ? "selected" : ""} ${isVisited ? "visited" : ""}`}
                  onClick={() => handleSelectRoom(room.id)}
                >
                  <span className="room-btn-icon">{room.icon}</span>
                  <div className="room-btn-text">
                    <span className="room-btn-name">{room.name}</span>
                    <span className="room-btn-coord">{room.blueprintCoord}</span>
                  </div>
                  {isVisited && <span className="visited-badge">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Room Detail Card */}
        <div className="room-display-card">
          <div className="room-card-header">
            <div className="room-card-icon-big">{activeRoom.icon}</div>
            <div>
              <span className="room-coord-tag">{activeRoom.blueprintCoord}</span>
              <h4 className="room-card-title">{activeRoom.name}</h4>
              <p className="room-card-sub">{activeRoom.subtitle}</p>
            </div>
          </div>

          <div className="room-card-body">
            <p className="room-details-text">{activeRoom.details}</p>

            <div className="room-perks-title">ROOM SPECIFICATIONS & AMENITIES:</div>
            <ul className="room-perks-list">
              {activeRoom.perks.map((perk, i) => (
                <li key={i} className="room-perk-item">
                  <span className="perk-check">✦</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="room-card-footer">
            <span className="architect-note">
              Designed with love by Javier &middot; Approved by Chief Architect Kollene
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
