import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

AFRAME.registerComponent('meshline2', {
    schema: {
    radius: { default: 0.036},
    width: { default: 32},
    height: {default: 16},
    ballX: { default: 0},
    ballY: { default: 0},
    id: {default: "-1"},
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
      this.el.setObject3D('path-mesh', new THREE.Mesh(line.geometry, material));

    this.ballGeometry = new THREE.SphereGeometry( this.data.radius, this.data.width, this.data.height);


    this.ballMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(this.data.color), opacity: this.data.opacity, transparent: true}); 
 
    this.ballMesh = new THREE.Mesh(this.ballGeometry, this.ballMaterial);

    this.el.setObject3D('ball-mesh', this.ballMesh);
    this.el.getObject3D('ball-mesh').translateX(this.data.ballX);
    this.el.getObject3D('ball-mesh').translateY(this.data.ballY);
    },
    
 
    
    update: function (oldData) {
      var data = this.data;
      var el = this.el;
            
      if (Object.keys(oldData).length === 0) { return; }


      // Material-related properties changed. Update the material.
      if (data.color !== oldData.color) {
        console.log(oldData);
        try {
        el.getObject3D('ball-mesh').material.color = new THREE.Color(data.color);
        el.getObject3D('path-mesh').material.color = new THREE.Color(data.color);
        } catch (error) {
          console.log(error)
        }
      }

      if (data.opacity !== oldData.opacity) {
        try {
        el.getObject3D('ball-mesh').material.opacity = data.opacity;
        el.getObject3D('path-mesh').material.opacity = data.opacity;
        } catch (error) {
          console.log(error);
        }
      }
      
    },
    
    remove: function () {
      console.log("removed", this.data.id)
      this.el.removeObject3D('ball-mesh');
      this.el.removeObject3D('path-mesh');
    },

    multiple: true
  });