import React, {useState, useEffect} from 'react';
import {
  QuestionInfo,
} from './slices';
import {
  Grid,
}from '@material-ui/core';
import question from '../pages/api/question';
import nextQuestion from '../pages/api/nextQuestion';
import firstQuestion from '../pages/api/firstQuestion';
import next from 'next';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SliceZone = ({ sliceZone , image}) => {
  const [answer, setNextAnswer] = useState([]);
  const [lastAnswer, setLastAnswer] = useState([]);
 
  const handleBack = () => {
    lastAnswer.pop();
    setNextAnswer([...lastAnswer]);  
  };
  
  useEffect(() => {
    if(answer && answer[0] != "only_me" && answer[0] != "me_and_some_others" && answer[0] != "others_but_not_me"){
      answer.pop();
    }
  }, [answer, lastAnswer]);
  // if(answer[answer.length-1] == "duration"){
  //   if(process.browser){
  //     localStorage.clear();
  //   }
  // }

  return (
    <div className="container">
      <button type="button" hidden={answer.length === 0 || answer[answer.length-1] == "duration"} className="back" aria-label="Previous" onClick={handleBack}><ArrowBackIcon style={{color:'black'}}/></button>
      {answer[answer.length-1] == "duration"?
        <Grid item xs={12} md={12} lg={12} className="bloc-item">
          <p style={{color:"red",textAlign:"center", fontWeight:"600"}}>Félicitations, vous pouvez désormais envoyer votre devis !</p>
        </Grid>
        :answer.length > 1?
        nextQuestion.map((item, key)=>
        (
          item.response === answer[answer.length-1]?
            question.map((itemquestion, key)=>
              itemquestion.id === item.id?   
                sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
                    <QuestionInfo slice={filteredSlice} answer={answer} image={image} data={itemquestion} key={index} index={key} setState={state => {setNextAnswer([...answer,state]); setLastAnswer([...lastAnswer,state])}}/>
                ))
              :null
            )
          :null
        ))
      :(answer.length == 1 && answer[0] == "only_me" || answer[0] == "me_and_some_others" || answer[0] == "others_but_not_me")?
        nextQuestion.map((item, key)=>
        (
          item.response == answer[0]?
            question.map((itemquestion, key)=>
              itemquestion.id === item.id?
                sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
                    <QuestionInfo slice={filteredSlice} image={image} data={itemquestion} key={index} index={key} setState={state => {setNextAnswer([...answer,state]); setLastAnswer([...lastAnswer,state])}}/>
                ))
              :null
            )
          :null
        ))
      :((answer || answer.length == 0) && answer[0] && answer[0] !== "only_me" && answer[0] !== "me_and_some_others" && answer[0] !== "others_but_not_me")? 
        question.map((item, key)=>
          item.id == "who"?
            question.map((itemquestion, key)=>
              itemquestion.id === item.id?
                sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
                    <QuestionInfo slice={filteredSlice} image={image} data={itemquestion} key={index} index={key} setState={state => {setNextAnswer([...answer,state]); setLastAnswer([...lastAnswer,state])}}/>
                ))
              :null
            )
          :null
        )
      :firstQuestion.map((item, key)=> 
        sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
            <QuestionInfo slice={filteredSlice} image={image} data={item} key={index} index={key} setState={state => {setNextAnswer([...answer,state]); setLastAnswer([...lastAnswer,state])}}/>
        ))
      )}
    </div>
  );
};

export default SliceZone;