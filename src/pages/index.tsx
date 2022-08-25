import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { PageSEO } from '@components/SEO';

const Home: NextPage = () => {
  return (
    <>
      <PageSEO />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
