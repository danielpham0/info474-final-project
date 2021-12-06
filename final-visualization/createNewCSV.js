// INCLUDE THIS SOMEWHERE IN MAIN.JS WHEN YOU WANT A NEW CSV
// IN EXCEL:
// - GO TO DATA
// - CLICK TEXT TO COL
// - DELIMITED BY "^"
d3.json("neighborhoods.geojson")
  .then(function(neighborhoods) {
    d3.csv("collisions.csv").then(function(dataset){
        const newData = []
        dataset = dataset.slice(0, 5000);
        collisions = dataset.filter(item => item.X != "" || item.Y != "")
        for (const n of neighborhoods.features) {
            for (cKey in collisions) {
                let c = collisions[cKey]
                if (d3.geoContains(n.geometry, [c.X, c.Y])) {
                    let newC = c
                    let nName = n.properties.nhood || n.properties.name
                    if (n.properties.nhood && n.properties.name) {
                        nName = n.properties.nhood + "-" + n.properties.name
                    }
                    let nCenterPoint = turf.center(n).geometry.coordinates
                    newC['NEIGHBORHOOD'] = nName
                    newC['NX'] = nCenterPoint[0]
                    newC['NY'] = nCenterPoint[1]
                    newData.push(newC)
                }
            }
        }
        let csv
        let keys = ['X', 'Y', 'LOCATION', 'SEVERITYCODE', 'SEVERITYDESC', 'COLLISIONTYPE', 
                'PERSONCOUNT', 'VEHCOUNT', 'INJURIES', 'SERIOUSINJURIES', 'FATALITIES', 
                'INCDTTM', 'WEATHER', 'ROADCOND', 'LIGHTCOND', 'NEIGHBORHOOD', 'NX', 'NY']
        let keysAmount = keys.length
        for(let row = 0; row < newData.length; row++){
            let keysCounter = 0
            // If this is the first row, generate the headings
            if(row === 0){
                csv += keys.join('^') + '\r\n'
               // Loop each property of the object
            }else{
               for(const key of keys){
                   csv += newData[row][key] + (keysCounter+1 < keysAmount ? '^' : '\r\n' )
                   keysCounter++
               }
            }
            keysCounter = 0
        }
        let link = document.createElement('a')
        link.id = 'download-csv'
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', 'collisions_n.csv');
        document.body.appendChild(link)
        document.querySelector('#download-csv').click()
    });
});