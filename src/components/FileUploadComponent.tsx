import React from "react";

import { Box, Button, Typography, LinearProgress, Alert, Paper, IconButton, Chip } from "@mui/material";
import { CloudUpload, Delete, AttachFile } from "@mui/icons-material";
import Report from "../models/Report";

interface UploadStatus {
  type: "success" | "error";
  message: string;
}

interface FileUploadComponentProps {
  onDataLoaded: (report: Report) => void;
}

export default function FileUploadComponent({ onDataLoaded }: FileUploadComponentProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadStatus, setUploadStatus] = React.useState<UploadStatus | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setUploadStatus(null);
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus({ type: "error", message: "No file selected. Please select a file to upload." });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    // load the file
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    reader.onload = () => {
      const fileData = reader.result as string;
      onDataLoaded(
        new Report(
          fileData
            .split("\n")
            .filter((line) => line)
            .map((line) => JSON.parse(line))
        )
      );
      setUploadStatus({ type: "success", message: "File analyzed successfully!" });
    };

    reader.onerror = () => {
      console.error("File reading error:", reader.error);
      setUploadStatus({ type: "error", message: "Error reading file. Please try again." });
    };

    reader.onloadend = () => {
      setUploading(false);
    };
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) {
      return "0 Bytes";
    }

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          border: "2px dashed #ccc",
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: selectedFile ? "#f5f5f5" : "transparent",
        }}
      >
        {!selectedFile ? (
          <Box>
            <CloudUpload sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Choose a file to upload
            </Typography>
            <Button variant="contained" component="label" startIcon={<AttachFile />} sx={{ mt: 2 }}>
              Select File
              <input type="file" hidden onChange={handleFileSelect} accept="*/*" />
            </Button>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Chip icon={<AttachFile />} label={selectedFile.name} variant="outlined" sx={{ mr: 1 }} />
              <IconButton size="small" onClick={handleRemoveFile} disabled={uploading}>
                <Delete />
              </IconButton>
            </Box>

            <Typography variant="body2" color="textSecondary">
              Size: {formatFileSize(selectedFile.size)}
            </Typography>

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />
                <Typography variant="body2">Analyzing... {uploadProgress}%</Typography>
              </Box>
            )}

            {!uploading && (
              <Button variant="contained" onClick={handleUpload} startIcon={<CloudUpload />} sx={{ mt: 2 }}>
                Analyze File
              </Button>
            )}
          </Box>
        )}
      </Paper>
      {uploadStatus && (
        <Alert severity={uploadStatus.type} sx={{ mt: 2 }} onClose={() => setUploadStatus(null)}>
          {uploadStatus.message}
        </Alert>
      )}
    </Box>
  );
}
