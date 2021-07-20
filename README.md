# VrxD Code and Data Repo

```
template
│
└───public (files surved on web like inde.html bundle.js and data, images, or other files go here)
│   
└───scripts (only needed if you want to use typescript)
|
└───src (this is where the svelte code lives)
│   │   App.svelte (top level components, loads in data on start, listens for data change event, manages page state)
│   │   Scatterplot.svelte (example of a scatter plot component made with svelte)
│   │   ThreeDScatterplot.svelte (example of scatterplot made with Aframe and Svelte)
|   |   main.js (need for svelte)
|   |   stores.js (data stores for main csv data and any other states you want to manage like page)
│   └───Desktop (folder for the top level desktop component and all other desktop view code)
│   └───VR (folder for the top level VR component and all other VR view code)
```

Aframe Libraries Used: 

https://github.com/n5ro/aframe-extras

https://github.com/fernandojsg/aframe-teleport-controls

https://github.com/supermedium/superframe/tree/master/components/thumb-controls
