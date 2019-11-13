import React from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";

export default class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.createLineChart = this.createLineChart.bind(this);
    }
    componentDidMount() {
        this.createLineChart();
    }

    componentDidUpdate() {
        this.createLineChart();
    }
    createLineChart() {
        // d3.csv("/30Dor_cool.csv", function(data) {
        //     console.log(data);
        // });
        const node = this.node;
        // var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        //     width = 460 - margin.left - margin.right,
        //     height = 400 - margin.top - margin.bottom;
        // console.log(margin, width, height);
        //
        // var svg = d3
        //     .select("main")
        //     .append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr(
        //         "transform",
        //         "translate(" + margin.left + "," + margin.top + ")"
        //     );
        //
        // console.log(svg);

        console.log("node: ", node);
        const dataMax = max(this.props.data);
        //console.log("dataMax, size: ", dataMax, this.props.size);
        // let x = scaleLinear()
        //     .domain([0, this.props.data.length - 1])
        //     .range([0, this.props.size[0]]);
        // console.log(x);
        // let y = scaleLinear()
        //     .domain([0, dataMax])
        //     .range([0, this.props.size[1]]);
        //console.log(y);

        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);
        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect");

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .style("fill", "#fe9922")
            .attr("x", (d, i) => i * 25)
            .attr("y", d => this.props.size[1] - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 25);

        // select(node)
        //     .selectAll("path")
        //     .data(this.props.data)
        //     .attr("fill", "none")
        //     .style("stroke", "steelblue")
        //     .attr("stroke-width", 1.5)
        //     .attr(
        //         "d",
        //         d3
        //             .line()
        //             .x([1, 2, 3, 4])
        //             .y([1, 2, 3, 4])
        //         //        .attr("y" y(y));
        //         //        .attr("y", d => this.props.size[1] - y(d));
        //     )
        //     .attr("height", d => y(d))
        //     .attr("width", 25);
    }

    render() {
        return (
            <svg
                id="canvas-svg"
                ref={node => (this.node = node)}
                width={500}
                height={500}
            ></svg>
        );
    }
}

//    <svg ref={node => (this.node = node)} width={500} height={500}></svg>;
