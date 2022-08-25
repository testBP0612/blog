import React, { useState } from 'react';
import type { GetStaticProps } from 'next';

import { PageSEO } from '@components/SEO';
import ArticleItem from '@components/blog/ArticleItem';

import { getAllArticles } from '@api/posts.api';

interface PageBlogHomeProps {
  articles: Article[];
}

const PageBlogHome = ({ articles }: PageBlogHomeProps) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = articles.filter(frontMatter => {
    const searchContent = frontMatter.title + frontMatter.description + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = !searchValue ? articles : filteredBlogPosts;

  return (
    <>
      <PageSEO title="Blog" />
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Blog
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={e => setSearchValue(e.target.value)}
              placeholder="搜尋文章"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="divide-y-2 divide-gray-400">
          {!filteredBlogPosts.length && '沒有搜尋結果，請重新搜尋'}
          {displayPosts.map((article, index) => (
            <li className="py-8" key={index}>
              <ArticleItem article={article} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles: BlogArticle[] = getAllArticles([
    'coverImage',
    'date',
    'description',
    'excerpt',
    'slug',
    'tags',
    'title',
    'timeReading',
    'ogImage',
  ]);

  return {
    props: {
      articles,
    },
  };
};

export default PageBlogHome;
