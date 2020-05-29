import React, { Component } from 'react';
import './Board.css';

function Square (props){
	return(
		<button className='square'
		onClick={props.onClick}>
			{props.value}
		</button>
	);
}
function calculate(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i = 0; i< lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}	
	}
	return null
}

export default class Board extends Component {
	constructor(props){
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			next: true,
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(i){
		const squares = this.state.squares.slice();
		if (calculate(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.next ? 'X' : 'O';
		this.setState({
			squares: squares,
			next: !this.state.next,
		});

		this.setState({squares: squares});
	}
	renderSquare(i){
		return <Square value={this.state.squares[i]}
		onClick={() => this.handleClick(i)} />
	}
	render(){
		const winner = calculate(this.state.squares)
		let status;
		if (winner) {
			status = 'Ganhador: ' + winner;
		}else {
			status = 'Jogador: ' + (this.state.next ? 'X' : 'O');
		}
		return(
			<div className='container'>
				<h2>Jogo da velha</h2>
				<h3> {status} </h3>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}
