import React from 'react';
import { ReadTimeResults } from 'reading-time';

interface ArticleHeaderProps {
  frontMatter: ArticleFrontMatter;
  timeReading: ReadTimeResults;
}

const ArticleHeader = ({ frontMatter, timeReading }: ArticleHeaderProps) => {
  return (
    <div className="shadow-inner">
      <div className="relative mb-6 py-12">
        <div className="flex justify-center items-center gap-4 md:text-lg text-sm italic">
          <div className="font-medium text-gray-900 dark:text-gray-100">{frontMatter.date}</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{timeReading.text}</div>
        </div>
        <h1 className="container mx-auto md:text-5xl sm:text-4xl text-3xl text-center font-bold md:leading-normal sm:leading-12 leading-9">
          {frontMatter.title}
          </h1>
        <div className="absolute top-0 left-0 w-1/3 h-2 rounded bg-red-400 bg-gradient-to-r from-blue-400 to-primary-600 "></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-2 rounded bg-green-400 bg-gradient-to-r from-primary-400 to-blue-600 "></div>
      </div>
    </div>
  );
};

export default ArticleHeader;
