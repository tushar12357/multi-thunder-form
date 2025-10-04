import React, { useEffect, useRef, useState } from "react";
import { X, ChevronUp } from "lucide-react";
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
  handleEnd?: () => void;
  selectedAgent?: CardInterface | null;
  defaultCountryCode?: string;
}

const countryCodes = [
  { code: "+93", name: "Afghanistan" },
  { code: "+355", name: "Albania" },
  { code: "+213", name: "Algeria" },
  { code: "+1 684", name: "American Samoa" },
  { code: "+376", name: "Andorra" },
  { code: "+244", name: "Angola" },
  { code: "+1 264", name: "Anguilla" },
  { code: "+1 268", name: "Antigua and Barbuda" },
  { code: "+54", name: "Argentina" },
  { code: "+374", name: "Armenia" },
  { code: "+297", name: "Aruba" },
  { code: "+247", name: "Ascension Island" },
  { code: "+61", name: "Australia" },
  { code: "+672", name: "Australian External Territories" },
  { code: "+43", name: "Austria" },
  { code: "+994", name: "Azerbaijan" },
  { code: "+1 242", name: "Bahamas" },
  { code: "+973", name: "Bahrain" },
  { code: "+880", name: "Bangladesh" },
  { code: "+1 246", name: "Barbados" },
  { code: "+375", name: "Belarus" },
  { code: "+32", name: "Belgium" },
  { code: "+501", name: "Belize" },
  { code: "+229", name: "Benin" },
  { code: "+1 441", name: "Bermuda" },
  { code: "+975", name: "Bhutan" },
  { code: "+591", name: "Bolivia" },
  { code: "+387", name: "Bosnia and Herzegovina" },
  { code: "+267", name: "Botswana" },
  { code: "+55", name: "Brazil" },
  { code: "+246", name: "British Indian Ocean Territory" },
  { code: "+1 284", name: "British Virgin Islands" },
  { code: "+673", name: "Brunei" },
  { code: "+359", name: "Bulgaria" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+257", name: "Burundi" },
  { code: "+855", name: "Cambodia" },
  { code: "+237", name: "Cameroon" },
  { code: "+1", name: "Canada" },
  { code: "+238", name: "Cape Verde" },
  { code: "+1 345", name: "Cayman Islands" },
  { code: "+236", name: "Central African Republic" },
  { code: "+235", name: "Chad" },
  { code: "+56", name: "Chile" },
  { code: "+86", name: "China" },
  { code: "+61", name: "Christmas Island" },
  { code: "+61", name: "Cocos (Keeling) Islands" },
  { code: "+57", name: "Colombia" },
  { code: "+269", name: "Comoros" },
  { code: "+242", name: "Congo (Republic)" },
  { code: "+243", name: "Congo (Democratic Republic)" },
  { code: "+682", name: "Cook Islands" },
  { code: "+506", name: "Costa Rica" },
  { code: "+385", name: "Croatia" },
  { code: "+53", name: "Cuba" },
  { code: "+357", name: "Cyprus" },
  { code: "+420", name: "Czech Republic" },
  { code: "+45", name: "Denmark" },
  { code: "+253", name: "Djibouti" },
  { code: "+1 767", name: "Dominica" },
  { code: "+1 809", name: "Dominican Republic" },
  { code: "+670", name: "East Timor (Timor-Leste)" },
  { code: "+593", name: "Ecuador" },
  { code: "+20", name: "Egypt" },
  { code: "+503", name: "El Salvador" },
  { code: "+240", name: "Equatorial Guinea" },
  { code: "+291", name: "Eritrea" },
  { code: "+372", name: "Estonia" },
  { code: "+268", name: "Eswatini" },
  { code: "+251", name: "Ethiopia" },
  { code: "+500", name: "Falkland Islands" },
  { code: "+298", name: "Faroe Islands" },
  { code: "+679", name: "Fiji" },
  { code: "+358", name: "Finland" },
  { code: "+33", name: "France" },
  { code: "+594", name: "French Guiana" },
  { code: "+689", name: "French Polynesia" },
  { code: "+241", name: "Gabon" },
  { code: "+220", name: "Gambia" },
  { code: "+995", name: "Georgia" },
  { code: "+49", name: "Germany" },
  { code: "+233", name: "Ghana" },
  { code: "+350", name: "Gibraltar" },
  { code: "+30", name: "Greece" },
  { code: "+299", name: "Greenland" },
  { code: "+1 473", name: "Grenada" },
  { code: "+590", name: "Guadeloupe" },
  { code: "+1 671", name: "Guam" },
  { code: "+502", name: "Guatemala" },
  { code: "+224", name: "Guinea" },
  { code: "+245", name: "Guinea-Bissau" },
  { code: "+592", name: "Guyana" },
  { code: "+509", name: "Haiti" },
  { code: "+504", name: "Honduras" },
  { code: "+852", name: "Hong Kong" },
  { code: "+36", name: "Hungary" },
  { code: "+354", name: "Iceland" },
  { code: "+91", name: "India" },
  { code: "+62", name: "Indonesia" },
  { code: "+98", name: "Iran" },
  { code: "+964", name: "Iraq" },
  { code: "+353", name: "Ireland" },
  { code: "+972", name: "Israel" },
  { code: "+39", name: "Italy" },
  { code: "+225", name: "Ivory Coast (Côte d'Ivoire)" },
  { code: "+1 876", name: "Jamaica" },
  { code: "+81", name: "Japan" },
  { code: "+962", name: "Jordan" },
  { code: "+7", name: "Kazakhstan" },
  { code: "+254", name: "Kenya" },
  { code: "+686", name: "Kiribati" },
  { code: "+383", name: "Kosovo" },
  { code: "+965", name: "Kuwait" },
  { code: "+996", name: "Kyrgyzstan" },
  { code: "+856", name: "Laos" },
  { code: "+371", name: "Latvia" },
  { code: "+961", name: "Lebanon" },
  { code: "+266", name: "Lesotho" },
  { code: "+231", name: "Liberia" },
  { code: "+218", name: "Libya" },
  { code: "+423", name: "Liechtenstein" },
  { code: "+370", name: "Lithuania" },
  { code: "+352", name: "Luxembourg" },
  { code: "+853", name: "Macau" },
  { code: "+261", name: "Madagascar" },
  { code: "+265", name: "Malawi" },
  { code: "+60", name: "Malaysia" },
  { code: "+960", name: "Maldives" },
  { code: "+223", name: "Mali" },
  { code: "+356", name: "Malta" },
  { code: "+692", name: "Marshall Islands" },
  { code: "+596", name: "Martinique" },
  { code: "+222", name: "Mauritania" },
  { code: "+230", name: "Mauritius" },
  { code: "+262", name: "Mayotte" },
  { code: "+52", name: "Mexico" },
  { code: "+691", name: "Micronesia" },
  { code: "+373", name: "Moldova" },
  { code: "+377", name: "Monaco" },
  { code: "+976", name: "Mongolia" },
  { code: "+382", name: "Montenegro" },
  { code: "+1 664", name: "Montserrat" },
  { code: "+212", name: "Morocco" },
  { code: "+258", name: "Mozambique" },
  { code: "+95", name: "Myanmar" },
  { code: "+264", name: "Namibia" },
  { code: "+674", name: "Nauru" },
  { code: "+977", name: "Nepal" },
  { code: "+31", name: "Netherlands" },
  { code: "+687", name: "New Caledonia" },
  { code: "+64", name: "New Zealand" },
  { code: "+505", name: "Nicaragua" },
  { code: "+227", name: "Niger" },
  { code: "+234", name: "Nigeria" },
  { code: "+683", name: "Niue" },
  { code: "+672", name: "Norfolk Island" },
  { code: "+850", name: "North Korea" },
  { code: "+389", name: "North Macedonia" },
  { code: "+1 670", name: "Northern Mariana Islands" },
  { code: "+47", name: "Norway" },
  { code: "+968", name: "Oman" },
  { code: "+92", name: "Pakistan" },
  { code: "+680", name: "Palau" },
  { code: "+970", name: "Palestine" },
  { code: "+507", name: "Panama" },
  { code: "+675", name: "Papua New Guinea" },
  { code: "+595", name: "Paraguay" },
  { code: "+51", name: "Peru" },
  { code: "+63", name: "Philippines" },
  { code: "+48", name: "Poland" },
  { code: "+351", name: "Portugal" },
  { code: "+1 787", name: "Puerto Rico" },
  { code: "+974", name: "Qatar" },
  { code: "+262", name: "Réunion" },
  { code: "+40", name: "Romania" },
  { code: "+7", name: "Russia" },
  { code: "+250", name: "Rwanda" },
  { code: "+590", name: "Saint Barthélemy" },
  { code: "+290", name: "Saint Helena" },
  { code: "+1 869", name: "Saint Kitts and Nevis" },
  { code: "+1 758", name: "Saint Lucia" },
  { code: "+590", name: "Saint Martin" },
  { code: "+508", name: "Saint Pierre and Miquelon" },
  { code: "+1 784", name: "Saint Vincent and the Grenadines" },
  { code: "+685", name: "Samoa" },
  { code: "+378", name: "San Marino" },
  { code: "+239", name: "São Tomé and Príncipe" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+221", name: "Senegal" },
  { code: "+381", name: "Serbia" },
  { code: "+248", name: "Seychelles" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+65", name: "Singapore" },
  { code: "+1 721", name: "Sint Maarten" },
  { code: "+421", name: "Slovakia" },
  { code: "+386", name: "Slovenia" },
  { code: "+677", name: "Solomon Islands" },
  { code: "+252", name: "Somalia" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+211", name: "South Sudan" },
  { code: "+34", name: "Spain" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+249", name: "Sudan" },
  { code: "+597", name: "Suriname" },
  { code: "+46", name: "Sweden" },
  { code: "+41", name: "Switzerland" },
  { code: "+963", name: "Syria" },
  { code: "+886", name: "Taiwan" },
  { code: "+992", name: "Tajikistan" },
  { code: "+255", name: "Tanzania" },
  { code: "+66", name: "Thailand" },
  { code: "+228", name: "Togo" },
  { code: "+690", name: "Tokelau" },
  { code: "+676", name: "Tonga" },
  { code: "+1 868", name: "Trinidad and Tobago" },
  { code: "+216", name: "Tunisia" },
  { code: "+90", name: "Turkey" },
  { code: "+993", name: "Turkmenistan" },
  { code: "+1 649", name: "Turks and Caicos Islands" },
  { code: "+688", name: "Tuvalu" },
  { code: "+1 340", name: "U.S. Virgin Islands" },
  { code: "+256", name: "Uganda" },
  { code: "+380", name: "Ukraine" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+44", name: "United Kingdom" },
  { code: "+1", name: "United States" },
  { code: "+598", name: "Uruguay" },
  { code: "+998", name: "Uzbekistan" },
  { code: "+678", name: "Vanuatu" },
  { code: "+39", name: "Vatican City" },
  { code: "+58", name: "Venezuela" },
  { code: "+84", name: "Vietnam" },
  { code: "+681", name: "Wallis and Futuna" },
  { code: "+967", name: "Yemen" },
  { code: "+260", name: "Zambia" },
  { code: "+263", name: "Zimbabwe" },
];

const RealEstateAgentVoice: React.FC<RealEstateAgentVoiceProps> = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose,
  sessionStatus,
  handleStart,
  selectedAgent,
  defaultCountryCode = "+1",
  handleEnd
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
    phone: "", // Phone number without country code
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [countryCode, setCountryCode] = useState<string>(defaultCountryCode);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] =
    useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update country code and phone when defaultCountryCode changes
  useEffect(() => {
    setCountryCode(defaultCountryCode);
    setFormData((prev) => ({ ...prev, phone: "" }));
  }, [defaultCountryCode]);

  // Filter countries based on search input
  useEffect(() => {
    const filtered = countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        country.code.includes(countrySearch)
    );
    setFilteredCountries(filtered);
  }, [countrySearch]);

 

  // Validate form data
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errors.phone = "Valid phone number is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedAgent && handleStart) {
      try {
        const fullPhoneNumber = `${countryCode}${formData.phone}`;
        console.log("Submitting form with data:", {
          ...formData,
          phone: fullPhoneNumber,
        });
        await handleStart(selectedAgent.agent_code, {
          name: formData.name,
          email: formData.email,
          phone: fullPhoneNumber,
        });
        console.log(
          "start-thunder API call succeeded, setting showForm to false"
        );
        setShowForm(false);
        setAgentName(selectedAgent.title);
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

  // Handle country selection
  const handleCountrySelect = (country: { code: string; name: string }) => {
    setCountryCode(country.code);
    setIsCountryDropdownOpen(false);
    setCountrySearch("");
  };

  // Format timer display as MM:SS
  const formatDuration = (s: number): string => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Start timer when form is submitted
  useEffect(() => {
    if (!showForm) {
      console.log("showForm is false, starting timer and showing waveform");
      setSeconds(0);
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
  }, [showForm]);

  // Stop timer on close
  const handleClose = () => {
  console.log("Closing waveform UI, resetting form");
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  setShowForm(true);
  setAgentName(null);
  setFormData({ name: "", email: "", phone: "" });
  setFormErrors({});
  setCountryCode(defaultCountryCode);
  setCountrySearch("");
  setFilteredCountries(countryCodes);
  handleEnd?.(); // Call handleEnd to terminate the session
  onClose?.();
};

  console.log(
    "Rendering RealEstateAgentVoice, showForm:",
    showForm,
    "agentName:",
    agentName
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {showForm ? (
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
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="flex">
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className={`w-24 px-3 py-2 rounded-l-lg border-2 ${
                      formErrors.phone ? "border-red-500" : "border-orange-200"
                    } bg-orange-50 text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 flex items-center justify-between text-sm`}
                  >
                    {countryCode}
                    <ChevronUp
                      size={16}
                      className={`transform transition-transform ${
                        isCountryDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCountryDropdownOpen && (
                    <div
                      className="absolute z-10 w-64 bottom-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto country-dropdown"
                      ref={dropdownRef}
                    >
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or code..."
                        className="w-full px-3 py-2 border-b border-gray-200 text-sm focus:outline-none bg-orange-50 text-gray-800 placeholder-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="p-1">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={`${country.code}-${country.name}`}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-orange-100 rounded-lg flex justify-between items-center"
                            >
                              <span>{country.name}</span>
                              <span className="text-gray-500">
                                {country.code}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-800">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-2 rounded-r-lg border-2 ${
                    formErrors.phone ? "border-red-500" : "border-orange-200"
                  } focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none transition-all bg-orange-50 text-gray-800 placeholder-gray-400`}
                  placeholder="Enter number"
                />
              </div>
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
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
      ) : (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50 px-4 max-w-full">
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
      )}
    </div>
  );
};

export default RealEstateAgentVoice;
