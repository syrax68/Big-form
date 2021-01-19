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

const QuestionInfo = ({ slice , image, data, answer, index, setState}) => {

  const [budget,setBudget] = useState([1]);
  const [attendee,setAttendee] = useState([1]);
  const [duration, setDuration] = useState([1]);
  const [date, setDate] = useState([1]);
  const [validationCondition, setValidation] = useState(false);
  useEffect(() => {
    if (process.browser) {
      setBudget(localStorage.getItem("budget"));
      setAttendee(localStorage.getItem("attendee"));
      setDuration(localStorage.getItem("duration"));
      setDate(localStorage.getItem("date"));
    }
    
    {data.condition?data.condition.map((condition)=>{
      setValidation(answer.includes(condition));
    }):null}
    
  }, [answer])
  console.log(slice.primary)

  return (
  <div>
    {answer && answer[(answer.length)-1] == "some_hours" && data.id2?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[(answer.length)-1] == "some_days" && data.id3?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :answer && answer[(answer.length)-1] == "some_weeks" && data.id4?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id4])}</h5>
      :answer && answer[(answer.length)-1] == "some_months" && data.id5?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id5])}</h5>
      :attendee == 2 && data.id3?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :attendee > 2 && data.id3?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :answer && answer[0]== "others_but_not_me" && data.id2 ?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[0]== "others_but_not_me" && attendee == 1 && data.id2 ?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[0]== "others_but_not_me" && attendee == 2 && data.id3 ?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :answer && answer[0]== "me_and_some_others" && data.id4 ?<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id4])}</h5>
      :<h5 className="title"><span>{index+1}-</span>{RichText.asText(slice.primary[data.id])}</h5>
    }
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
                  <Compound value={budget} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?(localStorage.setItem("budget",state), setState(item)):null}}/>
                </Grid>
              case 'attendees_number':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={attendee} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?(localStorage.setItem("attendee",state), setState(item)):null}}/>
                </Grid>
              case 'desired_date':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={date} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?(localStorage.setItem("date",state), setState(item)):null}}/>
                </Grid>
              case 'duration':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound value={duration} text={RichText.asText(slice.primary[item])} setState={state => {process.browser?(localStorage.setItem("duration",state), setState(item)):null}}/>
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
