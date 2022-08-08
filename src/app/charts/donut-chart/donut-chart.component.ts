import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
    selector: 'app-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss'],

})
export class DonutChartComponent implements OnInit {
    @Input() inputDountData: any;
    data1: any;
    title = 'Donut Chart';
    donutchart: any;
    svg: any;
    constructor() {
    }

    ngOnInit() {
        this.donutchart = this.inputDountData.chartId;
        this.data1 = this.inputDountData.data;

    }
    ngAfterViewInit() {
        if (!this.svg) {
            this.drawSVG();

        }

    }
    drawSVG() {
        //console.log("donut chart----->", this.data1)
        var data = this.data1;
        var text = "";

        var width = 350;
        var height = 350;
        var thickness = 80;
        var duration = 750;

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var svg = d3.select('#' + this.donutchart)
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function (d) { return d.y; })
            .sort(null);

        var path = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")
            .on("mouseover", function (d) {
                let g = d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "black")
                    .append("g")
                    .attr("class", "text-group");

                g.append("text")
                    .attr("class", "name-text")
                    .text(`${d.data.x}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-1.2em');

                g.append("text")
                    .attr("class", "value-text")
                    .text(`${d.data.y}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.6em');
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current))
                    .select(".text-group").remove();
            })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .on("mouseover", function (d) {
                d3.select(this)
                    .style("cursor", "pointer")
                    .style("opacity", "0.8");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current));
            })
            .each(function (d, i) { this._current = i; });


        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')

            .text(text);
        let legend = d3.select('#' + this.donutchart).append('div')
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
