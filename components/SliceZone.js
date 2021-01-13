import React from 'react';
import {
  QuestionInfo,
} from './slices';
import question from '../pages/api/question';

const SliceZone = ({ sliceZone , image}) => {
  console.log(question)
  return (
    <div className="container">
      {question.map((item)=>
        sliceZone.filter(slice => slice.slice_label === item.id).map((filteredSlice, index) => (
            <QuestionInfo slice={filteredSlice} image={image} data={item} key={`slice-${index}`} />
        ))
      )}
    </div>
  );
};

export default SliceZone;