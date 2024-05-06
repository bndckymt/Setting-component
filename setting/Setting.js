//Setting.Js
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import SettingsComponent from "./SettingsComponent";

const Setting = () => {
  const [formData, setFormData] = useState({}); 
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const steps = [
    {
      title: "Personal Information",
      settings: [
        {
          type: "text",
          defaultValue: "",
          ui_component: "textbox",
          targetKey: "user.step1.name",
          caption: "Full Name",
          subCaption: "Enter your full name"
        },
        {
          type: "number",
          defaultValue: "",
          ui_component: "number",
          targetKey: "user.step1.age",
          caption: "Age",
          subCaption: "Enter your age"
        },  
        {
          type: "select",
          defaultValue: "",
          ui_component: "select",
          targetKey: "user.step1.gender",
          options: ["Male", "Female", "Other"],
          caption: "Gender"
         
        }
      ]
    },
    {
      title: "Subscription",
      settings: [
        {
          type: "select",
          defaultValue: "",
          ui_component: "select",
          targetKey: "user.step2.mode",
          caption: "Mode",
          options: ["Basic", "Pro", "Enterprise"],
        },
        {
          type: "boolean",
          defaultValue: false,
          ui_component: "toggle",
          targetKey: "user.step2.allow13thMonthPayroll",
          caption: "Enable 13th Month Payroll",
        },
        {
          type: "boolean",
          defaultValue: false,
          ui_component: "toggle",
          targetKey: "user.step2.setDateToPreviousPayroll",
          caption: "Set Date to Previous Payroll",
        }
      ]
    },
    {
      title: "Policy",
      settings: [
        {
          type: "boolean",
          defaultValue: false,
          ui_component: "toggle",
          targetKey: "user.policy.noNoonLogs",
          caption: "No Noon Logs",
          subCaption: "If employees aren't necessarily needed to use biometrics at noon time",
        },
        {
          type: "boolean",
          defaultValue: false,
          ui_component: "toggle",
          targetKey: "user.policy.SpecialHoliday",
          caption: "No Absent on Special Holiday",
          subCaption: "No absent will be recorded when employee is not present on special holiday",
        },
        {
          type: "number",
          defaultValue: "0",
          ui_component: "number",
          targetKey: "user.policy.Break",
          caption: "Break (minutes)",
          subCaption: "Given break time between am and pm",
        },
        {
          type: "number",
          defaultValue: "0",
          ui_component: "number",
          targetKey: "user.policy.reghours",
          caption: "Daily Regular Hours(hours)",
          subCaption: "Regular hours to be rendered by employee each day",
        },
        {
          type: "text",
          defaultValue: "0",
          ui_component: "text",
          targetKey: "user.policy.late.late",
          caption: "Late Grace Period (minutes)",
          subCaption: "Given grace period before late or tardiness will be applied",
        },
        {
          type: "boolean",
          defaultValue: false,
          ui_component: "toggle",
          targetKey: "user.policy.late.offset",
          caption: "Allow offsetting",
          subCaption: "If minutes of late can be offset at the end of the schedule",
        },
        {
          type: "number",
          defaultValue: "30",
          ui_component: "number",
          targetKey: "user.policy.late.lateoffsets",
          caption: "Late offsetting (minutes)",
          subCaption: "Given minute of late that can be offset",
        },
        {
          type: "number",
          defaultValue: "0",
          ui_component: "number",
          targetKey: "user.policy.late.minovertime",
          caption: "Minimum Overtime (minutes)",
          subCaption: "Minimum minutes to meet before overtime will count",
        },
        {
          type: "number",
          defaultValue: "0",
          ui_component: "tnumber",
          targetKey: "user.policy.late.maxovertime",
          caption: "Allowed Excess of Overtime (minutes)",
          subCaption: "The remainder of total overtime in minutes divides by this will be removed",
        },
      ]
    }
   
  ];

  return (
    <SettingsComponent 
      settings={steps} 
      dataObj={formData} 
      onChangeSettings={setFormData} 
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
};

// Prop types validation
Setting.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      settings: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(["text", "number", "select", "boolean"]).isRequired,
          defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
          ui_component: PropTypes.string.isRequired,
          targetKey: PropTypes.string.isRequired,
          caption: PropTypes.string.isRequired,
          subCaption: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string),
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Setting;
