import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-auto-know-your-data',
  templateUrl: './auto-know-your-data.component.html',
  styleUrls: ['./auto-know-your-data.component.scss']
})
export class AutoKnowYourDataComponent implements OnInit {
 public data1= [
    {
      "value": 20,
      "date": "2020-05-12T12:19:00+00:00"
    },
    {
      "value": 50,
      "date": "2020-05-14T12:19:00+00:00"
    },
    {
      "value": 30,
      "date": "2020-05-16T12:19:00+00:00"
    },
    {
      "value": 80,
      "date": "2020-05-18T12:19:00+00:00"
    },
    {
      "value": 55,
      "date": "2020-05-20T12:19:00+00:00"
    },
    {
      "value": 60,
      "date": "2020-05-22T12:19:00+00:00"
    },
    {
      "value": 45,
      "date": "2020-05-24T12:19:00+00:00"
    },
    {
      "value": 30,
      "date": "2020-05-26T12:19:00+00:00"
    },
    {
      "value": 40,
      "date": "2020-05-28T12:19:00+00:00"
    },
    {
      "value": 70,
      "date": "2020-05-30T12:19:00+00:00"
    },
    {
      "value": 63,
      "date": "2020-06-01T12:19:00+00:00"
    },
    {
      "value": 40,
      "date": "2020-06-03T12:19:00+00:00"
    },
    {
      "value": 50,
      "date": "2020-06-05T12:19:00+00:00"
    },
    {
      "value": 75,
      "date": "2020-06-07T12:19:00+00:00"
    }
  ]
  private data = {
    "title": "Churn Summary",
    "x": [
      "Yes",
      "No"
    ],
    "y": [
      14711,
      36336
    ],
    "chartType": "VerticalBar"
  };
  private svg;
  private margin = 50;
  private width = 700 ;
  private height = 700 ;
  public svgInner;
  public yScale;
  public xScale;
  public xAxis;
  public yAxis;
  public lineGroup;
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    console.log(this.data1)
    this.initializeChart();
      this.drawChart();
  }
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.x))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.X))
      .attr("y", d => y(d.y))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.y))
      .attr("fill", "#d04a35");
  }
  private initializeChart(): void {
    this.svg = d3
      .select('.linechart')
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width)
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');
      this.svgInner = this.svg

    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.data1 , d => d.value ) +1, d3.min(this.data1, d => d.value )-1])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.xScale = d3.scaleTime().domain(d3.extent(this.data1, d => new Date(d.date)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px')
  }

  private drawChart(): void {
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m / %Y'));

    this.xAxis.call(xAxis);

    const yAxis = d3
      .axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data1.map(d => [
      this.xScale(new Date(d.date)),
      this.yScale(d.value),
    ]);

    this.lineGroup.attr('d', line(points));
  }


}
