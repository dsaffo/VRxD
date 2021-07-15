<script>
	import "aframe";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
</script>
<a-scene>

<!-- Basic movement and teleportation  -->
<a-entity id="cameraRig" 
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0 0 0" 
rotation="0 0 0">
	<!-- camera -->
	<a-entity id="head" camera="active: true" position="0 1.6 0" look-controls="pointerLockEnabled: true; reverseMouseDrag: true" ></a-entity>
				<!-- Left Controller -->
				<a-entity id="leftHand" 
				hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF" 
				teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger; curveShootingSpeed: 18; landingMaxAngle: 60"
				visible="true"></a-entity>
				<!-- Right Controller -->
				<a-entity id="rightHand" 
				hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF" 
				laser-controls raycaster="showLine: true; far: 10; interval: 0; objects: .clickable, a-link;" 
				line="color: #7cfc00; opacity: 0.5" 
				visible="true"></a-entity>
</a-entity>
	

	<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
	<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
	<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
	<a-plane class="collidable" position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>
	<a-sky color="#ECECEC"></a-sky>
</a-scene>
