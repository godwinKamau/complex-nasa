const apiKey = 'ae194c9fd4f9c372a84ee9d9568b0d6f'

document.querySelector('button').addEventListener('click',doxxNasa)

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
                        console.log(data)
                    })
                    .catch(err => console.log(err))
            } 
        })
        .catch(err=>console.log(err))
    }



// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
//         .then (res => res.json())
//         .then(data => {
//             console.log(data)
//             const farenheight = (data.main.temp - 273.15) * 9/5 + 32
//             document.querySelector('h2').innerHTML = `${farenheight.toFixed(2)}` + '&#8457;'
//         })
//         .catch(err => console.log(err))


//make table with name, location, and weather
////// collect name & location(both city and long/lat) in object format
/////  make request to openweather for weather at locations
