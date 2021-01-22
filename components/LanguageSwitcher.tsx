import NextLink from 'next/link';
import { linkResolver, hrefResolver } from '../prismic-configuration';

const AltLangs = ({ altLangs = [] }): JSX.Element =><>
  {altLangs.map((altLang) => 
      <li className="language-switcher" key={altLang.id}>
        <NextLink
          locale={altLang.lang}
          as={linkResolver(altLang)}
          href={hrefResolver(altLang)}
          passHref
        >
          <a className={`flag-icon-${altLang.lang.slice(-2)}`}>/</a>
        </NextLink>
      </li>
    )};
  </>
;

const LanguageSwitcher = ({ altLangs }) =><AltLangs altLangs={altLangs} />;

export default LanguageSwitcher;
