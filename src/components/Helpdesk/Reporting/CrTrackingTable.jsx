import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  LinearProgress,
  Box,
} from "@mui/material";

// Mapping status CR ke progress percentage (sama seperti di chart)
const statusProgressMapping = {
  "PLAN CR": 0,
  "APPROVE IT": 25,
  "APPROVE BPO": 50,
  "CR IMPLEMENTATION": 75,
  CLOSED: 100,
};

// Mapping status ke warna chip
const getStatusColor = (status) => {
  switch (status) {
    case "PLAN CR":
      return "default";
    case "APPROVE IT":
      return "primary";
    case "APPROVE BPO":
      return "secondary";
    case "CR IMPLEMENTATION":
      return "warning";
    case "CLOSED":
      return "success";
    default:
      return "default";
  }
};

export default function CrTrackingTable({ data }) {
  // Transform data untuk menghitung progress dari status
  const processedData =
    data?.map((item, index) => ({
      ...item,
      number: index + 1,
      applicationName: item.ticket?.subject || "Unknown Application",
      progress: statusProgressMapping[item.status_cr] || 0,
      contractNumber: item.ticket?.contract_number || "-",
      contractValue: item.ticket?.contract_value || "-",
    })) || [];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Detail CR Tracking
      </Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 650 }} aria-label="CR tracking table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>

              <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
                Progress
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Kontrak</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nilai Kontrak</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedData.length > 0 ? (
              processedData.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.number}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.applicationName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: "#65C7D5",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ minWidth: "40px" }}>
                        {item.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.contractNumber || "Unknown Contract"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.contractValue || "Unknown Value"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ py: 3 }}
                  >
                    Tidak ada data CR Tracking
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
