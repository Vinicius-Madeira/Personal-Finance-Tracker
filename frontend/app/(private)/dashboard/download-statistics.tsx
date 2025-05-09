"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

interface PDFDownloadButtonProps {
  fileName?: string;
  buttonText?: string;
}

export default function PDFDownloadButton({
  fileName = `Relatório-${new Date().toISOString().split("T")[0]}.pdf`,
  buttonText = "Download PDF",
}: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Make the GET request to your API route
      const response = await fetch("/api/report");

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Get the PDF as an array buffer
      const arrayBuffer = await response.arrayBuffer();

      // Convert array buffer to blob with PDF mime type
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element and set properties for download
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // Append to the document, click it, and then remove it
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Failed to download the PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="absolute right-42 top-24"
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Downloading...
        </>
      ) : (
        <>
          {buttonText}
          <Download />
        </>
      )}
    </Button>
  );
}
