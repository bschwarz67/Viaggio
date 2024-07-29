
import { "secretKey" as secretKeyGoogleMapsAPI } from "./secretKey.js";

(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: secretKeyGoogleMapsAPI,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});



const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const { PinElement } = await google.maps.importLibrary("marker");

class Route {
    head = null;
    tail = null;
    form = document.getElementById("createRouteForm");
    

    test() {
        console.log("test");
    }

    printPoints() {
        let curr = this.head;
        while (curr != null) {
            console.log(curr.index);
            curr = curr.next;
        }
    }

    resetIndexes() {
        let curr = this.head;
        let i = 0;
        while (curr != null) {
            curr.index = i;
            curr.marker.content.children[1].firstElementChild.innerText = i.toString();
            curr.pointDiv.id = "point" + i.toString();

            curr.pointDiv.children[0].name = "points[" + i.toString() + "].Lat";
            curr.pointDiv.children[1].name = "points[" + i.toString() + "].Lng";
            curr.pointDiv.children[2].name = "points[" + i.toString() + "].Index";
            curr.pointDiv.children[2].value = i.toString();


            i++;
            curr = curr.next;
        }
    }


    addPoint(position, map) {

        //add point to linkedlist
        if (this.head == null) {
            this.head = new Point();
            this.head.prev = null;
            this.tail = this.head;
            this.tail.next = null;
            this.tail.index = 0;
        }
        else {
            this.tail.next = new Point();
            this.tail.next.next = null;
            this.tail.next.prev = this.tail;
            this.tail.next.index = this.tail.index + 1;
            this.tail = this.tail.next;
        }


        //create a new marker and add it to the map
        let pinElementDiv = document.createElement("div");
        pinElementDiv.innerText = this.tail.index.toString();
        let pinElement = new google.maps.marker.PinElement({
            glyph: pinElementDiv,
        });

        

        let marker = new google.maps.marker.AdvancedMarkerElement({
            position: position, // raw data from position position.lat() position.lng()
            map: map,
            content: pinElement.element,
            gmpClickable: true,

        });


        marker.addListener("click", ({ domEvent}) => {
            this.removePoint(parseInt(marker.content.children[1].firstElementChild.innerText));
        });


        /* doesnt seem to trigger?
        marker.addListener("dblclick", ({ domEvent }) => {
            console.log(marker.content);
            
        });
        */

        this.tail.marker = marker;





        //create a new form input/label/span

        let newPointDiv = document.getElementById("pointInputTemplate").cloneNode(true);
        newPointDiv.setAttribute("id", "point" + this.tail.index.toString());
        newPointDiv.setAttribute("class", "routeInput");


        newPointDiv.children[0].name = "points[" + this.tail.index.toString() + "].Lat";
        newPointDiv.children[0].value = position.lat().toString();
        newPointDiv.children[1].name = "points[" + this.tail.index.toString() + "].Lng";
        newPointDiv.children[1].value = position.lng().toString();
        newPointDiv.children[2].name = "points[" + this.tail.index.toString() + "].Index";
        newPointDiv.children[2].value = this.tail.index.toString();


        


        this.form.appendChild(newPointDiv);
        this.tail.pointDiv = newPointDiv;

        return this.tail.index;
    }

    removePoint(index) {
        let curr = this.head;
        while (curr != null) {
            if (curr.index == index) {
                curr.marker.map = null;
                if (curr == this.head) {
                    if (curr.next != null) {
                        this.head = curr.next;
                        this.head.prev = null;
                    }
                    else {
                        this.head = null;
                        this.tail = null;
                    }
                }
                else if (curr == this.tail) {

                    if (curr == this.head) {
                        this.head = null;
                        this.tail = null;
                    }
                    else {

                        this.tail = curr.prev;
                        this.tail.next = null;
                    }

                }
                else {
                    curr.prev.next = curr.next;
                    curr.next.prev = curr.prev;
                    curr = curr.next;
                }
                this.form.removeChild(document.getElementById("point" + index.toString()));
                this.resetIndexes();

                return index;
            }
            else {
                curr = curr.next;
            }
        }
        return null;
    }
}

class Point {
    next;
    prev;
    index;
    marker;
    pointDiv;
}

export { Route };
