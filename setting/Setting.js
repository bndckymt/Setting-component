//setting
import React, { useState } from "react";
import PropTypes from "prop-types";
import SettingsComponent from "./SettingsComponent";

const Setting = ({Settings}) => {
console.log(({Settings}))
  const [formData, setFormData] = useState({});

  const handleNext = () => {};  
  const handleBack = () => {};

  const settingsObject = {
    sections: [
      { 
        title: "Personal Information",
        fields: [
        
          {
            name: "Full Name",
            type: "text",
            defaultValue: "",
            uiComponent: "textbox",
            targetKey: "user.data.name",
            description: "Enter your full name"
          },
          {
            name: "Age",
            type: "number",
            defaultValue: "",
            uiComponent: "number",
            targetKey: "user.data.age",
            description: "Enter your age"
          },
          {
            name: "Gender",
            type: "select",
            defaultValue: "",
            uiComponent: "select",
            targetKey: "user.data.gender",
            options: ["Male", "Female", "Other"]
          }
        ]
      },
      {
        title: "Policy",
        fields: [
          {
            name: "No Noon Logs",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.noNoonLogs",
            description: "If employees aren't necessarily needed to use biometrics at noon time"
          },
          {
            name: "No Absent on Special Holiday",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.SpecialHoliday",
            description: "No absent will be recorded when employee is not present on special holiday",
          },
          {
            name: "Break (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.Break",
            description: "Given break time between am and pm",
          },
          {
            name: "Daily Regular Hours(hours)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.reghours",
            description: "Regular hours to be rendered by employee each day",
          },
          {
            name: "Late Grace Period (minutes)",
            type: "text",
            defaultValue: "0",
            uiComponent: "text",
            targetKey: "user.policy.late.late",
            description: "Given grace period before late or tardiness will be applied",
          },
          {
            name: "Allow offsetting",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.late.offset",
            description: "If minutes of late can be offset at the end of the schedule",
          },
          {
            name: "Late offsetting (minutes)",
            type: "number",
            defaultValue: "30",
            uiComponent: "number",
            targetKey: "user.policy.late.lateoffsets",
            description: "Given minute of late that can be offset",
          },
          {
            name: "Minimum Overtime (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.minovertime",
            description: "Minimum minutes to meet before overtime will count",
          },
          {
            name: "Allowed Excess of Overtime (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.maxovertime",
            description: "The remainder of total overtime in minutes divides by this will be removed",
          },
        ]
      },
      {
        title: "Deduction",
        fields: [
          {
            name: "User Deduction",
            type: "json",
            defaultValue: [],
            uiComponent: "table",
            targetKey: "user.deductions",
            columns: [
              {
                field: "code",
                headerName: "Deduction Code",
                width: 150
              },
              {
                field: "desc",
                headerName: "Description",
                width: 300
              }
            ],
            description: ""
          }
        ]
      }
      
    ]
  };
  
  const data = settingsObject.sections.map(section => ({
    title: section.title,
    settings: section.fields.map(field => ({
      type: field.type,
      defaultValue: field.defaultValue,
      uiComponent: field.uiComponent,
      targetKey: field.targetKey,
      caption: field.name,
      subCaption: field.description,
      options: field?.options,
      columns :field?.columns
    }))
  }));
  

  return (
    <>
      <SettingsComponent
        settings={data}
        dataObj={formData}
        onChangeSettings={setFormData}
        onNext={handleNext}
        onBack={handleBack}
      />
    </>
  );
};

Setting.propTypes = {
  
  Settings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      settings: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(["text", "number", "select", "boolean"]).isRequired,
          defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
          uiComponent: PropTypes.string.isRequired,
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