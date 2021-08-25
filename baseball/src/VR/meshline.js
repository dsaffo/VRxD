import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

AFRAME.registerComponent('meshline', {
    schema: {
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
      }
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
      
      var vertices = [];
      
      this.data.path.forEach(function (vec3) {
        vertices.push(vec3.x || 0, vec3.y || 0, vec3.z || 0);
      });
        
      var widthFn = (
        typeof this.data.lineWidthStyler === 'string' &&
        this.data.lineWidthStyler.length > 0
      ) ? new Function('p', 'return ' + this.data.lineWidthStyler)
        : function() { return 1; };
      //? try {var w = widthFn(0);} catch(e) {warn(e);}
      var line = new MeshLine();
      line.setPoints(new Float32Array(vertices), widthFn);
      this.el.setObject3D('mesh', new THREE.Mesh(line.geometry, material));
    },

    addlisteners: function () {
	  
	    //var canvas = this.el.sceneEl.canvas;
	  
	    // canvas does not fire resize events, need window
	    window.addEventListener( 'resize', this.do_update.bind (this) );
	    
	    //console.log( canvas );
	    //this.do_update() ;
	  
	  },
    
 
      
	  do_update: function () {
	  
	    var canvas = this.el.sceneEl.canvas;
	    this.resolution.set( canvas.width,  canvas.height );
	    //console.log( this.resolution );
	    this.update();

	  },
    
    update: function (oldData) {
      var data = this.data;
      var el = this.el;
            
      if (Object.keys(oldData).length === 0) { return; }


      // Material-related properties changed. Update the material.
      if (data.path !== oldData.path) {
        var vertices = [];
      
        this.data.path.forEach(function (vec3) {
          vertices.push(vec3.x || 0, vec3.y || 0, vec3.z || 0);
        });
          
        var widthFn = (
          typeof this.data.lineWidthStyler === 'string' &&
          this.data.lineWidthStyler.length > 0
        ) ? new Function('p', 'return ' + this.data.lineWidthStyler)
          : function() { return 1; };
        //? try {var w = widthFn(0);} catch(e) {warn(e);}
        var line = new MeshLine();
        line.setPoints(new Float32Array(vertices), widthFn);
        el.getObject3D('mesh').geometry = line.geometry;
      }

      if (data.color !== oldData.color) {
        el.getObject3D('mesh').material.color = new THREE.Color(data.color);
      }

      if (data.opacity !== oldData.opacity) {
        el.getObject3D('mesh').material.opacity = data.opacity;
      }
      
    },
    
    remove: function () {
      this.el.removeObject3D('mesh');
    },

    multiple: true
  });