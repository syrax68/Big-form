import React from 'react';
import NextLink from 'next/link';
// @ts-ignore
import { LanguageSwitcher } from './index.tsx';

const Header = ({ altLangs }) => (
  <>
    <header>
      <div className="menu">
        <NextLink href={'/'} passHref>
          <a>
            <img className="logo" src="/images/logo.png" alt="Site logo" />
          </a>
        </NextLink>
      </div>
      <div className="menu">
        <ul>
          <LanguageSwitcher altLangs={altLangs} />
        </ul>
      </div>
    </header>
  </>
);

export default Header;
