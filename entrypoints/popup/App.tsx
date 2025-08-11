import "./style.css";
import LinkManager from "./components/LinkManager";
import Download from "./components/Download";
import Upload from "./components/Upload";
import React from "react";
import type { Link } from "./types";

function App() {
  const [links, setLinks] = useState<Array<Link>>([]);

  return (
    <React.Fragment>
      <header>
        <h1>Link Manager</h1>
        <Download />
        <Upload
          disabled={links?.length > 0}
          links={links}
          onUpload={(links) => setLinks(links)}
        />
      </header>
      <LinkManager links={links} setLinks={setLinks} />
    </React.Fragment>
  );
}

export default App;
