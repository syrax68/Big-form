import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import { Layout } from 'components';
import { RichText } from 'prismic-reactjs';
import question from './api/question';

/**
 * Homepage component
 */
const Homepage = ({ doc, lang, preview }) => {

  if (doc && doc.data) {

    useUpdatePreviewRef(preview, doc.id)
    const handleClick = (event, data) =>{
      console.log(doc.data.body);
    }
    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        isPreview={preview.isActive}
      >
        
        {(doc.data.body).map((slice, index) =>
          {
            console.log(slice.slice_type)
            if(String(slice.slice_type) == 'question_reponse'){
              return (
                <div>
                <h3 style={{textAlign:"center "}}>{RichText.asText(slice.primary.who1)}</h3>
                <div key={index} style={{display:"flex", padding:"10px", margin:"10px"}}>   
                  <div onClick={()=>handleClick(slice.primary.only_me1)}>
                    <h6  style={{padding:"10px", margin:"10px"}} >{RichText.asText(slice.primary.only_me1)}</h6>
                    {(doc.data.body).map((slice, index) =>
                    { 
                      if(String(slice.slice_type) == 'only_me'){
                        return <img
                          style={{width:"50% "}}
                          src={slice.items[Math.floor(Math.random() * (slice.items).length)].onle_me_image.url}
                          alt={slice.items[Math.floor(Math.random() * (slice.items).length)].onle_me_image.name || ''}
                        />
                      }
                    })}
                     
                  </div>
                  <div>
                  <h6  style={{padding:"10px", margin:"10px"}} onClick={()=>handleClick(slice.primary.only_me1)}>{RichText.asText(slice.primary.me_and_some_others1)}</h6>
                  </div>
                  <div>
                  <h6  style={{padding:"10px", margin:"10px"}} onClick={()=>handleClick(slice.primary.others_but_not_me1)}>{RichText.asText(slice.primary.others_but_not_me1)}</h6>
                  </div>      
                </div>
                </div>
              )
            }
          }
        )}
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
  // const menu =
  //   (await client.getSingle('top_menu', ref ? { ref, lang: locale } : { lang: locale })) ||
  //   {};

  const { currentLang, isMyMainLanguage} = manageLocal(locales, locale)

  return {
    props: {
      doc,
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
