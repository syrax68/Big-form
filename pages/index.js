import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import { Layout, SliceZone  } from 'components';
import { useState } from 'react';

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
        isPreview={preview.isActive}
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
