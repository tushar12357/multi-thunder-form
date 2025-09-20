import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UltravoxSession } from "ultravox-client";
import { CardInterface } from "./types";
import { AgentDetail } from "./components/InfiniteCardScroll/AgentDetail";
import { InfiniteCardScroll } from "./components/InfiniteCardScroll/InfiniteCardScroll";
import { mockCards } from "./data/mockCards";

const App: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  const [callSessionId, setCallSessionId] = useState<string | null>(null);
  const [showRealEstateAgentVoice, setShowRealEstateAgentVoice] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<CardInterface | null>(null);
  const sessionRef = useRef<UltravoxSession | null>(null);

  // Initialize UltravoxSession
  if (!sessionRef.current) {
    sessionRef.current = new UltravoxSession();
  }

  // Handle session status changes
  useEffect(() => {
    const handleStatus = (event: any) => {
      console.log("Session status changed: ", event);
      setSessionStatus(sessionRef.current?.status || null);
    };
    sessionRef.current?.addEventListener("status", handleStatus);
    return () => {
      sessionRef.current?.removeEventListener("status", handleStatus);
    };
  }, []);

  // Handle call end when session disconnects
  useEffect(() => {
    if (sessionStatus === "disconnected") {
      handleEnd();
      setShowRealEstateAgentVoice(false);
    }
  }, [sessionStatus]);

  const handleStart = async (agent_code: string, leadData?: { name: string; email: string; phone: string }) => {
    if (sessionStatus !== "disconnected") {
      await handleEnd();
    }

    try {
      if (!isListening) {
        const response = await axios.post("https://app.snowie.ai/api/start-thunder/", {
          agent_code,
          schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
          ...leadData, // Include lead data if provided
        });
        const wssUrl = response.data.joinUrl;
        setCallId(response.data.callId);
        setCallSessionId(response.data.call_session_id);

        if (wssUrl) {
          sessionRef.current?.joinCall(wssUrl);
        }
        setIsListening(true);
      } else {
        await sessionRef.current?.leaveCall();
        await axios.post("https://app.snowie.ai/api/end-call-session-thunder/", {
          call_session_id: callSessionId,
          call_id: callId,
          schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
        });
        setIsListening(false);
      }
    } catch (error) {
      console.error("Error in handleStart:", error);
    }
  };

  const handleEnd = async () => {
    await sessionRef.current?.leaveCall();
    setShowRealEstateAgentVoice(false);
    setIsListening(false);
  };

  const handleAgentSelect = (agent: CardInterface) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {selectedAgent ? (
        <AgentDetail
          agent={selectedAgent}
          onBack={handleBack}
          handleStart={() => setShowRealEstateAgentVoice(true)} // Show form instead of starting directly
          handleEnd={handleEnd}
          getAgentName={(agentName: string) => console.log("Agent Name:", agentName)}
        />
      ) : (
        <InfiniteCardScroll
          cards={mockCards}
          handleStart={() => setShowRealEstateAgentVoice(true)} // Show form instead of starting directly
          handleEnd={handleEnd}
          stopScrolls={showRealEstateAgentVoice}
          resumeScrolls={!showRealEstateAgentVoice}
          showRealEstateAgentVoice={showRealEstateAgentVoice}
          sessionStatus={sessionStatus}
          onAgentSelect={handleAgentSelect}
          handleStartWithLead={handleStart} // Pass handleStart for form submission
          selectedAgent={selectedAgent} // Pass selected agent for form context
        />
      )}
    </div>
  );
};

export default App;