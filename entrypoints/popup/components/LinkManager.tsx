import { FormEvent } from "react";
import DeleteButton from "./DeleteButton";
import type { Link, Category, LinkProps } from "../types";
import { categories } from "../types";

export async function getLinksFromStorage() {
  const links = (await storage.getItem<Array<Link>>("sync:links")) ?? [];
  return links;
}

export async function setLinksInStorage(links: Array<Link>): Promise<void> {
  await storage.setItem<Array<Link>>("sync:links", links);
}

export default function LinkManager({ links, setLinks }: LinkProps) {
  const [selectedFilter, setSelectedFilter] = useState<Category | "All">("All");

  useEffect(() => {
    const loadLinks = async () => {
      const data = await getLinksFromStorage();
      setLinks(data);
    };

    loadLinks();
  }, []);

  async function saveLink(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const selectedCategory = formData.get("category") as Category;

    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!activeTab?.url) return;

    const bookmarkLink = {
      id: `${activeTab.url}-${Date.now()}`,
      title: activeTab.title ?? "",
      url: activeTab.url ?? "",
      category: selectedCategory,
    };

    setLinks((prevLinks) => {
      const newLinks = [...prevLinks, bookmarkLink];
      // Save to storage right after calculating the new state
      setLinksInStorage(newLinks);
      return newLinks;
    });
  }

  async function deleteLink(id: string) {
    setLinks((prevLinks) => {
      const newLinks = prevLinks.filter((l) => l.id !== id);
      setLinksInStorage(newLinks);
      return newLinks;
    });
  }

  return (
    <div className="container">
      <form onSubmit={saveLink}>
        <div>
          <label htmlFor="category">Category:</label>
          <select name="category" id="category">
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button className="btn">Save Active Tab</button>
      </form>

      <div className="filter-area">
        <label htmlFor="filter">Filter by Category:</label>
        <select
          name="filter"
          id="filter"
          value={selectedFilter}
          onChange={(e) =>
            setSelectedFilter(e.target.value as Category | "All")
          }
        >
          <option value="All">all</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul className="link-list">
        {links && links.length > 0 ? (
          (() => {
            const filteredLinks = links.filter(
              (l) => selectedFilter === "All" || l.category === selectedFilter
            );

            if (filteredLinks.length === 0) {
              return <p className="fallback-text">No links for this filter.</p>;
            }

            return filteredLinks.map((l) => (
              <li key={l.id}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.title}
                  <span className="category">{l.category}</span>
                </a>
                <DeleteButton onClick={() => deleteLink(l.id)} />
              </li>
            ));
          })()
        ) : (
          <p className="fallback-text">There are no saved links.</p>
        )}
      </ul>
    </div>
  );
}
