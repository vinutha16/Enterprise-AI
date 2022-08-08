import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],

})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Input() inputPieData: any;
  pieData: any = [];
  private tooltip: any;
  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;
  pieChart: any = "pieChart";
  pieoldData: any;

  constructor() {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.pieChart = this.inputPieData.chartId;
    this.pieData = this.inputPieData.data;
  }
  ngAfterViewInit() {
    this.pieoldData = this.inputPieData;

    if (!this.svg) {
      this.drawSVG();
    }

  }

  drawSVG() {


    var data = this.pieData;
    var text = "";

    var width = 350;
    var height = 350;
    var thickness = 40;
    var duration = 750;
    var padding = 10;
    var opacity = .8;
    var opacityHover = 1;
    var otherOpacityOnHover = .8;
    var tooltipMargin = 13;

    var radius = Math.min(width - padding, height - padding) / 2;
    var color = d3.scaleOrdinal().range(d3.schemeCategory10);

    var svg = d3.select('#' + this.pieChart)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    var div = d3.select('#' + this.pieChart)
      .append("div")
      .attr("class", "tooltip")
      .style("background-color", "#d4d1c3")
      .style("color", 'black')
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style('font-weight', 500)

    var g = svg.append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    var pie = d3.pie()
      .value(function (d) { return d.y; })
      .sort(null);

    var path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .style('opacity', opacity)
      .style('stroke', 'white')
      .style("cursor", "pointer")
      .on("mouseover", function (d) {
        d3.selectAll('path')
          .style("opacity", otherOpacityOnHover);
        d3.select(this)
          .style("opacity", opacityHover);

        let g = d3.select("svg")
          .style("cursor", "pointer")
          .append("g")
          .attr("class", "tooltip")
          .style("opacity", 0);

        g.append("text")
          .attr("class", "name-text")
          .text(`${d.data.x} (${d.data.y})`)
          .attr('text-anchor', 'middle');

        let text = g.select("text");
        let bbox = text.node().getBBox();
        let padding = 2;
        g.insert("rect", "text")
          .attr("x", bbox.x - padding)
          .attr("y", bbox.y - padding)
          .attr("width", bbox.width + (padding * 2))
          .attr("height", bbox.height + (padding * 2))
          .style("fill", "white")
          .style("opacity", 0.75);
      })
      .on("mouseover", function (d, s) {

        let path = d3.select(this).style("opacity", "1");
        path.classed('highlighted', true);
        div.transition()
          .duration(100)
          // .attr("class", "tooltip")
          .style("position", "absolute")
          .style("opacity", "1");
        div.html('<div><span class="tooltip-legend" style="background-color:' + d.data.color + '" ></span><span class="fontchange">' + d.data.x + '</span><span class="fontmargin">' + '   ' + (d.data.y) + '</span></div>')

          .style("display", "inline-block")
          .style("left", (d3.mouse(this)[0] + 150) + "px")
          .style("top", (d3.mouse(this)[1] + 100) + "px")

      })

      .on("mouseout", function () {
        div.transition()
          .duration(600)
          .style("opacity", "0");
        let path = d3.select(this).style("fill", function (d) { return d.data.color });
        path.classed('highlighted', false);

      });


    let legend = d3.select('#' + this.pieChart).append('div')
      .attr('class', 'legend')
      .style('margin-top', '-15rem')
      .style('margin-left', '30rem');


    let keys = legend.selectAll('.key')
      .data(data)
      .enter().append('div')
      .attr('class', 'key')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('font-size', '20px')
      .style('margin-right', '20px');

    keys.append('div')
      .attr('class', 'symbol')
      .style('height', '15px')
      .style('width', '15px')
      .style('margin', '5px 5px')
      .style('background-color', (d, i) => color(i));

    keys.append('div')
      .attr('class', 'name')
      .text(d => `${d.x}`);

    keys.exit().remove();
  }
}
