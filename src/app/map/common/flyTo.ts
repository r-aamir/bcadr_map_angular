import Map from 'ol/Map';
import View from 'ol/View';
import * as olCoordinate from 'ol/coordinate';
export function viewFlyTo(map:Map,location:olCoordinate.Coordinate) {
    let view:View = map.getView();
    let duration = 2000;
    let zoom:any = view.getZoom();
    var parts = 2;
    var called = false;
    view.animate(
        {
            center: location,
            duration: duration,
        },
        callback
    );
    view.animate(
        {
            zoom: zoom - 1,
            duration: duration / 2,
        },
        {
            zoom: 14,
            duration: duration * 1.5,
        },
        callback
    );
    function callback(complete:any) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            // done(complete);
            // return;
            // //console.log(called);
        }
    }
}