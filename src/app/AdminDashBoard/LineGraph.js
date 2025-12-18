import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LineGraph = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Set up the dimensions for the chart
    const margin = { top: 50, right: 80, bottom: 40, left: 60 } // Increased left margin for y-axis labels
    const width = 900 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom

    // Parse dates
    const parseDate = d3.timeParse('%Y-%m-%d')
    data.forEach((d) => {
      d.date = parseDate(d[0])
      d.value = d[1]
    })

    // Set up scales
    const x = d3.scaleTime().range([0, width])
    const y = d3.scaleLinear().range([height, 0])

    x.domain(d3.extent(data, (d) => d.date))
    y.domain([0, d3.max(data, (d) => d.value)])

    // Create line generator
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))

    // Clear existing chart elements
    svg.selectAll('*').remove()

    // Create a group element for the main chart
    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Add the X and Y axes
    chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))

    chartGroup
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50) // Adjust the label position
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Count') // Label text

    // Add the line without shading
    chartGroup
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none') // Remove area fill
      .attr('stroke', 'steelblue') // Set line color

    // Add dots and tooltips
    chartGroup
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.value))
      .attr('r', 3) // Radius of the dots
      .on('mouseover', function (event, d) {
        // Show tooltip on hover
        const [xPos, yPos] = d3.pointer(event)
        const tooltipX = xPos + 130 > width ? xPos - 250 : xPos + 10 // Adjust tooltip position
        const tooltipY = yPos - 130 > height ? yPos - 20 : yPos - 10 // Adjust tooltip position
        chartGroup
          .append('text')
          .attr('class', 'tooltip')
          .attr('x', tooltipX)
          .attr('y', tooltipY)
          .style('fill', 'rgba(255, 255, 255, 0.9)') // Set off-white text color
          .text(`Date: ${d3.timeFormat('%Y-%m-%d')(d.date)}, Count: ${d.value}`)
      })
      .on('mouseout', function () {
        // Remove tooltip on mouseout
        chartGroup.select('.tooltip').remove()
      })
  }, [data])

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Line Graph</h2>
      <svg ref={svgRef} width='900' height='600'>
        {/* No need to adjust the positioning here */}
        <g className='x-axis' />
        <g className='y-axis' />
        <path className='line' />
      </svg>
    </div>
  )
}

export default LineGraph
