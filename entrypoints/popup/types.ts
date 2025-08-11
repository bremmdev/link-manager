export const categories = [
  "Uncategorized",
  "A11Y",
  "Azure",
  "Cloudflare",
  "Databases",
  "Dotnet",
  "Music",
  "Python",
  "React",
  "Theo",
  "Typescript",
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
