import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as D3 from 'd3';
import { select, event} from 'd3';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalBarComponent implements OnInit {
  @Input() inputVerBarData: any;

  data: any = [];
  bar: any;
  svg: any;
  xlabelData:any;
  ylabelData:any;

  //private svg;
  private margin = 50;
  private width = 580;
  private height = 400;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  constructor() {
  }

  inputdata: any = [];
  ngOnInit(): void {
    this.bar = "";
    this.bar = this.inputVerBarData.chartId;
    this.data = this.inputVerBarData.data;
    this.xlabelData=this.inputVerBarData.xlabel;
    this.ylabelData=this.inputVerBarData.ylabel;
  }

  ngOnChanges() {
  }
  ngAfterViewInit() {
    this.createSvg();
    this.drawBars(this.data);

  }




  colors: any;
  private createSvg(): void {
    var margin = { top: 30, right: 80, bottom: 25, left: 62 },
      width = 655 - margin.left - margin.right,
      height = 490 - margin.top - margin.bottom;
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);
    this.svg = d3.select('#' + this.bar)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  }



  private drawBars(data: any): void {
    const tooltip = select('body').append('div')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#d4d1c3")
      .style("color", 'black')
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style('font-weight', 500)

    let ggg = data;
    // Create the X-axis band scale
    var x = d3.scaleBand()
      .range([0, this.width])
      .domain(ggg.map(d => (d.x)))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(this.wrap, x.bandwidth())
      .style("text-anchor", "middle")


    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 40000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y))

      .attr("font-size", "11px");

    ///////////labels//////////////
    this.svg.append("text")
      .attr("class", "x label")
      .attr("x", this.width - 380)
      .attr("y", this.height + 56)
      .text(this.xlabelData)
      .attr("fill", "#fff")
      .attr("font-size", "15px")


    this.svg.append("text")
      .attr("class", "y label")
      .attr("fill", "#fff")
      .attr("y", -52)
      .attr("x", -200)
      .attr("dy", ".175em")
      .attr("transform", "rotate(-90)")
      .text(this.ylabelData)
      .attr("font-size", "15px");

    this.svg.selectAll("bars")
      .data(ggg)
      .enter()
      .append("rect")
      .attr("x", d => x(d.x))
      .attr("y", d => y(d.y))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.y))
      .attr("fill", (d, i) => this.colors(i))
      .on('mouseenter', function (d) {
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
        //alert(2)
      })
  }

  wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
      while (word = words.pop()) {
        line.push(word)
        tspan.text(line.join(" "))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(" "))
          line = [word]
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
        }
      }
    })
  }


}
