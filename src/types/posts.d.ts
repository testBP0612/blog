
type BlogArticle = {
  [key: string]: string | Array<string>;
}

type Article = ArticleFrontMatter & {
  slug: string;
  coverImage: string;
  author: AuthorType;
  excerpt: string;
  timeReading: {
    text: string;
  };
  ogImage?: {
    url: string;
  };
  content?: string;
}

type ArticleFrontMatter = {
  title: string;
  date: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
};