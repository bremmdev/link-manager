type Link = {
  id: string;
  title: string;
  url: string;
};

async function getLinksFromStorage() {
  const links = (await storage.getItem<Array<Link>>("sync:links")) ?? [];
  return links;
}

async function setLinksInStorage(links: Array<Link>): Promise<void> {
  await storage.setItem<Array<Link>>("sync:links", links);
}

export default function LinkManager() {
  const [links, setLinks] = useState<Array<Link>>([]);

  useEffect(() => {
    const loadLinks = async () => {
      const data = await getLinksFromStorage();
      setLinks(data);
    };

    loadLinks();
  }, []);

  async function saveLink() {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!activeTab?.url) return;

    const bookmarkLink = {
      id: `${activeTab.url}-${Date.now()}`,
      title: activeTab.title ?? "",
      url: activeTab.url ?? "",
    };

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks, bookmarkLink];
      // Save to storage right after calculating the new state
      setLinksInStorage(newLinks);
      return newLinks;
    });
  }

  return (
    <div className="container">
      <button className="save-btn" onClick={saveLink}>
        Save Active Tab
      </button>
      <ul className="link-list">
        {links &&
          links.map((l) => (
            <li key={l.id}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
