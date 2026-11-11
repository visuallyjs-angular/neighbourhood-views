import {AnchorLocations, CONNECTOR_TYPE_STRAIGHT, HierarchyLayout} from "@visuallyjs/browser-ui";

import type { AngularRenderOptions } from "@visuallyjs/browser-ui-angular";

const renderOptions: AngularRenderOptions = {
    layout: {
        type: HierarchyLayout.type
    },
    elementsDraggable: false,
    edges: {
        anchor: [AnchorLocations.Bottom, AnchorLocations.Top],
        connector: {
            type: CONNECTOR_TYPE_STRAIGHT,
            options: {
                stub: 10,
                outlineWidth: 2,
                outlineColor: "#ffffff"
            }
        }
    },
    consumeRightClick: false,
    zoomToFit: true
}

export default renderOptions
