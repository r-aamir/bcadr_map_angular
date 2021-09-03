import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Polygon from 'ol/geom/Polygon';

import henan from "./henan.json";

/**
 * 设置区域
 */
let cityLayer;
export function www() {
    addArea(henan);
}
function addArea(geo = []) {
    if (geo.length == 0) return false;
    let areaFeature = [];
    // 设置图层
    cityLayer = new VectorLayer({
        source: new VectorSource({
            features: []
        })
    });
    // 添加图层
    window.map.addLayer(cityLayer);
    geo.features.forEach(g => {
        let lineData = g;
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
        }
    });
    cityLayer.q().addFeatures(areaFeature);
}
