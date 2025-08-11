export const categories = [
  "uncategorized",
  "a11y",
  "azure",
  "cloudflare",
  "databases",
  "dotnet",
  "music",
  "python",
  "react",
  "theo",
  "typescript",
] as const;

export type Category = (typeof categories)[number];

export type Link = {
  id: string;
  title: string;
  url: string;
  category: Category;
};

export type LinkProps = {
  links: Array<Link>;
  setLinks: React.Dispatch<React.SetStateAction<Array<Link>>>;
};
