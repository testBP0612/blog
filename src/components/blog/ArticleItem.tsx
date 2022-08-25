import Tag from '@components/Tag';
import Link from 'next/link';
import React from 'react';

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={article.date}>{article.date}</time>
        </dd>
        <dt className="sr-only">Reading time estimation</dt>
        <dl>
          <span className="text-xs">{article.timeReading.text}</span>
        </dl>
      </dl>
      <div className="space-y-3 xl:col-span-3">
        <div>
          <h3 className="text-2xl font-bold leading-10 tracking-tight}">
            <Link href={`/blog/${article.slug}`} className="text-gray-900 dark:text-gray-100">
              {article.title}
            </Link>
          </h3>
          <div className="flex flex-wrap">
            {article.tags.map((tag: string) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{article.description}</div>
      </div>
    </div>
  );
};

export default ArticleItem;
