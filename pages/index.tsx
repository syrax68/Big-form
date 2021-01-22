import React from 'react';
// @ts-ignore
import { Client, manageLocal } from '../utils/prismicHelpers.tsx';
import useUpdatePreviewRef from '../utils/hooks/useUpdatePreviewRef';
import  Layout  from '../components/Layout';
// @ts-ignore
import SliceZone from '../components/SliceZone.tsx';

/**
 * Homepage component
 */
const Homepage = ({ doc,image, lang, preview }) => {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id)
    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={preview.isActive}
      >
        <SliceZone sliceZone={doc.data.body} image={image.data.body}/>
      </Layout>
    );
  } 
};

export async function getStaticProps({
  preview, 
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null
  const isPreview = preview || false
  const client = Client();
  const doc =
    (await client.getSingle('big_form', ref ? { ref, lang: locale } : { lang: locale })) ||
    {};
  const image =
    (await client.getSingle('image', ref ? { ref, lang: locale } : { lang: locale })) ||
    {};

  const { currentLang, isMyMainLanguage} = manageLocal(locales, locale)
  return {
    props: {
      doc,
      image,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang:{
        currentLang,
        isMyMainLanguage,
      }
    },
  };
}

export default Homepage;
