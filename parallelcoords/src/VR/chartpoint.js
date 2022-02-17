import {interaction_store} from "../stores";

/*
let interactions; 

const unsub = interaction_store.subscribe(value => {
    interactions = value;
});
*/

AFRAME.registerComponent('chartpoint', {
    schema: {
        id: {type: 'string', default: "0"},
        radius: {type: 'number', default: 1},
        segments: {type: 'number', default: 8},
        color: { default: '#000'},
        opacity: {type: 'number', default: 1}
    },
    
    init: function () {
        var data = this.data;
        var el = this.el;
       
        const geometry = new THREE.CircleGeometry( data.radius, data.segments );
        const material = new THREE.MeshBasicMaterial( { color: new THREE.Color(data.color), opacity: data.opacity, transparent: true, side: 2});
        const circle = new THREE.Mesh( geometry, material );

        el.setObject3D('mesh', circle);
    },

    update: function (oldData) {
        var data = this.data;
        var el = this.el;
    
        // If `oldData` is empty, then this means we're in the initialization process.
        // No need to update.
        if (Object.keys(oldData).length === 0) { return; }
    
        // Geometry-related properties changed. Update the geometry.
        if (data.radius !== oldData.radius) {
          el.getObject3D('mesh').geometry = new THREE.CircleGeometry( data.radius, data.segments );
        }
    
        // Material-related properties changed. Update the material.
        if (data.color !== oldData.color) {
          el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        }

        if (data.opacity !== oldData.opacity) {
            el.getObject3D('mesh').material.opacity = data.opacity;
        }
    },

    events: {
        mousedown: function(evt) {
            interaction_store.updateLocalHover(this.data.id);
        },
        mouseup: function(evt) {
            interaction_store.updateLocalHover(null);
        },
        mouseenter: function(evt) {
            this.el.getObject3D('mesh').material.color = new THREE.Color('red');
        },
        mouseleave: function(evt) {
            this.el.getObject3D('mesh').material.color = new THREE.Color(this.data.color);
        },



    },

    remove: function () {
        this.el.removeObject3D('mesh');
    },
  
    multiple: true
});