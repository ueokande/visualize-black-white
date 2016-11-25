var rangeEnd = new Date(),
    rangeBegin = new Date(rangeEnd.getFullYear() - 1, rangeEnd.getMonth(), rangeEnd.getDate());

d3.json("data.json", function(dataset) {
  var completedData = d3.time.days(rangeBegin, rangeEnd).map(function(date) {
    found = dataset.find(function(d) {
      d = new Date(d)
      return d.getFullYear() == date.getFullYear() && d.getMonth() == date.getMonth() && d.getDate() == date.getDate();
    });
    return typeof found !== 'undefined' ? new Date(found) : date
  });

  var width = 960,
      height = 136,
      cellSize = 10

  var percent = d3.format(".1%")

  function colorf(date) {
    if (date.getHours() === 0 && date.getMinutes() == 0) {
      return ""
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 10)) {
      return "#f0f0f0";
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 10)) {
      return "#a0a0a0";
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 40)) {
      return "#505050";
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 10)) {
      return "#000000";
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 40)) {
      return "#800";
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)) {
      return "#f00";
    }
    return "yellow"
  }

  function classf(date) {
    if (date.getDay() == 0) {
      return "day sunday"
    } else if (date.getDay() == 6) {
      return "day saturday"
    } else if (date.getHours() == 0) {
      return "day absence"
    }
    return "day"
  }

  var days = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .selectAll(".day")
      .data(completedData)
    .enter().append("rect")
      .attr("class", classf)
      .attr("data-date", function(d) { return d; })
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return d3.time.weekOfYear(d) * (cellSize + 2); })
      .attr("y", function(d) { return d.getDay() * (cellSize + 2); })
      .style("fill", colorf)
});
