import { default as NextLink } from 'next/link';
import { RichText } from 'prismic-reactjs';
import { hrefResolver } from '../prismic-configuration';

const MenuLinks = ({ links = [] }):JSX.Element => <>
  {links?links.map((menuLink) => {
      return (
        <li className="language-switcher" key={menuLink.link.id}>
          <NextLink
            href={hrefResolver(menuLink.link)}
            passHref
          >
            <a>{RichText.asText(menuLink.label)}</a>
          </NextLink>
        </li>
      );
    }):null}
  </>

const Navigation = ({ menu }) =>
  menu ? <MenuLinks links={menu.data.menu_links} /> : null;

export default Navigation;
