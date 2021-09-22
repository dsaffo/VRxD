import { onMount, afterUpdate, tick } from 'svelte';

function handleSuccess(stream) {
		//window.stream = stream; // make stream available to browser console
		video.srcObject = stream
	}

	function handleError(error) {
		console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
	}

		var edge_constraints = {
			video: true
		};

		var ff_constraints = {
		video: {
			mediaSource: "window"
			},
		};

	let video;
	let canvas;


	video = document.querySelector('video');
	canvas = document.createElement("canvas");
	if (typeof(RTCIceGatherer) !== "undefined"){
		navigator.getDisplayMedia(edge_constraints).
		then(handleSuccess).catch(handleError);
			} else if (typeof(navigator.mediaDevices.getDisplayMedia) !== "undefined"){
		navigator.mediaDevices.getDisplayMedia(edge_constraints).then(handleSuccess).catch(handleError); 
	} else {
		navigator.mediaDevices.getUserMedia(ff_constraints).
		then(handleSuccess).catch(handleError);
	}	


  export async function screenCapture(){
    await tick();
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL('image/jpeg', 0.5);
    console.log(frame);
  }


