import { Box, Card, Typography, Paper, Divider, CardContent } from "@mui/material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  sx?: object;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <Paper elevation={2}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>{children}</Box>
        </CardContent>
      </Card>
    </Paper>
  );
}
