import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const ListItem = ({
  icon: Icon,
  primary,
}: {
  icon: React.ReactNode;
  primary: string;
}) => {
  return (
    <ListItemButton sx={{
      textDecoration: "none",
      color: "inherit",
    }}>
      <ListItemIcon>
        {Icon}
      </ListItemIcon>
      <ListItemText color="inherit" primary={primary} />
    </ListItemButton>
  );
};
