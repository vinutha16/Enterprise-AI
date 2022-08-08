import { Component, OnInit, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as D3 from 'd3';
import { select, event } from 'd3'

interface key {
  x: string,
  y: number
}

// interface dataColorObj {
//   value: string,
//   color: string
// }

interface treemapObj {
  name: string,
  children: [key]
}

@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeChartComponent implements OnInit {
  data: treemapObj;
  //dataColorMap: [dataColorObj] = [{ value: '', color: '' }];

  treemap: any;
  inputdata: any = [];
  showlabel: boolean;
  constructor(elementRef: ElementRef) {
  }

  @Input() inputTreeData: any;

  ngOnInit() {
    this.treemap = this.inputTreeData.chartId;
    this.inputdata = this.inputTreeData.data;
    this.showlabel = this.inputTreeData.showlabel;
  }
  ngAfterViewInit() {

    this.data = { name: '', children: this.inputdata };
    let d3: any = D3;
    let tempvar = d3.select('#' + this.treemap)

    this.treemapcreate(this.data);
  }


  treemapcreate(data: treemapObj) {

    let d3: any = D3;
    var margin = { top: 0, right: 20, bottom: 65, left: 20 },
      width = 690 - margin.left - margin.right,
      height = 490 - margin.top - margin.bottom;
    var color = d3.scaleOrdinal().range(d3.schemeCategory10);

    let tempvar = d3.select('#' + this.treemap)



    var svg = d3.select('#' + this.treemap)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function (d) { return d.y }) // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap()
      .size([width, height])
      .padding(0)
      (root)

    const tooltip = select('body').append('div')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#d4d1c3")
      .style("color", 'black')
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style('font-weight', 500)

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      //.attr("class", "rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", function (d, i) {
        return color(d.data.x)
      })



      .on('mouseenter', function (d) {
        select(event.currentTarget).style("cursor", "pointer")
        tooltip
          .style('opacity', .9);
        tooltip.html(d.data.x + ' ' + d.data.y)
          .style('left', (event.pageX + 'px'))
          .style('top', (event.pageY - 70) + 'px')
        select(event.currentTarget).attr('opacity', '.7')

      })
      .on('mouseout', function (d) {
        tooltip
          .style('opacity', 0);
        select(event.currentTarget).attr('opacity', '1')
      })

    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("class", "text")
      .style("text-anchor", 'middle')//function(d) {return (d.x1 - d.x0) >  (d.y1 - d.y0) ? "middle":"end"})
      .attr("x", function (d) { return d.x0 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 })    // +20 to adjust position (lower)
      //.text(d => (d.data.key) )
      // .text(d => (d.data.x.length * 1) < (d.x1 - d.x0) ? d.data.x.substring(0, 8) : '')
      .text(d => ((typeof d.data.x !== 'string') ? d.data.x : (d.data.x.length * 1) < (d.x1 - d.x0) ? d.data.x.substring(0, 8) : ''))

      .attr("font-size", d => Math.max(Math.min((d.x1 - d.x0) / 6, 20), 12).toString() + 'px')

      .attr("transform", d => "translate(" + (d.x1 - d.x0) / 2 + "," + (d.y1 - d.y0) / 2 + ")")

  }

}
