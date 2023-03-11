//console.log(topojson)

let countiesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
/* let eduURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json' */
let eduURL = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'

let countiesData
let eduData

let board = d3.select('#board')
tooltip = d3.select('#tooltip')

let makeMap = function() {
    board.selectAll('path')
            .data(countiesData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (x) => {
                let id = x['id']
                let county = eduData.find((x) => {
                    return x['fips'] === id
                })
                let percentage = county['bachelorsOrHigher']
                if (percentage <= 5) {
                    return 'saddlebrown'
                } else if (percentage <= 10) {
                    return 'chocolate'
                } else if (percentage <=15) {
                    return 'sandybrown'
                } else if (percentage <=20) {
                    return 'peachpuff'
                } else {
                    return 'seashell'
                }

            })
            .attr('data-fips', (x) => {
                return x['id']
            })
            .attr('data-education', (x) => {
                let id = x['id']
                let county = eduData.find((x) => {
                    return x['fips'] === id
                })
                return county['bachelorsOrHigher']
            })
            .on('mouseover', (x)=> {

               tooltip.transition()
                    .style('visibility', 'visible')

                    let id=x['id']
                    let county = eduData.find((x) => {
                        return x['fips'] === id })

                    tooltip.text(county['area_name'] + ', ' + county['state'] + ': ' + county['bachelorsOrHigher'] + '%')
                        
                    .attr('data-education', county['bachelorsOrHigher'])

            })
            .on('mouseout', (x) => {
                tooltip.transition()
                .style('visibility', 'hidden')
            })
            
}

d3.json(countiesURL)
    .then(
        (data, error) => {
        if (error) {
            console.log(log)
        } else {
            countiesData = topojson.feature(data, data.objects.counties).features
            console.log(countiesData)
            d3.json(eduURL)
                .then(
                    (data, error) => {
                        if (error) {
                            console.log(log)
                        } else {
                            eduData = data
                            console.log(eduData)
                            makeMap()
                        }
                    }

                )
        }
    })


/*     d3.json(eduURL) 
        .then(
            (data, error) => {
                if (error) {
                    console.log(log)
                } else {
                    eduData = data
                    console.log(eduData)
                }
            }
        ) */