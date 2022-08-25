import React from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

export const PageSEO = ({ title = 'Home', description }: NextSeoProps) => {
  return <NextSeo title={title} titleTemplate="%s - BP Site" description={description} />;
};
