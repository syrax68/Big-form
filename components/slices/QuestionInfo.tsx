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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Compound from './Compound';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring/web.cjs';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
const QuestionInfo = ({ slice , image, data, answer, setState}) => {
  const classes = useStyles();
  const [budget,setBudget] = useState([1]);
  const [attendee,setAttendee] = useState([1]);
  const [duration, setDuration] = useState([1]);
  const [date, setDate] = useState([1]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      if(localStorage.getItem("date")){
        setDate([Number(localStorage.getItem("date"))]);
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
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
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
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
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
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
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
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound defaultValue={budget} text={RichText.asText(slice.primary[item])} setState={value => {(process as any).browser?(localStorage.setItem("budget",value),handleOpen()):null}}/>
                  <Modal
                      aria-labelledby="spring-modal-title"
                      aria-describedby="spring-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                      timeout: 500,
                  }}
                  >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h6 id="spring-modal-title">Veuillez valider votre choix</h6>
                      <p>{(process as any).browser?(localStorage.getItem("budget")):budget} {RichText.asText(slice.primary[item])}</p>
                      <Button variant="contained" color="primary" className="button" onClick={() => setState(item)}>
                        Valider
                      </Button>
                    </div>
                  </Fade>
                </Modal>
                </Grid>
              case 'attendees_number':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound defaultValue={attendee} text={RichText.asText(slice.primary[item])} setState={state => {(process as any).browser?(localStorage.setItem("attendee",state),handleOpen()):null}}/>
                  <Modal
                      aria-labelledby="spring-modal-title"
                      aria-describedby="spring-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                  }}
                  >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h6 id="spring-modal-title">Veuillez valider votre choix</h6>
                      <p>{(process as any).browser?(localStorage.getItem("attendee")):attendee} {RichText.asText(slice.primary[item])}</p>
                      <Button variant="contained" color="primary" className="button" onClick={() => setState(item)}>
                        Valider
                      </Button>
                    </div>
                  </Fade>
                </Modal>
                </Grid>
              case 'desired_date':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound defaultValue={date} text={RichText.asText(slice.primary[item])} setState={state => {(process as any).browser?(localStorage.setItem("date",state),handleOpen()):null}}/>
                  <Modal
                      aria-labelledby="spring-modal-title"
                      aria-describedby="spring-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                  }}
                  >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h6 id="spring-modal-title">Veuillez valider votre choix</h6>
                      <p>{(process as any).browser?(localStorage.getItem("date")):date} {RichText.asText(slice.primary[item])}</p>
                      <Button variant="contained" color="primary" className="button" onClick={() => setState(item)}>
                        Valider
                      </Button>
                    </div>
                  </Fade>
                </Modal>
                </Grid>
              case 'duration':
                return <Grid item xs={12} md={12} lg={12} className="bloc-item" key={index} >
                  <Compound defaultValue={duration} text={answer[answer.length-1]== "some_months"?"mois":answer[answer.length-1]== "some_weeks"?"semaines":answer[answer.length-1]== "some_days"?"jours":answer[answer.length-1]== "some_hours"?"heures":null} setState={state => {(process as any).browser?(localStorage.setItem("duration",state),handleOpen()):null}}/>
                  <Modal
                      aria-labelledby="spring-modal-title"
                      aria-describedby="spring-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                  }}
                  >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h6 id="spring-modal-title">Veuillez valider votre choix</h6>
                      <p>{(process as any).browser?(localStorage.getItem("duration")):duration} {answer[answer.length-1]== "some_months"?"mois":answer[answer.length-1]== "some_weeks"?"semaines":answer[answer.length-1]== "some_days"?"jours":answer[answer.length-1]== "some_hours"?"heures":null}</p>
                      <Button variant="contained" color="primary" className="button" onClick={() => setState(item)}>
                        Valider
                      </Button>
                    </div>
                  </Fade>
                </Modal>
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
