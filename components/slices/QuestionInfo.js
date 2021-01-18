import React , {useEffect} from 'react';
import { RichText } from 'prismic-reactjs';
import organisme from '../../pages/api/organisme';
import relation_type from '../../pages/api/relationType';
import relation_position from '../../pages/api/relationPosition';
import {
  Grid,
  Paper, 
  TextField
}from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Compound from './Compound';

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
                      id="organism_name"
                      options={organisme}
                      getOptionLabel={(option) => option.title}
                      onChange={() => setState(item)}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} placeholder="Organisme" variant="outlined" />}
                  />
                </Grid>
              case 'relation_position':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Autocomplete
                      id="relation_postition"
                      options={relation_position}
                      getOptionLabel={(option) => option.title}
                      onChange={() => setState(item)}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} placeholder="Position" variant="outlined" />}
                  />
                </Grid>
              case 'relation_type':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Autocomplete
                      id="relation_type"
                      options={relation_type}
                      getOptionLabel={(option) => option.title}
                      onChange={() => setState(item)}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} placeholder="Niveau de relation" variant="outlined" />}
                  />
                </Grid>

              case 'budget':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound />
                </Grid>
              case 'attendees_number':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound/>
                </Grid>
              case 'desired_date':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound/>
                </Grid>
              case 'duration':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound/>
                </Grid>
              default:
                return <Grid item xs={12} md lg={data.response.length>3?5:true}  className="bloc-item" key={index} onClick={() => setState(item)}>
                  <p className="response" >{RichText.asText(slice.primary[item])}</p>
                  {image.map((slice , index)=>{
                    if(slice.slice_label == item){
                      return <img
                        src={slice.items[Math.floor(Math.random() * slice.items.length)][item].url}
                        alt={item}
                        key={index} 
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
