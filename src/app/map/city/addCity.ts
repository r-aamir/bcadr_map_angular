import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Polygon from 'ol/geom/Polygon';

import * as henan from "./henan.json";


/**
 * 设置区域
 */
let cityLayer: VectorLayer;


export function addArea() {
    
    let geo = (henan as any).data;
    if (geo.length == 0) return false;
    let areaFeature: any[] = [];

    if (geo.features) {
        // geo.features.forEach( g  => {
            for (let index = 0; index < geo.features.length; index++) {
                const lineData = geo.features[index];
                if (lineData.geometry.type == "MultiPolygon") {
                    areaFeature.push(new Feature({
                        /* geometry: new MultiPolygon(
                            lineData.geometry.coordinates
                        ).transform("EPSG:4326", "EPSG:3857") */
                        geometry: new MultiPolygon(
                            lineData.geometry.coordinates
                        ),
                        style: new Style({
                            fill: new Fill({ color: "#4e98f444" }),
                            stroke: new Stroke({
                                width: 3,
                                color: [71, 137, 227, 1]
                            })
                        })
                    }));
                } else if (lineData.geometry.type == "Polygon") {
                    areaFeature.push(new Feature({
                        geometry: new Polygon(
                            lineData.geometry.coordinates
                        ),
                        style: new Style({
                            fill: new Fill({ color: "#4e98f444" }),
                            stroke: new Stroke({
                                width: 3,
                                color: [71, 137, 227, 1]
                            })
                        })
                    }));
                } else {
                    console.log("error!");
                }
            };
    }

    // 设置图层
    cityLayer = new VectorLayer({
        source: new VectorSource({
            features: areaFeature
        })
    });
    // 添加图层
    window.map.addLayer(cityLayer);
}
