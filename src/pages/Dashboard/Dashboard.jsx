import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  House, 
  User, 
  Envelope, 
  Globe, 
  SignOut, 
  Plus,
  List,
  Clock,
  Calendar
} from '@phosphor-icons/react';
import PomodoroTimer from '../../components/PomodoroTimer/PomodoroTimer';
import Calendar from '../../components/Calendar/Calendar';
import TaskManager from '../../components/TaskManager/TaskManager';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('calendar');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'tasks':
        return <TaskManager />;
      case 'calendar':
      default:
        return <Calendar />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">⚡</span>
            Flowzy
          </h1>
        </div>
        
        <nav className="header-icons">
          <button 
            className={`nav-button ${activeView === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveView('calendar')}
          >
            <House size={24} />
            <span>Início</span>
          </button>
          
          <button 
            className={`nav-button ${activeView === 'pomodoro' ? 'active' : ''}`}
            onClick={() => setActiveView('pomodoro')}
          >
            <Clock size={24} />
            <span>Pomodoro</span>
          </button>
          
          <button 
            className={`nav-button ${activeView === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveView('tasks')}
          >
            <List size={24} />
            <span>Tarefas</span>
          </button>
          
          <button className="nav-button">
            <Envelope size={24} />
          </button>
          
          <button className="nav-button">
            <Globe size={24} />
          </button>
          
          <div className="user-menu">
            <button className="user-button">
              <User size={24} />
              <span>{user?.name || 'Usuário'}</span>
            </button>
            
            <button className="logout-button" onClick={handleLogout}>
              <SignOut size={20} />
              Sair
            </button>
          </div>
        </nav>
      </header>

      <main className="dashboard-main">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Menu Rápido</h3>
            <button className="sidebar-button">
              <Plus size={20} />
              Nova Tarefa
            </button>
            <button className="sidebar-button">
              <Plus size={20} />
              Novo Evento
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Estatísticas</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Tarefas Hoje</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Concluídas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Pendentes</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Próximos Eventos</h3>
            <div className="upcoming-events">
              <div className="event-item">
                <div className="event-time">10:00</div>
                <div className="event-title">Reunião de Planejamento</div>
              </div>
              <div className="event-item">
                <div className="event-time">14:30</div>
                <div className="event-title">Revisão de Código</div>
              </div>
            </div>
          </div>
        </aside>

        <section className="main-content">
          {renderActiveView()}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;