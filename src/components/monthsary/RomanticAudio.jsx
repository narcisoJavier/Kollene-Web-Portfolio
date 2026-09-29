import { useState, useEffect, useRef } from "react";
import { monthsaryConfig } from "../../data/monthsaryData";

export default function RomanticAudio({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy or error
      });
    }
  };

  // Handle autoPlayTrigger
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // User hasn't interacted yet
      });
    }
  }, [autoPlayTrigger, isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="romantic-audio-widget" title={`Soundtrack: ${monthsaryConfig.song.title} - ${monthsaryConfig.song.album}`}>
      <audio 
        ref={audioRef}
        src={monthsaryConfig.song.audioSrc}
        loop
        preload="auto"
      />

      <button 
        className={`audio-btn ${isPlaying ? "playing" : ""}`} 
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute soundtrack" : "Play our song"}
      >
        <span className="audio-icon">{isPlaying ? "🎵" : "🔇"}</span>
        <div className="audio-bars">
          <span className={`bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "0ms" }}></span>
          <span className={`bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "150ms" }}></span>
          <span className={`bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "300ms" }}></span>
        </div>
        <div className="audio-text-group">
          <span className="audio-label">
            {isPlaying ? monthsaryConfig.song.title : "Play Our Song"}
          </span>
          {isPlaying && (
            <span className="audio-sublabel">Between Two Bookends</span>
          )}
        </div>
      </button>

      {isPlaying && (
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="audio-volume-slider"
          title="Adjust Volume"
        />
      )}
    </div>
  );
}
