var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/widgets/Search",
        "esri/views/SceneView"
    ],
    function(
       Map, Graphic, GraphicsLayer, ElevationLayer, Search, SceneView
    ) {
        $(document).ready(function() {
            Main = (function() {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                });
                var map = new Map({
                    basemap: "gray-vector",
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
                            x: -105.503,
                            y: 44.270,
                            z: 15000000, //Alter the behavior of the sceneView with new position, including extent altitude
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
                            position: "bottom-right",
                            breakpoint: false
                        }
                    },
                    environment: { //Alter the behavior of the sceneView with new backgound color and stars, no atmosphere
                        background: {
                          type: "color",
                          color: [5, 8, 28, 1]
                        },
                        // disable stars
                        starsEnabled: true,
                        //disable atmosphere
                        atmosphereEnabled: false
                    }
                    
                })
                const initMap = function(){

                    const searchWidget = new Search({ //Implement a search bar in the bottom left corner of the view
                        view: view
                      });
                      view.ui.add(searchWidget, {
                        position: "bottom-left",
                        index: 2
                      });
                      
                    // var graphicsLayer = new GraphicsLayer()
                    const graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);
                    for (const [key, value] of Object.entries(myStuff)){
                        console.log(key, value)
                        const point = {
                            type: "point", 
                            x: value.coord[0],
                            y: value.coord[1],
                            z: 10000
                          };
                  
                          const markerSymbol = {
                            type: "simple-marker",
                            style: "triangle", //Alter the symbology of the point symbols
                            color: [125, 0, 125],
                            size: "15px",
                            outline: {
                              color: [0, 0, 0],
                              width: 2
                            },
                            featureReduction: { //Create a clustering effect 
                              type: "cluster",
                              clusterMinSize: "5px",
                              clusterMaxSize: "50px",
                              clusterRadius: "60px"
                            }
                            
                          };

                          const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            popupTemplate: {
                                title: key + ": <br>" + value.city + ", " + value.state,
                                outFields: ["*"], 
                                content: [{ //Alter the formatting of the popup
                                    type: "media",
                                    mediaInfos: {
                                        title: value.name,
                                        type: "image", 
                                        value: {
                                            sourceURL: value.image
                                        }
                                    }
                                }]
                            }

                          });
                          graphicsLayer.add(pointGraphic);
                    }
                    
                map.on("click", function (event) { //Add a function to zoom to the point you click on
                  map.centerAndZoom(event.mapPoint, 2);
                });
                    
                }
                initMap()
                return {
           
                };

            })();
        })

    });