import { Vector } from 'html2canvas/dist/types/render/vector';
import { MeshLine, MeshLineMaterial } from 'three.meshline';

AFRAME.registerComponent('meshline', {
    schema: {
    id: {type: 'string', default: "0"},
    dur: {default: 1000},
	  delay: {default: 0},
	  loop: {default: false},
	  rotate: {default: false},
	  resetonplay: {default:true},
    radius: {type: 'number', default: 0.036},
    width: {type: 'number', default: 32},
    height: {type: 'number', default: 16},
    ballX: {type: 'number', default: 0},
    ballY: {type: 'number', default: 0},
    color: { default: '#000' },
    lineWidth: { default: 10 },
    lineWidthStyler: { default: '' },
    sizeAttenuation: { default: 0 },
    opacity: { default: 1},
    path: {
      default: [
        { x: -0.5, y: 0, z: 0 },
        { x: 0.5, y: 0, z: 0 }
      ],
      // Deserialize path in the form of comma-separated vec3s: `0 0 0, 1 1 1, 2 0 3`.
      parse: function (value) {
        return value.split(',').map(AFRAME.utils.coordinates.parse);
      },
      // Serialize array of vec3s in case someone does setAttribute('line', 'path', [...]).
      stringify: function (data) {
        return data.map(AFRAME.utils.coordinates.stringify).join(',');
      }
    },
    curve: {default: null}
    },
    
    init: function () {

   


      this.resolution = new THREE.Vector2 ( window.innerWidth, window.innerHeight ) ;
      
      var sceneEl = this.el.sceneEl;
      
      sceneEl.addEventListener( 'render-target-loaded', this.do_update.bind(this) );
      sceneEl.addEventListener( 'render-target-loaded', this.addlisteners.bind(this) );

      var material = new MeshLineMaterial({
        color: new THREE.Color(this.data.color),
        resolution: this.resolution,
        sizeAttenuation: this.data.sizeAttenuation,
        lineWidth: this.data.lineWidth,
        transparent: true,
        opacity: this.data.opacity, 
        depthTest: true,
      });

      var pointsArray = this.data.path.map(function (point) {

        if (point.x !== undefined && point.y !== undefined && point.z !== undefined) {
            return new THREE.Vector3( point.x, point.y, point.z );
        }
  
    });

      this.data.curve = new THREE.CatmullRomCurve3(pointsArray);

      var vertices = [];
    
      this.data.path.forEach(function (vec3) {
        vertices.push(vec3.x || 0, vec3.y || 0, vec3.z || 0);
      });
      
      var widthFn = (
        typeof this.data.lineWidthStyler === 'string' &&
        this.data.lineWidthStyler.length > 0
      ) ? new Function('p', 'return ' + this.data.lineWidthStyler)
        : function() { return 1; };
      //? try {var w = widthFn(0);} catch(e) {warn(e);}w
      
      //pitch trajectory
      var line = new MeshLine();
      line.setPoints(new Float32Array(vertices), widthFn);
      this.el.setObject3D('path-mesh', new THREE.Mesh(line.geometry, material));

      //pitch end
      this.ballGeometry = new THREE.SphereGeometry( this.data.radius, this.data.width, this.data.height);
      this.ballMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(this.data.color), opacity: this.data.opacity, transparent: true}); 
      this.ballMesh = new THREE.Mesh(this.ballGeometry, this.ballMaterial);
      this.el.setObject3D('ball-mesh', this.ballMesh);
      this.el.getObject3D('ball-mesh').translateX(this.data.ballX);
      this.el.getObject3D('ball-mesh').translateY(this.data.ballY);

      //pitch animated ball
      this.animationGeometry = new THREE.SphereGeometry( this.data.radius, this.data.width, this.data.height);
      this.animationMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(this.data.color), opacity: 1, transparent: true}); 
      this.animationMesh = new THREE.Mesh(this.animationGeometry, this.animationMaterial);
      this.el.setObject3D('animation-mesh', this.animationMesh);
      this.el.getObject3D('animation-mesh').position.set(vertices[0], vertices[1], vertices[2]);

      document.addEventListener("animatePitch" + this.data.id, ()=> this.reset())
      document.addEventListener("animateAll", ()=> this.reset())
    },

  reset: function() {
      // Reset to initial state
      this.interval = 0;
      this.el.removeState("endofpath");
      this.el.removeState("moveonpath");
      this.el.getObject3D('animation-mesh').material.color = new THREE.Color('grey')
      this.el.addState("played");
  },

  getI_: function (interval, delay, dur) {
    var i = 0;

    if (interval - delay >= dur) {
      // Time is up, we should be at the end of the path
      i = 1;
    } else if ((interval - delay < 0)) {
      // We are still waiting for the delay-time to finish
      // so keep entity at the beginning of the path
      i = 0;
    } else {
      // Update path position based on timing
      i = (interval - delay) / dur;
    }

    return i
  },


  
  tick: function (time, timeDelta) {
    // Only update position if we didn't reach
    // the end of the path

    
    var curve = this.data.curve;

    if (this.el.is("played")){
      if (!this.el.is("endofpath")) {
          this.interval = this.interval + timeDelta;

          var i = this.getI_(this.interval, this.data.delay, this.data.dur)
        
          if ((this.data.loop === false) && i >= 1) {
              // Set the end-position
              this.el.getObject3D('animation-mesh').position.set(curve.points[0].x, curve.points[0].y, curve.points[0].z);
              this.el.removeState("played");
              this.el.getObject3D('animation-mesh').material.color = new THREE.Color(this.data.color)
              // We have reached the end of the path and are not going
              // to loop back to the beginning therefore set final state
              this.el.removeState("moveonpath");
              this.el.addState("endofpath");
              this.el.emit("movingended");

          } else if ((this.data.loop === true) && i >= 1) {
              // We have reached the end of the path
              // but we are looping through the curve,
              // so restart here.
              this.el.emit("movingended");
              this.interval = this.data.delay;
          } else {
              // We are starting to move or somewhere in the middle of the path…
              if (!this.el.is("moveonpath")) {
                  this.el.addState("moveonpath");
                  this.el.emit("movingstarted");
              }

              // …updating position
              var p = this.data.curve.getPoint(i);
              this.el.getObject3D('animation-mesh').position.set(p.x, p.y, p.z);
          }
      }
  }
},


    
  addlisteners: function () {
    window.addEventListener( 'resize', this.do_update.bind (this) );
  },
  
  do_update: function () {
    var canvas = this.el.sceneEl.canvas;
    this.resolution.set( canvas.width,  canvas.height );
    this.update();
  },
  
  update: function (oldData) {

  var data = this.data;
  var el = this.el;
  let object = this.el.object3D;
    
  if (Object.keys(oldData).length === 0) { return; }


// Material-related properties changed. Update the material.
if (data.color !== oldData.color) {
  this.el.getObject3D('animation-mesh').material.color = new THREE.Color(this.data.color)
  this.el.getObject3D('ball-mesh').material.color = new THREE.Color(this.data.color);
  this.el.getObject3D('path-mesh').material.color = new THREE.Color(this.data.color);
}

if (data.opacity !== oldData.opacity) {
  this.el.getObject3D('animation-mesh').material.opacity = 1;
  this.el.getObject3D('ball-mesh').material.opacity = this.data.opacity;
  this.el.getObject3D('path-mesh').material.opacity = this.data.opacity;
}
    
if (data.radius !== oldData.radius) {
  this.el.getObject3D('ball-mesh').geometry = new THREE.SphereGeometry( this.data.radius, this.data.width, this.data.height);
}
  },

  events: {
    click: function (evt) {
      this.reset()
    },
  },
  
  remove: function () {
    this.el.removeObject3D('mesh');
  },

  multiple: true
  });