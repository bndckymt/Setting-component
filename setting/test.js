import React, { useState } from "react";
import {
  Box, Button, Snackbar, Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Paper
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  root: { "& > *": { borderBottom: "unset" } },
  table: { minWidth: 350 },
  snackbar: { bottom: "104px" }
}); 

function TableDemo() {
  const classes = useStyles();
  const [rows, setRows] = useState([{ id: 1, firstname: "", lastname: "" }]);
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = (event, reason) => { if (reason === "clickaway") return; setOpen(false); };
  const handleAdd = () => { setRows([...rows, { id: rows.length + 1, firstname: "", lastname: "" }]); setEdit(true); };
  const handleEdit = () => { setEdit(!isEdit); };
  const handleSave = () => { setEdit(!isEdit); setRows(rows); setDisable(true); setOpen(true); };
  const handleInputChange = (e, index) => { setDisable(false); const { name, value } = e.target; const list = [...rows]; list[index][name] = value; setRows(list); };
  const handleConfirm = () => { setShowConfirm(true); };
  const handleRemoveClick = i => { const list = [...rows]; list.splice(i, 1); setRows(list); setShowConfirm(false); };
  const handleNo = () => { setShowConfirm(false); };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} className={classes.snackbar}>
        <Alert onClose={handleClose} severity="success">Record saved successfully!</Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isEdit && rows.length !== 0 && <Button align="right" onClick={handleSave} disabled={disable}><DoneIcon />SAVE</Button>}
          </div>
          <div>
            <Button onClick={handleAdd}><AddBoxIcon />ADD</Button>
            <Button align="right" onClick={handleEdit}><CreateIcon />EDIT</Button>
          </div>
        </div>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {isEdit ? (
                  <>
                    <TableCell padding="none">
                      <input value={row.firstname} name="firstname" onChange={(e) => handleInputChange(e, i)} />
                    </TableCell>
                    <TableCell padding="none">
                      <input value={row.lastname} name="lastname" onChange={(e) => handleInputChange(e, i)} />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell>{row.lastname}</TableCell>
                  </>
                )}
                <TableCell>
                  <Button onClick={handleConfirm} disabled={!isEdit}>{isEdit ? <ClearIcon /> : <DeleteOutlineIcon />}</Button>
                  {showConfirm && (
                    <Dialog open={showConfirm} onClose={handleNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">Are you sure to delete?</DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleRemoveClick(i)} color="primary" autoFocus>Yes</Button>
                        <Button onClick={handleNo} color="primary" autoFocus>No</Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Paper style={{ marginTop: 20, padding: 20, canvas: 50 }}>
        <Typography variant="h6">Current Data:</Typography>
        <pre>{JSON.stringify(rows, null, 2)}</pre>
      </Paper>
    </div>
  );
}

export default TableDemo;
