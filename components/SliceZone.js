import React, {useState, useEffect} from 'react';
import {
  QuestionInfo,
} from './slices';
import question from '../pages/api/question';
import nextQuestion from '../pages/api/nextQuestion';
import next from 'next';

const SliceZone = ({ sliceZone , image}) => {
  const [answer, setNextAnswer] = useState([]);
  useEffect(() => {
    if(answer && answer[0] != "only_me" && answer[0] != "me_and_some_others" && answer[0] != "others_but_not_me"){
      answer.pop();
    }
    console.log(answer);
    console.log(answer.length);
  }, [answer])
  return (
    <div className="container">
      {answer.length > 1?
        nextQuestion.map((item, key)=>
        (
          item.response == answer[answer.length-1]?
            question.map((itemquestion, key)=>
              itemquestion.id === item.id?
                sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
                    <QuestionInfo slice={filteredSlice} image={image} data={itemquestion} key={index} index={key} setState={state => setNextAnswer([...answer,state])}/>
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
                    <QuestionInfo slice={filteredSlice} image={image} data={itemquestion} key={index} index={key} setState={state => setNextAnswer([...answer,state])}/>
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
                    <QuestionInfo slice={filteredSlice} image={image} data={itemquestion} key={index} index={key} setState={state => setNextAnswer([...answer,state])}/>
                ))
              :null
            )
          :null
        )
      :question.map((item, key)=> 
        sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
            <QuestionInfo slice={filteredSlice} image={image} data={item} key={index} index={key} setState={state => setNextAnswer([...answer,state])}/>
        ))
      )}
    </div>
  );
};

export default SliceZone;