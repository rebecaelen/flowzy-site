import React, { useState, useEffect } from 'react';
import { Play, Pause, Reset } from '@phosphor-icons/react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, break
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Timer completed
      if (mode === 'work') {
        setCompletedSessions(prev => prev + 1);
        if (completedSessions % 3 === 2) {
          // Long break after 4 sessions
          setTime(15 * 60);
          setMode('longBreak');
        } else {
          // Short break
          setTime(5 * 60);
          setMode('break');
        }
      } else {
        // Break completed, back to work
        setTime(25 * 60);
        setMode('work');
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, time, mode, completedSessions]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setMode('work');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'work': return 'Tempo de Trabalho';
      case 'break': return 'Intervalo Curto';
      case 'longBreak': return 'Intervalo Longo';
      default: return '';
    }
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-card">
        <div className="pomodoro-header">
          <h2>Técnica Pomodoro</h2>
          <p className="mode-label">{getModeLabel()}</p>
        </div>
        
        <div className="timer-display">
          <div className="timer-circle">
            <div className="timer-text">{formatTime(time)}</div>
            <div className="timer-progress">
              <svg className="progress-ring" viewBox="0 0 100 100">
                <circle
                  className="progress-ring-circle"
                  stroke={mode === 'work' ? '#667eea' : '#48bb78'}
                  strokeWidth="8"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  style={{
                    strokeDasharray: 264,
                    strokeDashoffset: 264 - (264 * (time / (mode === 'work' ? 1500 : mode === 'break' ? 300 : 900)))
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="timer-controls">
          <button
            className={`control-button ${isActive ? 'pause' : 'play'}`}
            onClick={toggleTimer}
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          
          <button
            className="control-button reset"
            onClick={resetTimer}
          >
            <Reset size={24} />
            Resetar
          </button>
        </div>
        
        <div className="pomodoro-stats">
          <div className="stat">
            <span className="stat-value">{completedSessions}</span>
            <span className="stat-label">Sessões Concluídas</span>
          </div>
        </div>
        
        <div className="pomodoro-info">
          <h3>Como funciona:</h3>
          <ul>
            <li>25 minutos de trabalho focado</li>
            <li>5 minutos de pausa curta</li>
            <li>Após 4 sessões, 15 minutos de pausa longa</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;