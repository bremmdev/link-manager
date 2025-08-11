import React from "react";
import type { Link, LinkProps } from "../types";
import { setLinksInStorage } from "./LinkManager";

export default function Upload({
  disabled,
  links,
  onUpload,
}: {
  disabled?: boolean;
  links: Array<Link>;
  onUpload: (links: Array<Link>) => void;
}) {
  function uploadLinks(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    //get links from file
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;

      try {
        const links = JSON.parse(content) as Array<Link>;
        onUpload(links);
        setLinksInStorage(links);
      } catch (error) {
        console.error("Error reading or parsing file:", error);
      }
    };
    reader.readAsText(file);
  }

  return (
    <>
      <input
        type="file"
        accept=".json"
        className="file-input"
        onChange={uploadLinks}
      />
      <button
        type="button"
        className="upload-btn btn"
        disabled={disabled}
        onClick={() => {
          const fileInput = document.querySelector(
            ".file-input"
          ) as HTMLInputElement;
          fileInput.click();
        }}
      >
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
          <path d="M12 3v12" />
          <path d="m17 8-5-5-5 5" />
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        </svg>
      </button>
    </>
  );
}
