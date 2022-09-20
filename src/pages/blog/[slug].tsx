import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ParsedUrlQuery } from 'querystring';
import prism from 'remark-prism';
import readingTime, { ReadTimeResults } from 'reading-time';

import Button from '@components/UI/Button';
import SectionContainer from '@components/layout/SectionContainer';
import { PageSEO } from '@components/SEO';
import ArticleHeader from '@components/blog/ArticleHeader';

import { getAllArticles, getRawArticleBySlug } from '@api/posts.api';

interface PagePostProps {
  frontMatter: ArticleFrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  timeReading: ReadTimeResults;
}

const components = { Button };

const PagePost: NextPage<PagePostProps> = ({ frontMatter, mdxSource, timeReading }) => {
  return (
    <>
      <PageSEO title={frontMatter.title} description={frontMatter.description} />
      <ArticleHeader frontMatter={frontMatter} timeReading={timeReading} />
      <SectionContainer>
        <article className="prose md:prose-lg lg:prose-xl prose-sm dark:prose-dark mx-auto max-w-none">
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </SectionContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles: BlogArticle[] = getAllArticles(['slug']);
  const paths = articles.map(article => ({
    params: {
      slug: article.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params as Params;

  const { data: frontMatter, content } = getRawArticleBySlug(slug);
  const timeReading = readingTime(content);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    mdxOptions: { remarkPlugins: [prism] },
  });

  return {
    props: {
      frontMatter,
      timeReading,
      mdxSource,
    },
  };
};

export default PagePost;
