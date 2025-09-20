import React, { useEffect, useRef, useState } from "react";
import { X, ChevronUp } from "lucide-react";
import AudioWaveform from "./AudioWaveform";
import { CardInterface } from "../../types";

interface RealEstateAgentVoiceProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
  sessionStatus?: string | null;
  agentName?: string | null;
  handleStart?: (agent_code: string, leadData: { name: string; email: string; phone: string }) => void;
  selectedAgent?: CardInterface | null;
}

const RealEstateAgentVoice: React.FC<RealEstateAgentVoiceProps> = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose,
  sessionStatus,
  agentName,
  handleStart,
  selectedAgent,
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Validate form data
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Invalid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedAgent && handleStart) {
      handleStart(selectedAgent.agent_code, formData);
      setShowForm(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format timer display as MM:SS
  const formatDuration = (s: number): string => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Start timer when agentName is present and form is submitted
  useEffect(() => {
    if (agentName && !showForm) {
      setSeconds(0); // Reset timer
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [agentName, showForm]);

  // Stop timer on close
  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowForm(true); // Reset to show form on next open
    setFormData({ name: "", email: "", phone: "" }); // Clear form
    setFormErrors({});
    onClose?.();
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50 px-4 max-w-full">
      {showForm ? (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lead Information</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
              />
              {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  formErrors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter your phone number"
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Demo
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="bg-black text-white rounded-full flex items-center pl-3 pr-1 py-1 shadow-lg">
            <div className="flex items-center gap-2">
              <AudioWaveform />
              <span className="text-sm font-medium whitespace-nowrap">
                {agentName}
              </span>
              <span className="text-xs text-gray-400 ml-1">
                {formatDuration(seconds)}
              </span>
              <button
                onClick={onToggleExpand}
                className="p-1 rounded-full hover:bg-gray-800 transition-colors"
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
            className="bg-red-500 hover:bg-red-600 transition-colors p-2 rounded-full shadow-lg"
            aria-label="Close"
          >
            <X size={20} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
};

export default RealEstateAgentVoice;