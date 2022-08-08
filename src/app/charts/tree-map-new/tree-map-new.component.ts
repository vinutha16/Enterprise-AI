import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree-map-new',
  templateUrl: './tree-map-new.component.html',
  styleUrls: ['./tree-map-new.component.scss']
})
export class TreeMapNewComponent implements AfterViewInit, OnInit {

  @Input() inputVal: any;
  data: any;
  svg: any;
  treeArray: any = [];
  data1: any = [];
  treemap: any;
  format: any = [];

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.treemap = this.inputVal[0].chartId;
    console.log("this.treemap/.new.id."+JSON.stringify(this.treemap))
   // if (!this.svg) {
      this.drawSVG();
    //}

  }

  drawSVG() {
    var data = this.inputVal[0].data;
    console.log("this.treemap/..data,,,,."+JSON.stringify(data))
      var margin = { top: 0, right: 25, bottom: 65, left: 10 },
      width = 690 - margin.left - margin.right,
      height = 490 - margin.top - margin.bottom;
    var color = d3.scaleOrdinal().range(d3.schemeCategory10);


    var svg = d3.select('#' + this.treemap)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



    data.forEach(function (d) {
      d.value = +d.value;
      d.name = d.name;
      d.parent = d.parent;
    });

    var root = d3.stratify()
      .id(function (d) { return d.name; })
      .parentId(function (d) { return d.parent; })
      (data);
    root.sum(function (d) { return +d.value })

    d3.treemap()
      .size([width, height])
      .padding(4)
      (root)

    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      // .style("fill", "#69b3a2");
      .style("fill", function (d) {
        return color(d.data.name);
      })


    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) { return d.x0 + 6 })
      .attr("y", function (d) { return d.y0 + 20 })
      .text(d =>

        (d.data.name.length * 8) < (d.x1 - d.x0) ? d.data.name : '')
      .attr("font-size", "12px")
      .attr("fill", "white")



  }

}
