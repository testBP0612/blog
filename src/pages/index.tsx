import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { PageSEO } from '@components/SEO';
import SectionContainer from '@components/layout/SectionContainer';
import { Start } from '@components/icon';

const Home: NextPage = () => {
  return (
    <>
      <PageSEO />
      <SectionContainer>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Start fill='' stroke='' />
      </SectionContainer>
    </>
  );
};

export default Home;
