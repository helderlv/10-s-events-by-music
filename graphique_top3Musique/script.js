export function lastSlide(data2, titre) {
  const data = data2

    .sort((a, b) => b.Spotify - a.Spotify) // Sort in descending order based on Spotify value
    .slice(0, 3) // Get the first three entries
    .map(item => ({
      name: item.NomDuTitre,
      value: item.Spotify
    }));

  let diameter = 600,
    color = d3.scaleOrdinal(d3.schemeCategory10);

  // Create a title for the graph
  let title = `TOP 3 DES 10' ${titre}`;

  let bubble = d3.pack()
    .size([diameter, diameter])
    .padding(5);

  let margin = {
    left: 0,
    right: 100,
    top: 0, // Adjust top margin to make space for the title
    bottom: 0
  };

  let svg = d3.select('#chart').append('svg')
    .attr('viewBox', '0 0 ' + (diameter + margin.right) + ' ' + (diameter + margin.top)) // Adjust viewBox height
    .attr('width', (diameter + margin.right))
    .attr('height', (diameter + margin.top)) // Adjust SVG height
    .attr('class', 'chart-svg');

  // Append title to the SVG
  svg.append("text")
    .attr("x", (diameter + margin.right) / 2) // Center the title horizontally
    .attr("y", 50) // Position the title slightly above the top margin
    .attr("text-anchor", "middle")
    .style("font-size", "1.5em")
    .style("fill", "#4C4158")
    .style("font-weight", "500")
    .style("font-family", "M PLUS 2")
    .text(title);

  let root = d3.hierarchy({ children: data })
    .sum(function (d) { return d.value; })
    .sort(function (a, b) { return b.value - a.value; });

  bubble(root);

  let node = svg.selectAll('.node')
    .data(root.children)
    .enter()
    .append('g').attr('class', 'node')
    .attr('transform', function (d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
    .append('g').attr('class', 'graph');

  node.append("circle")
    .attr("r", function (d) { return d.r; })
    .style("fill", function (d) {
      return color(d.data.name);
    });

  node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (d) { return d.data.name; })
    .style("fill", "#ffffff")
    .style('font-size', function (d) { return `${d.data.value / 100000000 - d.data.name.length * 10000}px` });
}


// let colorScale = d3.scaleLinear()
//   .domain([0, d3.max(data, function (d) {
//     return d.value;
//   })])
//   .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

// svg.append("g")
//   .attr("class", "legendOrdinal")
//   .attr("transform", "translate(600,40)");

// let legendOrdinal = d3.legendColor()
//   .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
//   .shapePadding(10)
//   .scale(color);

// svg.select(".legendOrdinal")
//   .call(legendOrdinal);