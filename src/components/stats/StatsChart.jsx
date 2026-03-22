import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './StatsChart.css';

const StatsChart = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Datos de ejemplo
  const popularProducts = [
    { name: 'Churros', sales: 150 },
    { name: 'Chocolate', sales: 120 },
    { name: 'Porras', sales: 100 },
    { name: 'Bartolillos', sales: 80 },
    { name: 'Torrijas', sales: 70 },
  ];

  const categoryData = [
    { name: 'Churros', value: 40 },
    { name: 'Chocolate', value: 25 },
    { name: 'Bollería', value: 20 },
    { name: 'Bebidas', value: 15 },
  ];

  // Gráfica de barras
  useEffect(() => {
    if (!barChartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(barChartRef.current).selectAll('*').remove();

    const svg = d3.select(barChartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(popularProducts, d => d.sales)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(popularProducts.map(d => d.name))
      .range([0, height])
      .padding(0.2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', '#8B4513');

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#8B4513');

    svg.selectAll('.bar')
      .data(popularProducts)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => y(d.name))
      .attr('width', 0)
      .attr('height', y.bandwidth())
      .attr('fill', '#8B4513')
      .attr('rx', 5)
      .transition()
      .duration(1000)
      .attr('width', d => x(d.sales));

    svg.selectAll('.label')
      .data(popularProducts)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.sales) + 5)
      .attr('y', d => y(d.name) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .text(d => d.sales)
      .style('fill', '#8B4513')
      .style('font-weight', 'bold')
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);

  }, []);

  // Gráfica circular
  useEffect(() => {
    if (!pieChartRef.current) return;

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 40;

    d3.select(pieChartRef.current).selectAll('*').remove();

    const svg = d3.select(pieChartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(categoryData.map(d => d.name))
      .range(['#8B4513', '#D2691E', '#CD853F', '#DEB887']);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcHover = d3.arc()
      .innerRadius(0)
      .outerRadius(radius + 10);

    const slices = svg.selectAll('.slice')
      .data(pie(categoryData))
      .enter()
      .append('path')
      .attr('class', 'slice')
      .attr('d', arc)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    slices.transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    slices.on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arcHover);
    })
    .on('mouseout', function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arc);
    });

    const legend = svg.selectAll('.legend')
      .data(categoryData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${radius + 20},${-radius + i * 30})`);

    legend.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', d => color(d.name));

    legend.append('text')
      .attr('x', 25)
      .attr('y', 15)
      .text(d => `${d.name} (${d.value}%)`)
      .style('fill', '#8B4513')
      .style('font-size', '12px');

  }, []);

  return (
    <section className="stats-section">
      <h2 className="stats-title">📊 Estadísticas de Ventas</h2>
      <p className="stats-subtitle">Conoce nuestros productos más populares</p>
      
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>🏆 Productos Más Populares</h3>
          <div ref={barChartRef} className="chart bar-chart"></div>
        </div>
        
        <div className="chart-wrapper">
          <h3>📈 Ventas por Categoría</h3>
          <div ref={pieChartRef} className="chart pie-chart"></div>
        </div>
      </div>
    </section>
  );
};

export default StatsChart;