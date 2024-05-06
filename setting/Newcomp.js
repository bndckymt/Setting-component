// sa options gawing array
//ILAGAY SA LOOB NALANG NG PREV FORM DATA

import React, { useState } from "react";
import { FormControlLabel, Switch, TextField, Select, MenuItem, Typography, Button } from "@material-ui/core";

export default function NestedFormContainer() {
  const [formData, setFormData] = useState({
    user: {
      policy: {},
    }
  });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Step 1",
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
          caption: "Gender",
          options: ["Male", "Female", "Other"]
        }
      ]
    },
    {
      title: "Step 2",
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
      title: "policy",
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
          type: "text",
          defaultValue: "0",
          ui_component: "text",
          targetKey: "user.policy.Break",
          caption: "Break (minutes)",
          subCaption: "Given break time between am and pm",
        },
        {
          type: "text",
          defaultValue: "0",
          ui_component: "text",
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
          type: "text",
          defaultValue: "30",
          ui_component: "text",
          targetKey: "user.policy.late.lateoffsets",
          caption: "Late offsetting (minutes)",
          subCaption: "Given minute of late that can be offset",
        },
        {
          type: "text",
          defaultValue: "0",
          ui_component: "text",
          targetKey: "user.policy.late.minovertime",
          caption: "Minimum Overtime (minutes)",
          subCaption: "Minimum minutes to meet before overtime will count",
        },
        {
          type: "text",
          defaultValue: "0",
          ui_component: "text",
          targetKey: "user.policy.late.maxovertime",
          caption: "Allowed Excess of Overtime (minutes)",
          subCaption: "The remainder of total overtime in minutes divides by this will be removed",
        },
      ]
    }
  ];

  const setFormDataAndHandleChange = (event, targetKey) => {
    if (!event || !event.target) return; // Check if event or event.target is null
    
    const { value, checked, type } = event.target;
    if (!type) return; // Ensure type property exists
  
    setFormData(prevFormData => {
      const keys = targetKey.split('.');
      const lastKey = keys.pop();
      let nestedObject = prevFormData;
      keys.forEach(key => {
        if (!nestedObject[key]) {
          nestedObject[key] = {};
        }
        nestedObject = nestedObject[key];
      });
      nestedObject[lastKey] = type === "checkbox" ? checked : value;
      return { ...prevFormData };
    });
  };
  

  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h1" style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>{steps[activeStep].title}</Typography>
          <form>
            {steps[activeStep].settings.map((setting, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <div>
                  <Typography variant="body1" style={{ color: "#333", marginBottom: "5px" }}>{setting.caption}</Typography>
                  {setting.subCaption && <Typography variant="body2" style={{ color: "#666", marginTop: "5px" }}>{setting.subCaption}</Typography>}
                </div>
                {setting.type === "boolean" && (
                  <FormControlLabel
                    control={<Switch
                      checked={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                      onChange={(event) => setFormDataAndHandleChange(event, setting.targetKey)}
                      color="primary"
                    />}
                    label={setting.caption}
                    style={{ color: "#666" }}
                  />
                )}
                {["text", "number"].includes(setting.type) && (
                  <TextField
                    type={setting.type}
                    value={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                    onChange={(event) => setFormDataAndHandleChange(event, setting.targetKey)}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                )}
                {setting.type === "select" && (
                  <>
                    <Typography variant="body2" style={{ color: "#666", marginBottom: "5px", display: "block" }}>{setting.caption}</Typography>
                    <Select
                      id={setting.targetKey}
                      value={getNestedValue(formData, setting.targetKey) || setting.defaultValue}
                      onChange={(event) => setFormDataAndHandleChange(event, setting.targetKey)}
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      {setting.options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" color="primary" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
            </div>
          </form>
        </div>
        <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h1" style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>FormData</Typography>
          <pre style={{ fontSize: "14px", color: "#666", overflowX: "auto" }}>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { FormControlLabel, Switch, TextField, Select, MenuItem, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

// export default function NestedFormContainer() {
//   const [formData, setFormData] = useState({
//     user: {
//       policy: {},
//       tableData: [] // Define structure for table data
//     }
//   });
//   const [activeStep, setActiveStep] = useState(0);

//   const steps = [
//     // Your steps configuration...
//   ];

//   const setFormDataAndHandleChange = (event, targetKey) => {
//     // Your existing function...
//   };

//   function getNestedValue(obj, path) {
//     // Your existing function...
//   }

//   const handleNext = () => {
//     // Your existing function...
//   };

//   const handleBack = () => {
//     // Your existing function...
//   };

//   const handleAddRow = () => {
//     // Add new row to table data
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       user: {
//         ...prevFormData.user,
//         tableData: [...prevFormData.user.tableData, {}]
//       }
//     }));
//   };

//   const handleTableCellChange = (event, rowIndex, columnName) => {
//     // Update table data based on cell change
//     const newValue = event.target.value;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       user: {
//         ...prevFormData.user,
//         tableData: prevFormData.user.tableData.map((row, index) => {
//           if (index === rowIndex) {
//             return {
//               ...row,
//               [columnName]: newValue
//             };
//           }
//           return row;
//         })
//       }
//     }));
//   };

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
//         <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
//           {/* Your form code here... */}
//         </div>
//         <div style={{ flex: 1, maxWidth: "50%", margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f8f8f8", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
//           <Typography variant="h1" style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>Table Data</Typography>
//           {/* Render the table */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Column 1</TableCell>
//                   <TableCell>Column 2</TableCell>
//                   {/* Add more columns as needed */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {formData.user.tableData.map((row, rowIndex) => (
//                   <TableRow key={rowIndex}>
//                     <TableCell>
//                       <TextField
//                         value={row.column1 || ''}
//                         onChange={(event) => handleTableCellChange(event, rowIndex, 'column1')}
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <TextField
//                         value={row.column2 || ''}
//                         onChange={(event) => handleTableCellChange(event, rowIndex, 'column2')}
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     {/* Add more cells for additional columns */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Button variant="contained" color="primary" onClick={handleAddRow}>Add Row</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

