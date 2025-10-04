///////// INTRO TO MY ISSUE: I've made this object in the doxxNasa function, but I'm having trouble calling the weather list. I've put a console.log so you can see the object after its made.

const apiKey = 'ae194c9fd4f9c372a84ee9d9568b0d6f'

document.querySelector('button').addEventListener('click',doxxNasa)

//making the object
function doxxNasa() {
    
    fetch('https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json')
        .then(res => res.json())
        .then(data => {
            //  organize the data received into an object, minimizing the amount of calls later on
            let centers = {}
            
            data.forEach(point => {
                ////consolidate the facilities into their respective centers
                //  initialize new key value pair if the center is not in object
                if (!Object.keys(centers).includes(point.center)){

                    //  add the location and facilities list upon initialization(courtesy of Michael Kazin)
                    centers[point.center] = {facilities : [],location:point.location}
                    centers[point.center].facilities.push(point.facility)

                } else {

                    //  add facility to the list of facilities in the specific location
                    centers[point.center].facilities.push(point.facility)

                } 
            })
            //  make a fetch request for the center locations
            for (const value of Object.values(centers)) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${value.location.latitude}&lon=${value.location.longitude}&units=imperial&appid=${apiKey}`)
                    .then (res => res.json())
                    .then(data => {
                        //  place location, temperature, and weather in the same center object
                        value['weather'] = [data.name, data.main.temp , data.weather[0].description]
                    })
                    .catch(err => console.log(err))
            }
            makeTable(centers)
        })
        .catch(err=>console.log(err))
}

function makeTable(centers) {
    console.log('Object of centers/facilities',centers)
//// THIS IS WHERE MY TROUBLE STARTS    /////////
//I'm trying to call the weather object's list, but I keep getting undefined
    if (document.getElementById('table')) {
        let deleteTable = document.getElementById('table')
        deleteTable.parentNode.removeChild(deleteTable)
    }

    let table = document.createElement('table')
    table.id = 'table'


    for (const[key,value] of Object.entries(centers)) {
        
        value.facilities.forEach(facility => {
            // console.log(facility)
            let row = table.insertRow()

            for(let i = 0;i<5;i++){
                const newCell = row.insertCell()
                if (i==0){
                    newCell.textContent = facility
                } else if(i===1) {
                    newCell.textContent = key
                } else if (i ===2) {
////// THIS IS where I would want the weather to go, but I keep getting undefined when I try to call it.
///// How can I properly call it.
                    // console.log(city)
                }
                // } else if (i === 3) {
                //     newCell.textContent = key.weather
                // } else if (i === 4) {
                //     newCell.textContent = key.weather[2]
                // }
            }
                
            
        }
        )
    
    }
    document.body.appendChild(table);
}
