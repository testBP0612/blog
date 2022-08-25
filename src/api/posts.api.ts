import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const articlesDirectory = path.join(process.cwd(), 'src/posts');

const getAllSlugs = (): string[] => fs.readdirSync(articlesDirectory);

export const getRawArticleBySlug = (slug: string): matter.GrayMatterFile<string> => {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

const getArticleBySlug = (
  slug: string,
  fields: string[] = [],
): BlogArticle => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const { data, content } = getRawArticleBySlug(realSlug);
  const timeReading: any = readingTime(content);
  const items: BlogArticle = {};
  
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "timeReading") {
      items[field] = timeReading;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export const getAllArticles = (fields: string[] = []): BlogArticle[] => {
  return getAllSlugs()
    .map((slug) => getArticleBySlug(slug, fields))
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
}