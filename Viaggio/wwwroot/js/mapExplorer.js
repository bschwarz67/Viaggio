import { Route } from "./route.js";

class mapExplorer {

    map;
    route = new Route();

    async initMap(pointDomObjects, routeId) {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const { PinElement } = await google.maps.importLibrary("marker");


        this.map = new Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            mapId: 'DEMO_MAP_ID',
            disableDoubleClickZoom: true,
        });

        document.getElementById("Lat").removeAttribute("id");
        document.getElementById("Lng").removeAttribute("id");
        document.getElementById("Index").removeAttribute("id");

        this.map.addListener("click", (e) => {
            let i = this.route.addPoint(e.latLng, this.map);
            this.map.panTo(e.latLng);
        });

        if (routeId != null) {
            let routeIdInput = document.createElement("input");
            let routeIdInputDiv = document.createElement("div");
            routeIdInputDiv.className = "routeInput";
            routeIdInput.type = "number";
            routeIdInput.name = "routeId";
            routeIdInput.value = routeId;
            routeIdInputDiv.appendChild(routeIdInput);
            document.getElementById("createRouteForm").appendChild(routeIdInputDiv);
        }

        for (let pointDomObject of pointDomObjects) {
            const point = JSON.parse(pointDomObject.value);
            
            this.route.addPoint(new google.maps.LatLng(point.Lat, point.Lng), this.map);
        }

    }

    
}


export { mapExplorer };

