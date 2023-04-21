import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const OrgChart = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (data && ref.current) {
      const root = d3.hierarchy(data);
      const width = 600;
      const height = 400;
      const treeLayout = d3.tree().size([width, height]);

      treeLayout(root);

      const svg = d3.select(ref.current).attr("width", width).attr("height", height);

      const nodes = root.descendants();
      const links = root.links();

      const link = svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

      const node = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

      node
        .append("circle")
        .attr("r", 10)
        .attr("fill", "white")
        .attr("stroke", "black");

      node
        .append("text")
        .text(d => d.data.name)
        .attr("dx", 12)
        .attr("dy", 5);
    }
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default OrgChart;
