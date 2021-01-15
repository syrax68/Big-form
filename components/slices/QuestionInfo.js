import React , {useEffect} from 'react';
import { RichText } from 'prismic-reactjs';
import organisme from '../../pages/api/organisme';
import {
  Grid,
  Paper, 
  TextField
}from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
const QuestionInfo = ({ slice , image, data, index, setState}) => {
  return (
  <div>
    <h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id])}</h5>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Grid container justify="center" className="bloc">
          {data.response.map((item, index)=>{
            switch (item) {
              case 'organism_name':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Autocomplete
                      id="combo-box-demo"
                      options={organisme}
                      getOptionLabel={(option) => option.title}
                      onChange={() => setState(item)}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} placeholder="Organisme" variant="outlined" />}
                  />
                </Grid>         
              default:
                return <Grid item xs={12} md lg className="bloc-item" key={index} onClick={() => setState(item)}>
                  <p className="response" >{RichText.asText(slice.primary[item])}</p>
                  {image.map((slice , index)=>{
                    if(slice.slice_label == item){
                      return <img
                        src={slice.items[Math.floor(Math.random() * slice.items.length)][item].url}
                        alt={item}
                        key={index}
                        style={{width:"100%"}}
                      />
                    }
                  })}
                </Grid>
            }
          })}
        </Grid>
      </Grid>
    </Grid>
  </div>
  );
}

export default QuestionInfo;
