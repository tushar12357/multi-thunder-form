import React, { useEffect, useRef, useState } from "react";
import { X, ChevronUp } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AudioWaveform from "./AudioWaveform";
import { CardInterface } from "../../types";

interface RealEstateAgentVoiceProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
  sessionStatus?: string | null;
  handleStart?: (
    agent_code: string,
    leadData: { name: string; email: string; phone: string }
  ) => void;
  selectedAgent?: CardInterface | null;
  defaultCountryCode?: string; // New prop for country code
}

const RealEstateAgentVoice: React.FC<RealEstateAgentVoiceProps> = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose,
  sessionStatus,
  handleStart,
  selectedAgent,
  defaultCountryCode = "+1", // Default to US if not provided
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [agentName, setAgentName] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: defaultCountryCode, // Use prop for initial country code
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update phone number when defaultCountryCode changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, phone: defaultCountryCode }));
  }, [defaultCountryCode]);

  // Validate form data
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim() || formData.phone.length < 11) {
      errors.phone = "Valid phone number with country code is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [showAudio, setShowAudio] = useState(false);
  console.log(showAudio)
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedAgent && handleStart) {
      try {
        console.log("Submitting form with data:", formData);
        await handleStart(selectedAgent.agent_code, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // Includes country code from react-phone-input-2
        });
        console.log(
          "start-thunder API call succeeded, setting showForm to false"
        );
        setShowForm(false); // Close form only after successful API call
        setShowAudio(true);
        setAgentName(selectedAgent.title); // Set agent name for waveform UI
      } catch (error) {
        console.error("Error starting Thunder agent:", error);
        setFormErrors((prev) => ({
          ...prev,
          phone: "Failed to connect to agent. Please try again.",
        }));
      }
    } else {
      console.log(
        "Form validation failed or missing selectedAgent/handleStart"
      );
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle phone input change
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: `+${value}` }));
  };

  // Format timer display as MM:SS
  const formatDuration = (s: number): string => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Start timer when form is submitted (showForm becomes false)
  // useEffect(() => {
  //   if (!showForm) {
  //     console.log("showForm is false, starting timer and showing waveform");
  //     setSeconds(0); // Reset timer
  //     intervalRef.current = setInterval(() => {
  //       setSeconds((prev) => prev + 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //       intervalRef.current = null;
  //     }
  //   };
  // }, [showForm]);

  // Stop timer on close
  const handleClose = () => {
    console.log("Closing waveform UI, resetting form");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowForm(true); // Reset to show form on next open
    setAgentName(null);
    setFormData({ name: "", email: "", phone: defaultCountryCode }); // Preserve country code
    setFormErrors({});
    onClose?.();
  };

  console.log(
    "Rendering RealEstateAgentVoice, showForm:",
    showForm,
    "agentName:",
    agentName
  );

  return (
    <div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100 fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-600">
                Get Started with {selectedAgent?.title}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-orange-600 transition-colors"
                aria-label="Close form"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    formErrors.name ? "border-red-500" : "border-orange-200"
                  } focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all bg-orange-50 text-gray-800 placeholder-gray-400`}
                  placeholder="Enter your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border-2 ${
                    formErrors.email ? "border-red-500" : "border-orange-200"
                  } focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all bg-orange-50 text-gray-800 placeholder-gray-400`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    id: "phone",
                    className: `w-full px-4 py-2 rounded-lg border-2 ${
                      formErrors.phone ? "border-red-500" : "border-orange-200"
                    } focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all bg-orange-50 text-gray-800 placeholder-gray-400 pl-12`,
                  }}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg shadow-md"
              >
                Start Demo
              </button>
            </form>
          </div>
        </div>
      )}
      {showAudio && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            key="waveform-ui" // Add key to force re-render
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50 px-4 max-w-full"
          >
            <div className="bg-black text-white rounded-full flex items-center pl-4 pr-2 py-2 shadow-lg transform transition-all duration-300">
              <div className="flex items-center gap-3">
                <AudioWaveform />
                <span className="text-sm font-medium whitespace-nowrap">
                  {agentName}
                </span>
                <span className="text-xs text-orange-100 ml-1">
                  {formatDuration(seconds)}
                </span>
                <button
                  onClick={onToggleExpand}
                  className="p-1 rounded-full hover:bg-orange-700 transition-colors"
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  <ChevronUp
                    size={18}
                    className={`transform transition-transform ${
                      isExpanded ? "" : "rotate-180"
                    }`}
                  />
                </button>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-600 transition-colors p-2 rounded-full shadow-lg ml-2"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateAgentVoice;
