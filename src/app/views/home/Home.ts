import {Component,OnInit} from '@angular/core';

import Map from 'ol/Map';

import {initMap} from '../../map/map';

import { addEcharts, delEcharts } from "../../map/echarts/qianxi";

import {
    initDrawLayer,
    measureDistance,
    measureArea,
    measureClear,
} from "../../map/tools/measures";

import {
    pointBuffer,
    lineBuffer,
    polygonBuffer,
    delBuffer,
} from "../../map/turf/buffer";

import {
    addVoronoiLayer,
    delVoronoiLayer,
} from "../../map/turf/voronoi";

import {addRoad,delRoad} from '../../map/road/road';


let map:Map;

@Component({
    selector: 'Home',
    templateUrl: './Home.html',
    styleUrls: ['./Home.scss']
})

export class Home implements OnInit {
    
    ngOnInit() {
        map = initMap();
        initDrawLayer(map);
    }

    addPlane() {
        addEcharts(map);
    }
    delPlane() {
        delEcharts();
    }

    mDistance() {
        measureDistance(map);
    }
    mArea() {
        measureArea(map);
    }
    mClear() {
        measureClear(map);
    }

    addPointBuffer() {
        pointBuffer(map);
    }
    addLineBuffer() {
        lineBuffer(map);
    }
    addPolygonBuffer() {
        polygonBuffer(map);
    }
    delBuffer() {
        delBuffer(map);
    }
    addVoronoi() {
        console.log("22222");
        addVoronoiLayer(map);
    }
    delVoronoi() {
        delVoronoiLayer(map);
    }

    addRoadAnalysis() {
        addRoad(map);
    }
    delRoadAnalysis() {
        delRoad(map);
    }

}
