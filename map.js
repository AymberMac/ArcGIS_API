var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/views/SceneView"
    ],
    function(
       Map, Graphic, GraphicsLayer, ElevationLayer, SceneView
    ) {
        $(document).ready(function() {
            Main = (function() {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                });
                var map = new Map({
                    basemap: "hybrid",
                    ground: {
                        layers: [layer]
                    },
                });
    
                var view = new SceneView({
                    container: "map",
                    viewingMode: "global",
                    map: map,
                    camera: {
                        position: {
                            x: -118.500,
                            y: 41.700,
                            z: 20000000,
                            spatialReference: {
                                wkid: 4326
    
                            }
                        },
                        heading: 0,
                        tilt: 0
                    },
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            breakpoint: false
                        }
                    },
                    // enable shadows to be cast from the features
                    environment: {
                        lighting: {
                            directShadowsEnabled: false
                        }
                    }
                })
                const initMap = function(){
               
                   
                    // var graphicsLayer = new GraphicsLayer()
                    const graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);
                    for (const [key, value] of Object.entries(myStuff)){
                        console.log(key, value)
                        const point = {
                            type: "point", 
                            x: value.coord[0],
                            y: value.coord[1],
                            z: 7000
                          };
                  
                          const markerSymbol = {
                            type: "simple-marker", 
                            color: [128, 0, 125],
                            outline: {
                              // autocasts as new SimpleLineSymbol()
                              color: [128, 0, 128],
                              width: 4
                            }
                          };
                      
                          const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            popupTemplate: {
                                title: key + ": <br>" + value.city + ", " + value.state,
                                content: "This location is " + value.name + ". <br> Find out more by visiting: " + value.website
                            }
                          });
                          graphicsLayer.add(pointGraphic);
                    
                    }
                    
                    
                }
                initMap()
                return {
           
                };

            })();
        })

    });


    
