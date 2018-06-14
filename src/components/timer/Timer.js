/*global chrome*/
import React from "react";
import Bulma from "reactbulma";
import "./timer.css";

export default class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMin: 52,
			currentSec: 60,
			timerActive: false,
			timeSeperator: ":",
			motivationalMessage: "",
			disabled: "" //This sets the Start Timer button to be disabled
		};
		this.startTimer = this.startTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.motivate = this.motivate.bind(this);
	}
	componentDidMount() {
		let currentComponent = this;
		port.onMessage.addListener(function(msg) {
			console.log("The port has opened or whatnot");
			let min = msg.min;
			let sec = msg.sec;
			let timeSeperator = msg.timeSeperator;
			currentComponent.setState({
				currentMin: min,
				currentSec: sec,
				timeSeperator: timeSeperator
			});
		});
	}
	startTimer() {
		this.motivate();
		this.origSec = this.state.currentSec; //The orignal amount of seconds, before the timer started
		this.origMin = this.state.currentMin; //The original amount of minutes, before the timer started
		this.setState({
			timerActive: true
		});
		console.log("The button was pressed");
		let port = chrome.runtime.connect({ name: "timer" });
		port.postMessage({
			initTimer: "Start timer",
			sec: this.state.currentSec,
			min: this.state.currentMin,
			timeSeperator: this.state.timeSeperator
		});
		// var port = chrome.runtime.connect({ name: "knockknock" });
		// port.postMessage({ joke: "Knock knock" });
		// port.onMessage.addListener(function(msg) {
		// 	if (msg.question == "Who's there?")
		// 		port.postMessage({ answer: "Madame" });
		// 	else if (msg.question == "Madame who?")
		// 		port.postMessage({ answer: "Madame... Bovary" });
		// });
		//=====================================================================================================
		// 	let sec = this.state.currentSec;
		// 	let min = this.state.currentMin;
		// 	if (sec > 0) {
		// 		if (sec < 11) {
		// 			this.setState(state => ({
		// 				timeSeperator: ":0"
		// 			}));
		// 			this.setState(state => ({
		// 				currentSec: this.state.currentSec - 1
		// 			}));
		// 		} else {
		// 			if (sec === 60) {
		// 				//Verifies that if the the time is x:00, the x will first be decremented by 1, since that makes sense in an actual clock
		// 				this.setState(state => ({
		// 					currentMin: this.state.currentMin - 1
		// 				}));
		// 			}
		// 			this.setState(state => ({
		// 				currentSec: this.state.currentSec - 1
		// 			}));
		// 		}
		// 	} else if (min > 0) {
		// 		this.setState(state => ({
		// 			currentMin: this.state.currentMin - 1
		// 		}));
		// 		this.setState(state => ({
		// 			currentSec: 59
		// 		}));
		// 		this.setState(state => ({
		// 			timeSeperator: ":"
		// 		}));
		// 	}
		// 	if (min === 0 && sec === 0) {
		// 		clearInterval(this.timer);
		// 		this.motivate();
		// 	}
	}
	resetTimer() {
		clearInterval(this.timer);
		this.setState({
			timerActive: false,
			currentMin: this.origMin,
			currentSec: this.origSec,
			timeSeperator: ":"
		});
		this.setState({ motivationalMessage: "" });
	}
	motivate() {
		const keepWorking = [
			"Keep working, you can do it!",
			"Almost there!",
			"Just..a bit..longer.."
		];
		const takeBreak = ["Take a break, you've earned it!", "Time to relax!"];
		if (this.state.currentMin === 0 && this.state.currentSec === 0) {
			this.setState({
				motivationalMessage:
					takeBreak[Math.floor(Math.random() * takeBreak.length)]
			});
		} else {
			this.setState({
				motivationalMessage:
					keepWorking[Math.floor(Math.random() * keepWorking.length)]
			});
		}
	}
	render() {
		return (
			<div className="timer">
				<h2 className="is-centered">
					{this.state.currentMin}
					{this.state.timeSeperator}
					{this.state.currentSec === 60
						? "00"
						: this.state.currentSec}
				</h2>
				<div className="buttons is-centered">
					<button
						className="is-expanded button is-success start_timer"
						onClick={this.startTimer}
						disabled={this.state.timerActive}>
						Start timer
					</button>
					<button
						className="is-expanded button is-danger reset_timer"
						onClick={this.resetTimer}>
						Reset timer
					</button>
					<h5 className="timer_status">
						{this.state.motivationalMessage}
					</h5>
				</div>
			</div>
		);
	}
}
