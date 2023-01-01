import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as dbConstants from "../../constants/dbConstants";
import { TicketFormModel } from "../../models/ticket";
import { raiseTicketAction } from "./actions";
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
};
const Ticket = () => {
  const [formData, setFormData] = useState<TicketFormModel>(
    {} as TicketFormModel
  );
  const dispatch = useDispatch();
  const raiseTicketData = useSelector((state: any) => state.raiseTicket);
  useEffect(() => {
    if (raiseTicketData?.data?._id) {
      alert("Ticket raised successfully");
    }
  }, [raiseTicketData]);
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const raiseTicket = () => {
    dispatch(raiseTicketAction(formData));
  };
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h5" gutterBottom>
        Describe your issue
      </Typography>

      <FormControl sx={{ marginTop: "20px", width: "500px" }}>
        <InputLabel>Device Type</InputLabel>
        <Select label="Device Type" name="deviceType" onChange={handleChange}>
          <MenuItem value={dbConstants.DESKTOP}>{dbConstants.DESKTOP}</MenuItem>
          <MenuItem value={dbConstants.LAPTOP}>{dbConstants.LAPTOP}</MenuItem>
          <MenuItem value={dbConstants.MACBOOK}>{dbConstants.MACBOOK}</MenuItem>
          <MenuItem value={dbConstants.OTHERS}>{dbConstants.OTHERS}</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "20px", width: "500px" }}>
        <InputLabel>Issue In</InputLabel>
        <Select label="Issue In" name="issueIn" onChange={handleChange}>
          <MenuItem value={dbConstants.HARDWARE}>
            {dbConstants.HARDWARE}
          </MenuItem>
          <MenuItem value={dbConstants.SOFTWARE}>
            {dbConstants.SOFTWARE}
          </MenuItem>
          <MenuItem value={dbConstants.OTHERS}>{dbConstants.OTHERS}</MenuItem>
        </Select>
      </FormControl>
      {(formData.issueIn === dbConstants.HARDWARE ||
        formData.issueIn === dbConstants.SOFTWARE) && (
        <FormControl sx={{ marginTop: "20px", width: "500px" }}>
          <InputLabel>Issue Type</InputLabel>
          <Select label="Issue Type" name="issueType" onChange={handleChange}>
            {dbConstants.ISSUES.filter(
              (issues) => formData.issueIn === issues.issueIn
            ).map((issue) => (
              <MenuItem value={issue.issueType}>{issue.issueType}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {formData.issueType === dbConstants.SOFTWARE_INSTALLATION && (
        <FormControl sx={{ marginTop: "20px", width: "500px" }}>
          <TextField
            label="Software Name"
            placeholder="Software Name"
            name="softwareName"
            onChange={handleChange}
          />
        </FormControl>
      )}
      {formData.issueIn === dbConstants.HARDWARE && (
        <FormControl sx={{ marginTop: "20px", width: "500px" }}>
          <InputLabel>Repair/Replacement</InputLabel>
          <Select
            label="Repair/Replacement"
            name="repairType"
            onChange={handleChange}
          >
            {dbConstants.ISSUE_TYPES.filter(
              (issueTypes) => formData.issueType === issueTypes.issueType
            ).map((issueType) => (
              <MenuItem value={issueType.repairType}>
                {issueType.repairType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl sx={{ marginTop: "20px", width: "500px" }}>
        <TextField
          label="Description"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          multiline
          rows={6}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "20px", width: "500px" }}>
        <Button variant="contained" onClick={raiseTicket}>
          Raise Ticket
        </Button>
      </FormControl>
    </Box>
  );
};

export default Ticket;
