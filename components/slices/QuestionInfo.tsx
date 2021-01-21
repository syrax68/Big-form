import React , { useState, useEffect} from 'react';
import { RichText } from "prismic-reactjs";
import organisme from '../../pages/api/organisme';
import relation_type from '../../pages/api/relationType';
import relation_position from '../../pages/api/relationPosition';
import {
  Button,
  Grid,
  TextField
}from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Compound from './Compound';

const formatDate =(date)=> {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
const QuestionInfo = ({ slice , image, data, answer, setState}) => {
  const [budget,setBudget] = useState([1]);
  const [attendee,setAttendee] = useState([1]);
  const [duration, setDuration] = useState([1]);
  const [date, setDate] = useState<String | null>(formatDate(new Date()));;

  useEffect(() => {
    if ((process as any).browser) {
      if(localStorage.getItem("budget")){
        setBudget([Number(localStorage.getItem("budget"))]);
      }
      if(localStorage.getItem("attendee")){
        setAttendee([Number(localStorage.getItem("attendee"))]);

      }  
      if(localStorage.getItem("duration")){
        setDuration([Number(localStorage.getItem("duration"))]);
      }
    }
  }, [])

  const handleChangePosition = (item ,value) =>{
    if((process as any).browser){
      localStorage.setItem("relation_position",JSON.stringify(value));
      setState(item);
    }
  }

  const handleChangeType = (item ,value) =>{
    if((process as any).browser){
      localStorage.setItem("relation_type",JSON.stringify(value));
      setState(item);
    }
  }
  console.log(date)
  const handleChangeOrganism = (item ,value) =>{
    if((process as any).browser){
      localStorage.setItem("organism_name",JSON.stringify(value));
      setState(item);
    }
  }
  return (
  <div>
    {answer && answer[(answer.length)-1] == "some_hours" && data.id2?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[(answer.length)-1] == "some_days" && data.id3?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :answer && answer[(answer.length)-1] == "some_weeks" && data.id4?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id4])}</h5>
      :answer && answer[(answer.length)-1] == "some_months" && data.id5?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id5])}</h5>
      :answer && answer[0]== "others_but_not_me" && data.id2 ?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[0]== "others_but_not_me" && Number(attendee) == 1 && data.id2 ?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[0]== "others_but_not_me" && Number(attendee) >= 2 && data.id3 ?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :answer && answer[0]== "me_and_some_others" && data.id4 ?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id4])}</h5>
      :answer && answer[0]== "only_me" && Number(attendee) == 2 && data.id2?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id2])}</h5>
      :answer && answer[0]== "only_me" && Number(attendee) > 2 && data.id3?<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id3])}</h5>
      :<h5 className="title"><span>{RichText.asText(slice.primary.chapter)}-</span>{RichText.asText(slice.primary[data.id])}</h5>
    }
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Grid container justify="center" className="bloc">
          {data.response.map((item, index)=>{
            switch (item) {
              case 'organism_name':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" style={{display: "contents"}} key={index} >
                  <Autocomplete
                      id="organism_name"
                      options={organisme}
                      getOptionLabel={(option) => option.title}
                      onChange={(event,value) => handleChangeOrganism(item,value)}
                      style={{ width: '100%' }}
                      defaultValue={(process as any).browser?(JSON.parse(localStorage.getItem("organism_name"))):null}
                      renderInput={(params) => <TextField {...params} placeholder="Organisme" variant="outlined" />}
                  />
                </Grid>
              case 'relation_position':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" style={{display: "contents"}} key={index} >
                  <Autocomplete
                      id="relation_position"
                      options={relation_position}
                      getOptionLabel={(option) => option.title}
                      onChange={(event,value) => handleChangePosition(item,value)}
                      style={{ width: '100%' }}
                      defaultValue={(process as any).browser?(JSON.parse(localStorage.getItem("relation_position"))):null}
                      renderInput={(params) => <TextField {...params} placeholder="Position" variant="outlined" />}
                  />
                </Grid>
              case 'relation_type':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" style={{display: "contents"}} key={index} >
                  <Autocomplete
                      id="relation_type"
                      options={relation_type}
                      getOptionLabel={(option) => option.title}
                      onChange={(event,value) => handleChangeType(item,value)}
                      style={{ width: '100%' }}
                      defaultValue={(process as any).browser?(JSON.parse(localStorage.getItem("relation_type"))):null}
                      renderInput={(params) => <TextField {...params} placeholder="Niveau de relation" variant="outlined" />}
                  />
                </Grid>
              case 'budget':
                return <Grid container className="bloc-item flex-bloc" key={index} >
                  <Compound defaultValue={budget} text={RichText.asText(slice.primary[item])} setState={value => {(process as any).browser?(localStorage.setItem("budget",value)):null}}/>
                  <Button variant="contained" color="primary" style={{height:"40px", right: "10px", backgroundColor:"#0e5a73"}} onClick={()=>setState(item)}>
                    Valider
                  </Button>
                </Grid>
              case 'attendees_number':
                return <Grid container className="bloc-item flex-bloc" key={index} >
                  <Compound defaultValue={attendee} text={RichText.asText(slice.primary[item])} setState={state => {(process as any).browser?(localStorage.setItem("attendee",state)):null}}/>
                  <Button variant="contained" color="primary" style={{height:"40px", right: "10px", backgroundColor:"#0e5a73"}} onClick={()=>setState(item)}>
                    Valider
                  </Button>
                </Grid>
              case 'desired_date':
                return <Grid container className="bloc-item flex-bloc" key={index} >
                  <TextField
                    id="date"
                    type="date"
                    className="datePicker"
                    defaultValue={date}
                    onChange={event => setDate(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* <Compound defaultValue={date} text={RichText.asText(slice.primary[item])} setState={state => {(process as any).browser?(localStorage.setItem("date",state)):null}}/> */}
                  <Button variant="contained" color="primary" style={{height:"40px", right: "10px", backgroundColor:"#0e5a73"}} onClick={()=>setState(item)}>
                    Valider
                  </Button>
                </Grid>
              case 'duration':
                return <Grid container className="bloc-item flex-bloc" key={index} >
                  <Compound defaultValue={duration} text={answer[answer.length-1]== "some_months"?"mois":answer[answer.length-1]== "some_weeks"?"semaines":answer[answer.length-1]== "some_days"?"jours":answer[answer.length-1]== "some_hours"?"heures":null} setState={state => {(process as any).browser?(localStorage.setItem("duration",state)):null}}/>
                  <Button variant="contained" color="primary" style={{height:"40px", right: "10px", backgroundColor:"#0e5a73"}} onClick={()=>setState(item)}>
                    Valider
                  </Button>
                </Grid>
              default:
                return <Grid item xs={12} md={data.response.length>4?5:true} lg={data.response.length>4?5:true}  className="bloc-item" key={index} onClick={() => setState(item)}>
                  {answer && answer[0]== "others_but_not_me" && slice.primary[item+"_2"]?<p className="response" >{RichText.asText(slice.primary[item+"_2"])}</p>
                  :answer && answer[0]== "me_and_some_others" && slice.primary[item+"_3"]?<p className="response" >{RichText.asText(slice.primary[item+"_3"])}</p>
                  :<p className="response" >{RichText.asText(slice.primary[item])}</p>
                  }
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
