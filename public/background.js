chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "timer");
	let sec = 60;
	let min = 52;
	let timeSeperator = ":";
	port.onMessage.addListener(function(msg) {
		if (msg.initTimer == "Start timer") {
			const startTimer = setInterval(() => {
				console.log("Time started");
				if (sec > 0) {
					if (sec < 11) {
						port.postMessage({
							timeSeperator: ":0",
							sec: sec - 1,
							min: min
						});
						timeSeperator = ":0";
						sec--;
					} else {
						if (sec === 60) {
							//Verifies that if the the time is x:00, the x will first be decremented by 1, since that makes sense in an actual clock
							port.postMessage({
								min: min - 1
							});
							min--;
						}
						port.postMessage({
							timeSeperator: ":",
							sec: sec - 1,
							min: min
						});
						sec--;
					}
				} else if (min > 0) {
					port.postMessage({
						currentMin: min - 1,
						sec: 59,
						timeSeperator: ":"
					});
					min--;
					sec = 59;
					timeSeperator = ":";
				}
				if (min === 0 && sec === 0) {
					clearInterval(this.Startimer);
					this.motivate();
				}
			}, 1000);
		}
	});
});

// const startTimer = setInterval(() => {
// 	console.log("Time started");
// 	if (sec > 0) {
// 		if (sec < 11) {
// 			port.postMessage({
// 				timeSeperator: ":0"
// 			});
// 			port.postMessage({
// 				sec: sec - 1
// 			});
// 		} else {
// 			if (sec === 60) {
// 				//Verifies that if the the time is x:00, the x will first be decremented by 1, since that makes sense in an actual clock
// 				port.postMessage({
// 					min: currentMin - 1
// 				});
// 			}
// 			port.postMessage({
// 				sec: sec - 1
// 			});
// 		}
// 	} else if (min > 0) {
// 		port.postMessage({
// 			currentMin: currentMin - 1
// 		});
// 		port.postMessage({
// 			sec: 59
// 		});
// 		port.postMessage({
// 			timeSeperator: ":"
// 		});
// 	}
// 	if (min === 0 && sec === 0) {
// 		clearInterval(this.timer);
// 		this.motivate();
// 	}
// }, 1000);

function show() {
	let time = /(..)(:..)/.exec(new Date()); // The prettyprinted time.
	let hour = time[1] % 12 || 12; // The prettyprinted hour.
	let period = time[1] < 12 ? "a.m." : "p.m."; // The period of the day.
	new Notification(hour + time[2] + " " + period, {
		icon: "pomo.png",
		body: "It's time to take a break! You did it!"
	});
}
