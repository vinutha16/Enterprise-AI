import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { select, scaleLinear, scaleBand, axisLeft, max, range, event, selectAll } from 'd3';

@Component({
  selector: 'app-diverge-bar-chart',
  templateUrl: './diverge-bar-chart.component.html',
  styleUrls: ['./diverge-bar-chart.component.scss']
})
export class DivergeBarChartComponent implements AfterViewInit {

  @Input() inputDivergeData: any;
  svg: any;
  myVars: any;
  data: any = [];
  showlabel: boolean;
  diverge: any;
  xlabelData: any;
  ylabelData: any;

  ngOnInit() {
    this.diverge = this.inputDivergeData.chartId;
    this.showlabel = this.inputDivergeData.showLabel;
    this.data = this.inputDivergeData.data;
    this.xlabelData = this.inputDivergeData.xlabel;
    this.ylabelData = this.inputDivergeData.ylabel;
    if (this.data[0].label == undefined) {
      this.showlabel = false;
    } else {
      this.showlabel = true;
    }
    //console.log("this.diverge..." + this.diverge)
  }
  ngAfterViewInit() {
    this.drawSVG();
  }
  drawSVG() {
    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }
    var margin = { top: 10, right: 20, bottom: 60, left: 160 },
      width = 620 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#" + this.diverge)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Config
    var cfg = {
      labelMargin: 5,
      xAxisMargin: 0,
      yaxisMargin: 0,
      legendRightMargin: 0
    }

    var x = d3.scaleLinear()
      .range([0, width]);

    var colour = d3.scaleSequential(d3.interpolatePRGn);

    var y = d3.scaleBand()
      .range([height, 0])

    this.data.forEach(function (d) {
      d.y = +d.y;
      d.label = +d.label;
    });


    y.domain(this.data.map(function (d) { d.x }));

    x.domain(d3.extent(this.data, function (d) { return d.y; }));

    var max = d3.max(this.data, function (d) { return d.y; });
    colour.domain([-max, max]);
    var myVars = d3.map(this.data, function (d) { return d.x; }).keys()
    var y = d3.scaleBand()
      .range([height, 0]);

    y.domain(myVars)
      .padding(0.1);

    const tooltip = select('body').append('div')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#d4d1c3")
      .style("color", 'black')
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style('font-weight', 500)


    var bars = svg.append("g")
      .attr("class", "bars")

    bars.selectAll("rect")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("class", "annual-growth")
      .attr("x", function (d) {
        return x(Math.min(0, d.y));
      })
      .attr("y", function (d) { return y(d.x); })
      .attr("height", (y.bandwidth() - 5))
      .attr("width", function (d) {
        return Math.abs(x(d.y) - x(0));
      })
      .style("fill", function (d) {
        if (d.y < 0.0) {
          return "#f44336";

        }
        return "#42BE65";

      }).on('mouseenter', function (d) {
        select(event.currentTarget).style("cursor", "pointer")
        tooltip
          .style('opacity', .9);
        tooltip.html(d.x + '   ' + d.y)
          .style('left', (event.pageX + 'px'))
          .style('top', (event.pageY - 70) + 'px')
        select(event.currentTarget).attr('opacity', '.7')

      })
      .on('mouseout', function (d) {
        tooltip
          .style('opacity', 0);
        select(event.currentTarget).attr('opacity', '1')
      })
      .on('click', function (d, i) {
        select(event.currentTarget)
          .attr("fill", (d, i) => this.colors(d))
          .transition()
          .duration(1500)
          .delay(function (d, i) {
            return i * 50;
          }).attr("x", x(0))
          .attr("width", d => x(d.y) - x(0))
      })


    svg.append("g")
      .style("font-size", 12)
      .style("color", "#CCCCCC")
      .attr("transform", "translate(" + (width + cfg.yaxisMargin) + "0,)")
      .call(d3.axisLeft(y).tickSize(0).tickPadding(5))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -56)
      .attr("dy", "-5.9em")
      .attr("x", -140)
      .attr("text-anchor", "end")
      .attr("fill", "white")
      .text(this.ylabelData);

    var xAxis = svg.append("g")
      .attr("class", "x-axis")
      .style("font-size", 14)
      .attr("fill", "white")
      .attr("transform", "translate(0," + (height + cfg.xAxisMargin) + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0))

      .append("text")
      .attr("y", height - 340)
      .attr("x", width - width / 1.7)
      .attr("text-anchor", "start")
      .attr("fill", "white")
      .style("font-size", 14)
      .text(this.xlabelData);

    if (this.showlabel === true) {

      var labels = svg.append("g")
        .attr("class", "labels");

      labels.selectAll("text")
        .data(this.data)
        .enter().append("text")
        .attr("class", "bar-label")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .attr("x", function (d) {
          if (d.y < 0.0) {
            return x(d.y) + 10;

          }
          return x(d.y) - 50;

        })
        .attr("y", function (d) { return y(d.x) })
        .attr("dy", "2em")
        .text(function (d) {
          return d.label;
        });

    }

  }

}

