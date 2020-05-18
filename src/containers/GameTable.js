import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import Aux from '../hoc/Aux/Aux';
import axios from '../axios';
import Bucket from '../components/Bucket/Bucket'

const BUCKET_TYPES = {
  NORMAL:"NORMAL",
  PRINCIPAL_FIRST_PLAYER:"PRINCIPAL_FIRST_PLAYER",
  PRINCIPAL_SECOND_PLAYER:"PRINCIPAL_SECOND_PLAYER"
}

const PLAYERS = {
  FIRST_PLAYER:'FIRST_PLAYER',
  SECOND_PLAYER:'SECOND_PLAYER'
}
class GameTable extends Component {

  state = {
    gameId:null,
    currentIndex:null,
    bucketsFirstPlayer:[],
    bucketPrincipalFirstPlayer:null,
    bucketsSecondPlayer:[],
    bucketPrincipalSecondPlayer:null,
    turn:"",
    winner:"",
    error:false
  }

  componentDidMount () {
    axios.get('/games/current')
    .then(response => {
      this.updateBucketData(response.data);
    }).catch( error => {
      console.log('There is not a current game');
    });
  }

  updateBucketData = (data) => {
    const bucketsFirstPlayer = data.buckets.filter(item => item.bucketId < 7);
    const bucketPrincipalFirstPlayer = data.buckets.filter(item => item.bucketId === 7);
    const bucketsSecondPlayer = data.buckets.filter(item => item.bucketId > 7 && item.bucketId < 14);
    const bucketPrincipalSecondPlayer = data.buckets.filter(item => item.bucketId === 14);

    this.setState({
      gameId:data.id,
      bucketsFirstPlayer:bucketsFirstPlayer,
      bucketPrincipalFirstPlayer:bucketPrincipalFirstPlayer[0],
      bucketsSecondPlayer:bucketsSecondPlayer,
      bucketPrincipalSecondPlayer:bucketPrincipalSecondPlayer[0],
      turn:data.turn,
      winner:data.winner,
      currentIndex:data.currentIndex
    });
  }

  bucketSelectedHandler = (bucketId, type) => {
    if(type === BUCKET_TYPES.PRINCIPAL_FIRST_PLAYER ||  type === BUCKET_TYPES.PRINCIPAL_SECOND_PLAYER){
      alert('Please select a bucket from your corrresponding zone!');
    } else if(this.state.turn === PLAYERS.FIRST_PLAYER && bucketId > 6 ){
      alert('Player 1: please select a bucket from your buckets!');
    } else if(this.state.turn === PLAYERS.SECOND_PLAYER && bucketId < 8 ){
      alert('Player 2: please select a bucket from your buckets!');
    } else {
      axios.put('/games/'+this.state.gameId+'/buckets/'+bucketId)
      .then(response => {
        this.updateBucketData(response.data);
      }).catch( error => {
        console.log('There is not a current game');
      });
    }
  }
  buildTableContent = () => {
    const bucketsSecondPlayer = this.state.bucketsSecondPlayer.reverse();
    let content = (
      <div className="row">
        <div className="col-md-2">
          <div className="row">
            {<Bucket
            key={this.state.bucketPrincipalSecondPlayer.id}
            bucketId={this.state.bucketPrincipalSecondPlayer.bucketId}
            clicked={() => this.bucketSelectedHandler(this.state.bucketPrincipalSecondPlayer.bucketId, BUCKET_TYPES.PRINCIPAL_SECOND_PLAYER)}
            pieces={this.state.bucketPrincipalSecondPlayer.pieces}
            type={BUCKET_TYPES.PRINCIPAL_SECOND_PLAYER} />}
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center">Second Player Buckets</h3>
            </div>
          </div>
          <div className="row">
            {this.state.bucketsSecondPlayer.map(item => (
              <Bucket
              key={item.id}
              bucketId={item.bucketId}
              clicked={() => this.bucketSelectedHandler(item.bucketId, BUCKET_TYPES.NORMAL)}
              pieces={item.pieces}
              turn={this.state.turn}
              type={BUCKET_TYPES.NORMAL} />
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center" style={{marginTop: '45px'}}>First Player Buckets</h3>
            </div>
          </div>
          <div className="row">
            {this.state.bucketsFirstPlayer.map(item => (
              <Bucket
              key={item.id}
              bucketId={item.bucketId}
              clicked={() => this.bucketSelectedHandler(item.bucketId, BUCKET_TYPES.NORMAL)}
              pieces={item.pieces}
              turn={this.state.turn}
              type={BUCKET_TYPES.NORMAL} />
            ))}
          </div>
        </div>
        <div className="col-md-2">
          <div className="row">
            {<Bucket
            key={this.state.bucketPrincipalFirstPlayer.id}
            bucketId={this.state.bucketPrincipalFirstPlayer.bucketId}
            clicked={() => this.bucketSelectedHandler(this.state.bucketPrincipalFirstPlayer.bucketId, BUCKET_TYPES.PRINCIPAL_FIRST_PLAYER)}
            pieces={this.state.bucketPrincipalFirstPlayer.pieces}
            type={BUCKET_TYPES.PRINCIPAL_FIRST_PLAYER} />}
          </div>
        </div>
        <div className="col-md-12">
          <h2 className="text-center" style={{marginTop: '20px'}}>Player Turn: {this.state.turn}</h2>
        </div>
      </div>
    );
    return content;
  }

  initializeGame = () => {
    axios.post('/games')
    .then(response => {
      this.updateBucketData(response.data);
    }).catch( error => {
      console.log('There is not a current game');
    });
  }
  render () {
      let content;
      if(this.state.gameId && !this.state.winner) {
        content = this.buildTableContent();
      }else if (this.state.winner){
        content = (
          <div className="row justify-content-center" style={{marginTop: '100px'}}>
            <div className="col-lg-12">
              <h2 style={{textAlign: 'center'}}>Winner: {this.state.winner}! ¯\_(ツ)_/¯ </h2>
            </div>
            <div className="col align-self-center">
              <button className="btn btn-primary"
                onClick={this.initializeGame}
                style={{display: 'block', margin: '0 auto', marginTop: '20px'}}>Play Again</button>
            </div>
          </div>
        );
      } else {
        content = (
          <div className="row justify-content-center" style={{marginTop: '100px'}}>
            <div className="col-lg-12">
              <h2 style={{textAlign: 'center'}}>Welcome to the Kalah Game!</h2>
            </div>
            <div className="col align-self-center">
              <button className="btn btn-primary"
                onClick={this.initializeGame}
                style={{display: 'block', margin: '0 auto', marginTop: '20px'}}>Start to play</button>
            </div>
          </div>
        );
      }
      return (
        <Aux>
          {content}
        </Aux>
      );
    }
  }

export default GameTable;
