import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel, Switch, TextField, Select, MenuItem, Typography,Tabs,Tab,Paper,Table, TableBody,TableCell,TableContainer,TableHead,TableRow,} from "@material-ui/core";

  const SettingsComponent = ({ settings, dataObj, onChangeSettings }) => {
  const [formData, setFormData] = useState(dataObj);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(settings[0].title);

  useEffect(() => {
    console.log("formData updated:", formData);
    setFormData(dataObj);
  }, [dataObj]);



  const handleChange = (event, targetKey) => {
    const { value, checked, type } = event.target;
    let newErrors = { ...errors };
    let newData = { ...formData };

    const keys = targetKey.split(".");
    const lastKey = keys.pop();
    let nestedObject = newData;
    keys.forEach((key) => {
      if (!nestedObject[key]) {
        nestedObject[key] = {};
      }
      nestedObject = nestedObject[key];
    });
    nestedObject[lastKey] = type === "checkbox" ? checked : value;

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
    onChangeSettings(newData);
  };

  const handleTabChange = (event, newValue) => {
    setActiveStep(newValue);
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
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
          {settings.map((step) => (
            <Tab
              key={step.title}
              label={step.title}
              value={step.title}
              style={{ fontSize: "0.9rem" }}
            />
          ))}
        </Tabs>
      </Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: 1,
            maxWidth: "50%",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {settings
            .find((step) => step.title === activeStep)
            .settings.map((setting) =>(
              <div key={setting.targetKey} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
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
                <div>
                  {setting.type === "boolean" && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={
                            getNestedValue(formData, setting.targetKey) ||
                            setting.defaultValue
                          }
                          onChange={(event) =>
                            handleChange(event, setting.targetKey)
                          }
                          color="primary"
                        />
                      }
                      label={setting.caption}
                      style={{ color: "#666" }}
                    />
                  )}
                  {["text", "number"].includes(setting.type) && (
                    <TextField
                      type={setting.type}
                      value={
                        getNestedValue(formData, setting.targetKey) ||
                        setting.defaultValue
                      }
                      onChange={(event) =>
                        handleChange(event, setting.targetKey)
                      }
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  )}
                  {setting.type === "select" && (
                    <Select
                      id={setting.targetKey}
                      value={
                        getNestedValue(formData, setting.targetKey) ||
                        setting.defaultValue
                      }
                      onChange={(event) =>
                        handleChange(event, setting.targetKey)
                      }
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      {setting.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}

                  {setting.uiComponent === "table" &&
                    setting.columns &&
                    // Array.isArray(getNestedValue(formData, setting.targetKey)) &&
                    // getNestedValue(formData, setting.targetKey).length > 0 
                    // && 
                    
                    (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {setting.columns.map((columns) => (
                                <TableCell
                                  key={columns.field}
                                  style={{ fontWeight: "bold" }}
                                >
                                  {columns.headerName}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {(getNestedValue(formData, setting.targetKey)?? []).map(
                              (row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                  {setting.columns.map((columns) => (
                                    <TableCell key={columns.field}>
                                      {row[columns.field]}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                </div>
              </div>
            ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: "30%",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h1"
            style={{ color: "#333", marginBottom: "10px", textAlign: "center" }}
          >
            FormData
          </Typography>
          <pre
            style={{
              fontSize: "14px",
              color: "#666",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(formData, null, 2)}
          </pre>
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
          type: PropTypes.oneOf([ "text","number","select","boolean","table","json"]).isRequired,
          defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.array,
          ]).isRequired, 
          uiComponent: PropTypes.string.isRequired,
          targetKey: PropTypes.string.isRequired,
          caption: PropTypes.string.isRequired,
          subCaption: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string),
          columns: PropTypes.arrayOf(PropTypes.object),
        })
      ).isRequired,
    })
  ).isRequired,
  dataObj: PropTypes.object.isRequired,
  onChangeSettings: PropTypes.func.isRequired,
};

export default SettingsComponent;
