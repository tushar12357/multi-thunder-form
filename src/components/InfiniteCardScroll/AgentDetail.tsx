import React from "react";
import { ArrowLeft, Mic, Star, Users, Clock, Award } from "lucide-react";
import "./AgentDetail.css";
import { CardInterface } from "../../types";
import { agentDetails } from "../../data/data";

interface AgentDetailProps {
  agent: CardInterface;
  onBack: () => void;
  handleStart: (agent: CardInterface) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
}

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  handleStart,
  onBack,
  handleEnd,
  getAgentName,
}) => {
  const Icon = agent.icon;
  const details = agentDetails[agent.title as keyof typeof agentDetails];

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(agent);
    getAgentName(agent.title);
  };

  return (
    <div className="agent-detail-container">
      <div className="agent-detail-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to agents"
        >
          <ArrowLeft size={20} />
          <span>Back to Agents</span>
        </button>
      </div>

      <div className="agent-detail-content">
        <div className="agent-hero">
          <div
            className="agent-hero-icon"
            style={{ backgroundColor: agent.imageUrl }}
          >
            <Icon size={48} className="text-white" />
          </div>
          <div className="agent-hero-info">
            <h1 className="agent-title">{agent.title}</h1>
            <p className="agent-subtitle">AI Agent</p>
            <p className="agent-description">{agent.description}</p>
          </div>
          <button className="try-demo-hero-button" onClick={handleTryDemo}>
            <Mic size={20} />
            Try Demo Now
          </button>
        </div>

        {details && (
          <>
            <div className="agent-stats">
              <div className="stat-card">
                <Star className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{details.stats.satisfaction}</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
              </div>
              <div className="stat-card">
                <Clock className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{details.stats.responseTime}</div>
                  <div className="stat-label">Response Time</div>
                </div>
              </div>
              <div className="stat-card">
                <Users className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">
                    {Object.values(details.stats)[2]}
                  </div>
                  <div className="stat-label">Success Metric</div>
                </div>
              </div>
            </div>

            <div className="agent-details-grid">
              <div className="detail-section">
                <h2 className="section-title">
                  <Award size={24} />
                  About This Agent
                </h2>
                <p className="section-description">{details.fullDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="detail-section">
                  <h2 className="section-title">Problems</h2>
                  <ul className="feature-list">
                    {details.problems.map((problem, index) => (
                      <li key={index} className="feature-item">
                        <div className="feature-bullet"></div>
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h2 className="section-title">Solutions</h2>
                  <ul className="use-case-list">
                    {details.solutions.map((solution, index) => (
                      <li key={index} className="use-case-item">
                        <div className="use-case-number">{index + 1}</div>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h2>Ready to Experience This Agent?</h2>
              <p>
                Click the button below to start an interactive demo and see how
                this AI agent can transform your business.
              </p>
              <button className="cta-button" onClick={handleTryDemo}>
                <Mic size={20} />
                Start Interactive Demo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};