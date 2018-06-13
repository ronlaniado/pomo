import React, { Component } from "react";
import Bulma from "bulma";
import Timer from "./components/timer/Timer.js";
import "./Pomo.css";

class Pomo extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="Pomo">
				<Timer />
			</div>
		);
	}
}

export default Pomo;
