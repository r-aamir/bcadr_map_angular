import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import VectorLayer from "ol/layer/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import * as olLoadingstrategy from 'ol/loadingstrategy';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

let roadLayer:VectorLayer;
export function addRoad(map:Map) {
    let roadUrl = "assets/json/bcadr_road.geojson";
    let roadSource = new VectorSource({
        format: new GeoJSON(),
        url: roadUrl,
        strategy: olLoadingstrategy.bbox,
    });
    roadLayer = new VectorLayer({
        source: roadSource,
        style: districtDefaultStyle,
    });
    function districtDefaultStyle(feature:any) {
        var styles = [];
        let _attr = feature.values_;
        let _color:any;
            let random:number = Math.floor(Math.random() * 5 + 1);
            if (random == 1) {
                _color="rgba(255,0,0, 0.7)"
            } else if (random == 2) {
                _color="rgba(0,255,0, 0.7)"
            } else if (random == 3) {
                _color="rgba(255,255,0, 0.7)"
            } else if (random == 4) {
                _color="rgba(127,42,42)"
            } else if (random == 5) {
                _color="rgba(127,42,42)"
            }
        styles.push(
            new Style({
                geometry: _attr.geometry,
                // 线样式
                stroke: new Stroke({
                    color: _color,
                    lineCap: 'round',       // 设置线的两端为圆头
                    width: 5
                }),
                /* text: new Text({
                    text: _attr.uid,
                    textAlign: "center",
                    textBaseline: "middle",
                    offsetY: 0,
                    fill: new Fill({
                        color: "#fff",
                    }),
                }), */
            })
        );
        return styles;
    }
    map.addLayer(roadLayer);
}

export function delRoad(map:Map) {
    map.removeLayer(roadLayer);
}
