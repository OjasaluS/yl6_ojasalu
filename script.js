(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let aeg = "EL";
            if (h >= 12 && h < 24) {
                aeg = "PL";
            }

            h = h % 12;

            if (h == 0) {
                h = 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + aeg;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", submitDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function submitDelivery(event) {
        event.preventDefault();
        if (checkForms(event)) {
            estimateDelivery(event);
        }
    }

    function checkForms(event) {
        event.preventDefault();
        let fname = document.getElementById("fname").value;
        console.log(fname);
        let lname = document.getElementById("lname").value;
        if (fname == "" || /\d/.test(fname)) {
            alert("Palun sisestage korrektne eesnimi");
            return false;
        }
        if (lname == "" || /\d/.test(lname)) {
            alert("Palun sisestage korrektne perekonnanimi");
            return false;
        }
        return true;
    }
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let c1_checked = document.getElementById("v1").checked;
        let c2_checked = document.getElementById("v2").checked;
        let r1_checked = document.getElementById("r1").checked;
        let r2_checked = document.getElementById("r2").checked;
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            let value = 0;
            value += parseFloat(linn.options[linn.selectedIndex].getAttribute('datavalue'));
            if (c1_checked) {
                value += parseFloat(document.getElementById("v1").getAttribute('datavalue'));
            }
            if (c2_checked) {
                value += parseFloat(document.getElementById("v2").getAttribute('datavalue'));
            }
            if (r1_checked) {
                value += parseFloat(document.getElementById("r1").getAttribute('datavalue'));
            } else if (r2_checked) {
                value += parseFloat(document.getElementById("r2").getAttribute('datavalue'));
            } else {
                alert("Palun valige tarneaeg");

                return;
            }

            e.innerHTML = value + "&euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";
    58.83142513145305, 25.736304562274714

    let centerPoint = new Microsoft.Maps.Location(
        58.83142513145305,
        25.736304562274714
    );

    let tty = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let trk = new Microsoft.Maps.Location(
        59.43388862676066,
        24.748958946994147
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    //Create an infobox that will render in the center of the map.
    let infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false,
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);
    
    let pushpin = new Microsoft.Maps.Pushpin(tty);

    pushpin.metadata = {
        title: 'Tartu Ülikooli hoone',
        description: 'Maailma top 250 ülikool'
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', ttyclicked);

    map.entities.push(pushpin);

    let pushpin2 = new Microsoft.Maps.Pushpin(trk);

    //Store some metadata with the pushpin.
    pushpin2.metadata = {
        title: 'Tallinna Reaalkooli hoone',
        description: 'Üks parimatest Eesti koolidest'
    };

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', trkclicked);

    map.entities.push(pushpin2);

    function ttyclicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    function trkclicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

