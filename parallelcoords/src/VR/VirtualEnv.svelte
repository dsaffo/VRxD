<script>
	import "aframe";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import "super-hands";
	import "aframe-physics-system";
	import Avatar from './Avatar.svelte';

	AFRAME.registerComponent('chart-reader', {
		tick: function (time, timeDelta) {
      //console.log("roation",this.el.object3D.rotation);
			chartRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57}});
		}
		});

		AFRAME.registerComponent('control-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.position);
			controlRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57}});
		}
		});

		AFRAME.registerComponent('form-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.position);
			formRecord.set("0", {pos: {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z},
																rot: {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57},
																height: formH});
		}
		});

</script>

