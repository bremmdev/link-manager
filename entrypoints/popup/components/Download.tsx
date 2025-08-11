import React from "react";
import { getLinksFromStorage } from "./LinkManager";

export default function Download() {
  // create a url that point to a blob containing the links in JSON format
  async function downloadLinks() {
    const links = await getLinksFromStorage();
    const blob = new Blob([JSON.stringify(links, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Set the download attribute to suggest a filename
    a.download = `links-${new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "")}.json`;
    a.click();
    // Clean up the URL object after download
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <button className="btn download-btn" onClick={downloadLinks}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 15V3" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
      </svg>
    </button>
  );
}
