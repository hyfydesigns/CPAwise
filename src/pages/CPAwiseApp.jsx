import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PDFViewer } from "@/components/PDFViewer";
import { FileUploader } from "@/components/FileUploader";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import axios from "axios";

export default function CPAwiseApp() {
  const { user, login, logout } = useAuth();
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [response, setResponse] = useState("");
  const [uploads, setUploads] = useState([]);
  const [reports, setReports] = useState([]);
  const [notes, setNotes] = useState("");

  const fetchUploads = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/file/my-uploads?page=1&limit=10", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUploads(res.data);
  };

  const fetchReports = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/ai/my-reports?page=1&limit=10", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReports(res.data);
  };

  const handleFileUpload = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:5000/api/file/upload", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUploads();
  };

  const handleGenerateReport = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/ai/generate-report",
      { notes, contextData: {} },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResponse(res.data.report);
    fetchReports();
  };

  const deleteUpload = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/file/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUploads();
  };

  const deleteReport = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/ai/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReports();
  };

  useEffect(() => {
    if (user) {
      fetchUploads();
      fetchReports();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to CPAwise</h1>
        <Button onClick={login}>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-3xl font-bold">CPAwise AI Assistant</h1>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Upload Financial Documents</h2>
          <FileUploader onUpload={handleFileUpload} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Uploaded Files</h2>
          {uploads.map((file) => (
            <div key={file._id} className="border p-2 rounded-md">
              <p>{file.originalname}</p>
              <a
                className="text-blue-600"
                href={`http://localhost:5000/api/file/download/${file.filename}`}
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
              <Button variant="ghost" onClick={() => deleteUpload(file._id)}>
                🗑️
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Generate Report</h2>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter notes or focus areas" />
          <Button onClick={handleGenerateReport}>Generate</Button>
          {response && <div className="mt-4 p-4 bg-gray-100 rounded-lg">{response}</div>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Reports</h2>
          {reports.map((report) => (
            <div key={report._id} className="border p-2 rounded-md">
              <p className="font-bold">Notes: {report.notes}</p>
              <p>{report.reportText}</p>
              <Button variant="ghost" onClick={() => deleteReport(report._id)}>
                🗑️
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" onClick={logout}>Logout</Button>
    </div>
  );
}
