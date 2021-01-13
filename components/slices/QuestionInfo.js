import React from 'react';
import { RichText } from 'prismic-reactjs';
import {
  Grid,
  Paper, 
}from '@material-ui/core';
const QuestionInfo = ({ slice , image, data}) => {
  const handleClick = (event, value) =>{
    console.log(event);
  }
  return (
  <div>
    <h3 className="title">{RichText.asText(slice.primary[data.id])}</h3>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2} >
          {data.response.map((item, index)=>
            <Grid item xs className="bloc-item" key={index} onClick={()=>handleClick(item)}>
              <p className="response" >{RichText.asText(slice.primary[item])}</p>
              {image.map((slice , index)=>{
                if(slice.slice_type == item){
                  return <img
                    src={slice.items[Math.floor(Math.random() * slice.items.length)][item].url}
                    alt={item}
                    key={index}
                    style={{width:"100%"}}
                  />
                }
              })}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
    {/* <div style={{display:"flex", padding:"10px", margin:"10px"}}>
      {data.response.map((item, index)=>
        <div key={index} onClick={()=>handleClick(item)}>
          <h6  style={{padding:"10px", margin:"10px"}} >{RichText.asText(slice.primary[item])}</h6>
          {image.map((slice , index)=>{
            if(slice.slice_type == item){
              return <img
                src={slice.items[Math.floor(Math.random() * slice.items.length)][item].url}
                alt={item}
                key={index}
                style={{width:"50%"}}
              />
            }
          })}
        </div>
      )}   
    </div> */}
  </div>
  );
}

export default QuestionInfo;
