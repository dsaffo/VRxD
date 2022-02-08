<script>
  import "aframe";
	import "aframe-htmlembed-component";
	import "aframe-teleport-controls";
	import "aframe-thumb-controls-component";
	import "aframe-extras";
	import "aframe-auto-detect-controllers-component";
	import "super-hands";
	import "aframe-physics-system";
	import {interaction_store} from '../stores.js';
  import { cameraPos, cameraRot, cameraRotRecord, cameraPosRecord } from '../viewStore';

    AFRAME.registerComponent('capture-mouse', {
        init: function () {
          this.eventRepeater = this.eventRepeater.bind(this)
          this.el.sceneEl.addEventListener('loaded', () => {
            this.el.sceneEl.canvas.addEventListener('mousedown', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('mouseup', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchstart', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchmove', this.eventRepeater)
            this.el.sceneEl.canvas.addEventListener('touchend', this.eventRepeater)
          }, {once: true})
        },
        eventRepeater: function (evt) {
          if (evt.type.startsWith('touch')) {
            evt.preventDefault()
            // avoid repeating touchmove because it interferes with look-controls
            if (evt.type === 'touchmove') { return }
          }
          this.el.emit(evt.type, evt.detail)
        }
      })

      AFRAME.registerComponent('peekncopy', {
        init: function() {
            let el = this.el;
            this.el.addEventListener ('bbuttondown', function(evt) {
                evt.preventDefault();
                interaction_store.peekStart()
            });
            this.el.addEventListener ('bbuttonup', function(evt) {
                interaction_store.peekEnd()
            });
            this.el.addEventListener ('abuttonup', function(evt) {
                interaction_store.copy()
            });
        }
    });


    let open = false;

    
    AFRAME.registerComponent('watch', {
        init: function() {
            let el = document.getElementById("watch");
            el.setAttribute("visible", "false");
            
            this.el.addEventListener ('ybuttonup', function(evt) {
              //el.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z});
              if(open == false){
                el.setAttribute("visible", "true");
                          open = true;
              } else if (open == true) {
                el.setAttribute("visible", "false");
                          open = false;
              }
            });
        }
    });
    

    AFRAME.registerComponent('move', {
		init: function() {
			let el = this.el;

      this.el.addEventListener ('grab-start', function(evt) {
				let body = el.body;
				body.linearDamping = 0.01;
        body.angularDamping = 0.01;
			});

			this.el.addEventListener ('grab-end', function(evt) {
				let body = el.body;
        body.linearDamping = 1;
        body.angularDamping = 1;
				body.velocity.set(0,0,0);
				body.angularVelocity.set(0,0,0);
				body.vlambda.set(0,0,0);
				body.wlambda.set(0,0,0);
			});
		}
	});


  
	AFRAME.registerComponent('position-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.position);
			cameraPosRecord.set("0", {x: this.el.object3D.position.x, y: this.el.object3D.position.y, z: this.el.object3D.position.z});

		}
		});

		AFRAME.registerComponent('roation-reader', {
		tick: function (time, timeDelta) {
      //console.log(this.el.object3D.rotation);
		 	cameraRotRecord.set("0", {x: this.el.object3D.rotation.x * 57, y: this.el.object3D.rotation.y * 57, z: this.el.object3D.rotation.z * 57});
		}
		});

  
</script>



<a-assets>
    <a-mixin id="controllers-right" laser-controls vive-controls="hand: right"
    oculus-touch-controls="hand: right"
    windows-motion-controls="hand: right"
    gearvr-controls daydream-controls
    oculus-go-controls>
    </a-mixin>

    <a-mixin id="controllers-left" vive-controls="hand: left"
            oculus-touch-controls="hand: left"
            windows-motion-controls="hand: left">
    </a-mixin>

    <a-mixin id="point" raycaster="showLine: true; objects: .collidable;"
    collision-filter="collisionForces: false"
    static-body="shape: sphere; sphereRadius: 0.001"
    super-hands="colliderEvent: raycaster-intersection;
                             colliderEventProperty: els;
                             colliderEndEvent:raycaster-intersection-cleared;
                             colliderEndEventProperty: clearedEls;"></a-mixin>
</a-assets>


<a-entity id="cameraRig" 
position-reader
movement-controls="constrainToNavMesh: false;" 
navigator="cameraRig: #cameraRig; cameraHead: #head; collisionEntities: .collision; ignoreEntities: .clickable" 
position="0 0 2" 
rotation="0 0 0">
<!--
	<a-entity 
        roation-reader 
        id="head" 
        camera="active: true" 
        look-controls 
        wasd-controls 
        position="0 1.6 0" 
	      raycaster="objects: .collidable;"
        body="type: static; 
              shape: sphere; 
              sphereRadius: 0.001;"
        super-hands="colliderEvent: raycaster-intersection;
            colliderEventProperty: els;
            colliderEndEvent:raycaster-intersection-cleared;
            colliderEndEventProperty: clearedEls;">
               <slot></slot>
    </a-entity>
 -->
    
    <a-entity 
      roation-reader 
      id="head" 
      camera="active: true" 
      look-controls 
      wasd-controls 
      position="0 1.6 0" 
      capture-mouse
      raycaster="objects: .collidable;"
      cursor="rayOrigin: mouse; fuseTimeout: 0"   
      body="type: static; 
          shape: sphere; 
          sphereRadius: 0.001;">
        <slot></slot>
    </a-entity>
   
   
    <a-entity id="rhand" mixin="controllers-right point" peekncopy></a-entity>
    <a-entity id="lhand" mixin="controllers-left point" watch></a-entity>s

    

 

</a-entity>