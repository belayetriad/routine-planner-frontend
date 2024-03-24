import NextPlanIcon from "@mui/icons-material/NextPlan";
import SchoolIcon from "@mui/icons-material/School";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <NextPlanIcon />
      </ListItemIcon>
      <ListItemText primary="Routine Plan" />
    </ListItemButton>
    <ListItemButton href="/class">
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Class" />
    </ListItemButton>
  </React.Fragment>
);
