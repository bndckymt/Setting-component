import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
 
} from "@material-ui/core";

const SettingsComponent = ({ settings, dataObj }) => {
  const [formData, setFormData] = useState(dataObj);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(settings[0].title);
  const [formEnabled, setFormEnabled] = useState(true); // State to track form enable/disable

  useEffect(() => {
    // Check if the setting for 13th month payroll is enabled
    const is13thMonthPayrollEnabled = formData.user?.allow13thMonthPayroll || false;
    // If enabled, trigger some action
    if (is13thMonthPayrollEnabled) {
      // Action to trigger when 13th month payroll is enabled
      console.log("13th Month Payroll is enabled.");
    }
  }, [formData]);

  const handleChange = (event, targetKey) => {
    const { value, checked, type } = event.target;
    let newErrors = { ...errors };
    let newData = { ...formData };

    const keys = targetKey.split(".");
    const lastKey = keys.pop();
    let nestedObject = newData;
    keys.forEach(key => {
      if (!nestedObject[key]) {
        nestedObject[key] = {};
      }
      nestedObject = nestedObject[key];
    });
    nestedObject[lastKey] = type === "checkbox" ? checked : value;

    // Exclude toggle buttons with checked value true from validation
    if (type === "checkbox" && checked) {
      delete newErrors[targetKey];
    } else {
      if (value === "" || (type === "number" && isNaN(value))) {
        newErrors[targetKey] = "Invalid input";
      } else {
        delete newErrors[targetKey];
      }
    }

    setFormData(newData);
    setErrors(newErrors);
  };

  function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }

  const handleTabChange = (event, newValue) => {
    setActiveStep(newValue);
  };

  const handleToggleChange = () => {
    setFormEnabled(prevState => !prevState); // Toggle the form enable/disable state
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={activeStep}
          onChange={handleTabChange}
          orientation="horizontal"
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          {settings.map((step, index) => (
            <Tab
              key={step.title}
              label={step.title}
              value={step.title}
              style={{ fontSize: "0.9rem" }}
            />
          ))}
        </Tabs>
      </Paper>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <FormControlLabel
              control={<Switch checked={formEnabled} onChange={handleToggleChange} color="primary" />}
              label={formEnabled ? "Disable Form" : "Enable Form"}
            />
          </div>
          <form>
            {settings.find(step => step.title === activeStep).settings.map(
              (setting, settingIndex) => (
                <div key={setting.targetKey} style={{ marginBottom: "20px" }}>
                  <div>
                    <Typography
                      variant="body1"
                      style={{ color: "#333", marginBottom: "5px" }}
                    >
                      {setting.caption}
                    </Typography>
                    {setting.subCaption && (
                      <Typography
                        variant="body2"
                        style={{ color: "#666", marginTop: "5px" }}
                      >
                        {setting.subCaption}
                      </Typography>
                    )}
                    {errors[setting.targetKey] && (
                      <Typography
                        variant="body2"
                        style={{ color: "red", marginTop: "5px" }}
                      >
                        {errors[setting.targetKey]}
                      </Typography>
                    )}
                  </div>
                  {setting.type === "boolean" && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                          onChange={(event) => handleChange(event, setting.targetKey)}
                          color="primary"
                          disabled={!formEnabled}
                        />
                      }
                      label={setting.caption}
                      style={{ color: "#666" }}
                    />
                  )}
                  {["text", "number"].includes(setting.type) && (
                    <TextField
                      type={setting.type}
                      value={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                      onChange={(event) => handleChange(event, setting.targetKey)}
                      variant="outlined"
                      style={{ width: "100%" }}
                      disabled={!formEnabled}
                    />
                  )}
                  {setting.type === "select" && (
                    <>
                      <Select
                        id={setting.targetKey}
                        value={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                        onChange={(event) => handleChange(event, setting.targetKey)}
                        variant="outlined"
                        style={{ width: "100%" }}
                        disabled={!formEnabled}
                      >
                        {setting.options.map((option, index) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                </div>
              )
            )}
          </form>
        </div>
        <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h1" style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
            FormData
          </Typography>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <Typography variant="h1" style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
            FormData Table
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settings.find(step => step.title === activeStep).settings.map(
                  (setting, settingIndex) => (
                    <TableRow key={setting.targetKey}>
                      <TableCell>{setting.caption}</TableCell>
                      <TableCell>
                        {setting.type === "boolean" ? (
                          getNestedValue(formData, setting.targetKey) ? "true" : "false"
                        ) : (
                          getNestedValue(formData, setting.targetKey) || setting.defaultValue
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

SettingsComponent.propTypes = {
  settings: PropTypes.arrayOf(
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
      ).isRequired
    })
  ).isRequired,
  dataObj: PropTypes.object.isRequired
};

export default SettingsComponent;
