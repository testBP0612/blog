import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { ParsedUrlQuery } from 'querystring';
import SyntaxHighlighter from 'react-syntax-highlighter';
import prism from "remark-prism";

import Button from '@components/UI/Button';
import { PageSEO } from '@components/SEO';
import { getAllArticles, getRawArticleBySlug } from '@api/posts.api';

interface PagePostProps {
  frontMatter: ArticleFrontMatter;
  mdxSource: MDXRemoteSerializeResult;
}

const components = { Button };

const PagePost: NextPage<PagePostProps> = ({ frontMatter, mdxSource }) => {
  return (
    <>
      <PageSEO title={frontMatter.title} description={frontMatter.description} />
      <article className="prose md:prose-lg prose-sm dark:prose-dark mx-auto">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...mdxSource} components={components} />
      </article>
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

  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    mdxOptions: { remarkPlugins: [prism] },
  });

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export default PagePost;
