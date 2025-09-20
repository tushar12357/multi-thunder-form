import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UltravoxSession } from "ultravox-client";
import { CardInterface } from "./types";
import RealEstateAgentVoice from "./components/InfiniteCardScroll/RealEstateAgentVoice";
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
  const [currentAgentForForm, setCurrentAgentForForm] = useState<CardInterface | null>(null);
  const [defaultCountryCode, setDefaultCountryCode] = useState<string>("+1");
  const sessionRef = useRef<UltravoxSession | null>(null);

  // Initialize UltravoxSession
  if (!sessionRef.current) {
    sessionRef.current = new UltravoxSession();
  }

  // Fetch default country code on page load
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const countryCallingCode = response.data.country_calling_code || "+1";
        console.log("Fetched country code:", countryCallingCode);
        setDefaultCountryCode(countryCallingCode);
      } catch (error) {
        console.error("Error fetching country code:", error);
        setDefaultCountryCode("+1");
      }
    };
    fetchCountryCode();
  }, []); // Run only once on mount

  // Handle session status changes
  useEffect(() => {
    const handleStatus = (event: any) => {
      console.log("Session status changed:", event);
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
      console.log("Session disconnected, ending call");
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
        console.log("Starting Thunder API call with agent_code:", agent_code, "leadData:", leadData);
        const response = await axios.post("https://app.snowie.ai/api/start-thunder/", {
          agent_code,
          schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
          ...leadData,
        });
        console.log("start-thunder response:", response.data);
        const wssUrl = response.data.joinUrl;
        setCallId(response.data.callId);
        setCallSessionId(response.data.call_session_id);

        if (wssUrl) {
          console.log("Joining call with wssUrl:", wssUrl);
          sessionRef.current?.joinCall(wssUrl);
        }
        setIsListening(true);
      } else {
        console.log("Ending active call");
        await sessionRef.current?.leaveCall();
        await axios.post("https://app.snowie.ai/api/end-call-session-thunder/", {
          call_session_id: callSessionId,
          call_id: callId,
          schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
        });
        setIsListening(false);
        setShowRealEstateAgentVoice(false);
      }
    } catch (error) {
      console.error("Error in handleStart:", error);
      throw error; // Propagate error to handleSubmit
    }
  };

  const handleEnd = async () => {
    console.log("Handling call end");
    await sessionRef.current?.leaveCall();
    setShowRealEstateAgentVoice(false);
    setIsListening(false);
  };

  const handleAgentSelect = (agent: CardInterface) => {
    console.log("Selected agent:", agent.title);
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    console.log("Going back from agent detail");
    setSelectedAgent(null);
  };

  const showFormForAgent = (agent: CardInterface) => {
    console.log("Showing form for agent:", agent.title);
    setCurrentAgentForForm(agent);
    setShowRealEstateAgentVoice(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      {showRealEstateAgentVoice && (
        <RealEstateAgentVoice
          onClose={() => {
            console.log("Closing RealEstateAgentVoice");
            setShowRealEstateAgentVoice(false);
            setCurrentAgentForForm(null);
          }}
          sessionStatus={sessionStatus}
          handleStart={handleStart}
          selectedAgent={currentAgentForForm || selectedAgent}
          defaultCountryCode={defaultCountryCode}
        />
      )}
      {selectedAgent ? (
        <AgentDetail
          agent={selectedAgent}
          onBack={handleBack}
          handleStart={() => showFormForAgent(selectedAgent)}
          handleEnd={handleEnd}
          getAgentName={(agentName: string) => console.log("Agent Name:", agentName)}
        />
      ) : (
        <InfiniteCardScroll
          cards={mockCards}
          handleStart={showFormForAgent}
          handleEnd={handleEnd}
          stopScrolls={showRealEstateAgentVoice}
          resumeScrolls={!showRealEstateAgentVoice}
          sessionStatus={sessionStatus}
          onAgentSelect={handleAgentSelect}
        />
      )}
    </div>
  );
};

export default App;