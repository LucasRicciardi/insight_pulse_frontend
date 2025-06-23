import { Box, Typography, AppBar, Toolbar, Avatar } from "@mui/material";

export default function ApplicationHeader() {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black", boxShadow: 1, mb: 5 }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Insight Pulse
          </Typography>
        </Box>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#333", ml: 1 }}>
          <Typography variant="caption">LS</Typography>
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
