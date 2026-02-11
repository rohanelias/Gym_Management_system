import { Box, Typography } from "@mui/material";

function IconCard({ icon, title, subtitle, onClick, accent }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 4,
        borderRadius: "22px",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.4)",
        transition: "all 0.35s ease",
        position: "relative",
        overflow: "hidden",

        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: accent,
          opacity: 0.12,
          zIndex: 0
        },

        "&:hover": {
          transform: "translateY(-10px) scale(1.02)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)"
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography sx={{ fontSize: 46, mb: 1 }}>
          {icon}
        </Typography>

        <Typography fontWeight={700} fontSize={18}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ opacity: 0.7, mt: 0.5 }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default IconCard;
