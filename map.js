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
                
                const clusterConfig = {  //Create a clustering effect
                    type: "cluster",
                    clusterRadius: "100px",
                    // {cluster_count} is an aggregate field containing
                    // the number of features comprised by the cluster
                    popupTemplate: {
                      title: "Cluster summary",
                      content: "This cluster represents {cluster_count} locations.",
                      fieldInfos: [{
                        fieldName: "cluster_count",
                        format: {
                          places: 0,
                          digitSeparator: true
                        }
                      }]
                    },
                    clusterMinSize: "2px",
                    clusterMaxSize: "20px",
                    labelingInfo: [{
                      deconflictionStrategy: "none",
                      labelExpressionInfo: {
                        expression: "Text($feature.cluster_count, '#,###')"
                      },
                      symbol: {
                        type: "text",
                        color: "#004a5d",
                        font: {
                          weight: "bold",
                          family: "Noto Sans",
                          size: "12px"
                        }
                      },
                      labelPlacement: "center-center",
                    }]
                  };
    
                var view = new SceneView({
                    container: "map",
                    viewingMode: "global", 
                    map: map,
                    camera: {
                        position: {
                            x: -105.503,
                            y: 44.270,
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
                            position: "bottom-right",
                            breakpoint: false
                        }
                    },
                    environment: { //Alter the behavior of the sceneView
                        background: {
                          type: "color", // autocasts as new ColorBackground()
                          color: [5, 8, 28, 1]
                        },
                        // disable stars
                        starsEnabled: true,
                        //disable atmosphere
                        atmosphereEnabled: false
                    },
                })
                const initMap = function(){

                    const searchWidget = new Search({ //Implement a search bar
                        view: view
                      });
                      // Adds the search widget below other elements in
                      // the top left corner of the view
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
                    
                    
                }
                initMap()
                return {
           
                };

            })();
        })

    });