import { viewFlyTo } from "../common/flyTo";

import voronoi from '@turf/voronoi';
import buffer from '@turf/buffer';
import multiPoint from '@turf/helpers';

import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from 'ol/source/Vector';
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';

let voronoiData: any;
let voronoiLayer: VectorLayer;

export function addVoronoiLayer(map: Map) {
    fetch('assets/json/point.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            convertDataToGeoJson(json);
            updateView(map, voronoiData);
        });

    viewFlyTo(map, olProj.fromLonLat([116.53898130231798, 39.76589466010563]));
    
}

function convertDataToGeoJson(data: any) {
    voronoiData = voronoi(data, {
        bbox: [116.537163674357, 39.76442342017438, 116.54001340917684, 39.76756629218713]
    });
}

function updateView(map: Map, voronoiData: any) {
    let styles:any = {
        'Point': new Style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'LineString': new Style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiLineString': new Style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPoint': new Style({
            stroke: new stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPolygon': new Style({
            stroke: new stroke({
                color: 'yellow',
                width: 1
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)'
            })
        }),
        'Polygon': new Style({
            stroke: new stroke({
                color: 'blue',
                lineDash: [4],
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        }),
        'GeometryCollection': new Style({
            stroke: new stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new Fill({
                color: 'magenta'
            }),
            image: new Circle({
                radius: 10,
                stroke: new stroke({
                    color: 'magenta'
                })
            })
        }),
        'Circle': new Style({
            stroke: new stroke({
                color: 'red',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })
    };
    let styleFunction = function (feature:any) {
        // console.log(feature.getGeometry().getType());
        // return styles;
        return styles[feature.getGeometry().getType()];
    };
    /* function styleFunction(features: any) {
        console.log(features);
        let temporaryFeatures:any;
        let feature:Feature;
        for (feature of features) {
            let types: string = feature.getGeometry().getType();
            switch (types) {
                case 'Point':
                    feature.setStyle(styles["Point"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'LineString':
                    feature.setStyle(styles["LineString"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'MultiLineString':
                    feature.setStyle(styles["MultiLineString"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'MultiPoint':
                    feature.setStyle(styles["MultiPoint"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'MultiPolygon':
                    feature.setStyle(styles["MultiPolygon"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'Polygon':
                    feature.setStyle(styles["Polygon"]);
                    temporaryFeatures.push(feature); 
                    break;
                case 'GeometryCollection':
                    feature.setStyle(styles["GeometryCollection"]);
                    temporaryFeatures.push(feature);
                    break;
                case 'Circle':
                    feature.setStyle(styles["Circle"]);
                    temporaryFeatures.push(feature); 
                    break;
                default:
                    feature.setStyle(styles["Point"]);
                    temporaryFeatures.push(feature); 
            }
        }
        features = temporaryFeatures;
        return features;
    }; */
    // console.log(voronoiData);

    let source = new VectorSource();
    let buffers: any = buffer(voronoiData, 0.001, {
        units: 'meters'
    });

    let oljson = new GeoJSON();
    // console.log(buffers);

    let features = buffers.features;
    for (let i = 0; i < features.length; i++) {
        let feature: any = oljson.readFeature(features[i]);
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        source.addFeature(feature);
    }

    voronoiLayer = new VectorLayer({
        source: source,
        style: new Style({
            stroke: new stroke({
                color: 'blue',
                lineCap:"round",
                lineDash: [4],
                width: 5
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            }),
        })
    })
    map.addLayer(voronoiLayer)
}

export function delVoronoiLayer(map: Map) {
    map.removeLayer(voronoiLayer);
}
