import React from 'react';
import Head from 'next/head';
// @ts-ignore
import { prismicRepoName } from '../utils/prismicHelpers.tsx';
// @ts-ignore
import Header from './Header.tsx';

interface Props {
  children: Object;
  altLangs: Object;
  lang: Object;
  menu: Object;
}

const Layout = ({children,altLangs,lang,menu}: Props): JSX.Element => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <title>Multi-language site</title>
      <script
        async
        defer
        src={`https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicRepoName}`}
      />
    </Head>
    <Header
      altLangs={altLangs}
      menu={menu}
    />
    <main>{children}</main>
  </>
);

export default Layout;
