import React , {useState,useEffect} from 'react';
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

  const [budget,setBudget] = useState([10]);
  const [number,setNumber] = useState([10]);
  const [duration, setDuration] = useState([10]);
  const [date, setDate] = useState([10]);
  useEffect(() => {
    if (process.browser) {
      setBudget(localStorage.getItem("budget"));
      setNumber(localStorage.getItem("number"));
      setDuration(localStorage.getItem("duration"));
      setDate(localStorage.getItem("date"));
    }
  }, [])
 
  
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
                  <Compound value={budget} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?localStorage.setItem("budget",state):null,setState(item)}}/>
                </Grid>
              case 'attendees_number':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={number} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?localStorage.setItem("number",state):null,setState(item)}}/>
                </Grid>
              case 'desired_date':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={date} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?localStorage.setItem("date",state):null,setState(item)}}/>
                </Grid>
              case 'duration':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={duration} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?localStorage.setItem("duration",state):null,setState(item)}}/>
                </Grid>
              default:
                return <Grid item xs={12} md={data.response.length>4?5:true} lg={data.response.length>4?5:true}  className="bloc-item" key={index} onClick={() => setState(item)}>
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
