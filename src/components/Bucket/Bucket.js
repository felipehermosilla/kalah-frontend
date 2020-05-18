import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import classes from './Bucket.module.css';

const bucket = (props) => {
  let pieces = [];
  for (var i = 0; i < props.pieces; i++) {
    pieces.push(<span key={i} className="badge badge-dark">P</span>);
  }
  const classContainer = props.type === "NORMAL" ? 'col-md-2' : 'col-md-12';
  let bucketItemClass = [classes.Bucket];
  bucketItemClass[1] = props.type === "NORMAL" ? '' : classes.BucketPrincipal;
  if(props.type === "NORMAL" && props.turn === "FIRST_PLAYER" && props.bucketId<7){
    bucketItemClass.push(classes.FirstPlayerBucketSelector)
  }else if(props.type === "NORMAL" && props.turn === "SECOND_PLAYER" && (props.bucketId>7 && props.bucketId<14)){
    bucketItemClass.push(classes.SecondPlayerBucketSelector);
  }

  return (
    <div className={classContainer} >

      <div className={bucketItemClass.join(' ')} onClick={props.clicked}>
        {props.type === "NORMAL" ? '': <h6>Principal Table</h6>}
        <div>
          {pieces.length > 0 ? pieces: ''}
        </div>
        <h6
          style={{position: 'absolute', bottom:'0'}}>
            Pieces: <span className="badge badge-secondary">{props.pieces?props.pieces:0}</span>
        </h6>
      </div>
    </div>
  );
}

export default bucket;
