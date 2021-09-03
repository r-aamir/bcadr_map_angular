import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Polygon } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';


let draw: Draw;
let drawSource: VectorSource;//定义绘制图层
let drawLayer: VectorLayer;//定义绘制图层

/**
 * Currently drawn feature.
 * @type {import("../src/ol/Feature.js").default}
 */
let sketch: any;

/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
let helpTooltipElement: any;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
let helpTooltip: Overlay;

/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
let measureTooltipElement: any;

/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
let measureTooltip: Overlay;

/**
 * Handle pointer move.
 * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
 */


export function initDrawLayer(map: Map) {
    drawSource = new VectorSource();

    drawLayer = new VectorLayer({
        source: drawSource,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2,
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });

    map.addLayer(drawLayer);
}

/**
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function (line: LineString) {
    var length = getLength(line, {
        projection: "EPSG:3857",
        radius: 6378137,
    });
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

/**
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function (polygon: Polygon) {
    var area = getArea(polygon, {
        projection: "EPSG:3857",
        radius: 6378137,
    });
    var output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};

function addInteraction(drawType: string, map: Map) {
    let type: any = drawType == "area" ? "Polygon" : "LineString";
    draw = new Draw({
        source: drawSource,
        type: type,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2,
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
            }),
        }),
    });
    map.addInteraction(draw);

    createMeasureTooltip(map);
    createHelpTooltip(map);

    var listener: any;
    draw.on('drawstart', function (evt: any) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt: any) {
            var geom = evt.target;
            var output;
            if (geom instanceof Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
                createMeasureTooltip(map);
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip(map);
        unByKey(listener);
    });
}

function createHelpTooltip(map: Map) {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left" as any,
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip(map: Map) {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center' as any,
    });
    map.addOverlay(measureTooltip);
}

export function measureDistance(map: Map) {
    if (draw) {
        map.removeInteraction(draw);
    }
    addInteraction("length", map);
}

export function measureArea(map: Map) {
    if (draw) {
        map.removeInteraction(draw);
    }
    addInteraction("area", map);
}

export function measureClear(map: Map) {
    map.removeInteraction(draw);
    drawSource = new VectorSource();
    drawLayer.setSource(drawSource);
    sketch = null;
    map.getOverlays().clear();
}
