AFRAME.registerComponent('ball', {
  schema: {
      radius: { default: 0.036},
      width: { default: 32},
      height: {default: 16},
      ballX: { default: 0},
      ballY: { default: 0},
      color: { default: '#000'},
      opacity: {type: 'number', default: 1},

  },
  
  init: function () {
      var data = this.data;
      var el = this.el;
  
      const geometry = new THREE.SphereGeometry(data.radius, data.width, data.height);
      const material = new THREE.MeshBasicMaterial( { color: new THREE.Color(data.color), opacity: data.opacity, transparent: true});
      const ball = new THREE.Mesh( geometry, material );

      el.setObject3D('mesh', ball);
  },

  update: function (oldData) {
      var data = this.data;
      var el = this.el;
  
      // If `oldData` is empty, then this means we're in the initialization process.
      // No need to update.
      if (Object.keys(oldData).length === 0) { return; }
  
      // Geometry-related properties changed. Update the geometry.
      
  
      // Material-related properties changed. Update the material.
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