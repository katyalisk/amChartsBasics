am4core.useTheme(am4themes_animated);
am4core.options.queue = true;
am4core.options.onlyShowOnViewport = true;

// --- Chart Data ---
data = [{ 
  "country": "Lithuania",
  "litres": 501.9,
  "bottles": 1500
}, {
  "country": "Czechia",
  "litres": 301.9,
  "bottles": 990
}, {
  "country": "Ireland",
  "litres": 201.1,
  "bottles": 785
}, {
  "country": "Germany",
  "litres": 165.8,
  "bottles": 255
}, {
  "country": "Australia",
  "litres": 139.9,
  "bottles": 452
}, {
  "country": "Austria",
  "litres": 128.3,
  "bottles": 332
}, {
  "country": "UK",
  "litres": 99,
  "bottles": 150
}, {
  "country": "Belgium",
  "litres": 60,
  "bottles": 178
}, {
  "country": "The Netherlands",
  "litres": 50,
  "bottles": 50
}];

columnData = [{
  "country": "Lithuania",
  "research": 501.9,
  "marketing": 250,
  "sales": 199
}, {
  "country": "Czech Republic",
  "research": 301.9,
  "marketing": 222,
  "sales": 251
}, {
  "country": "Ireland",
  "research": 201.1,
  "marketing": 170,
  "sales": 199
}, {
  "country": "Germany",
  "research": 165.8,
  "marketing": 122,
  "sales": 90
}, {
  "country": "Australia",
  "research": 139.9,
  "marketing": 99,
  "sales": 252
}, {
  "country": "Austria",
  "research": 128.3,
  "marketing": 85,
  "sales": 84
}, {
  "country": "UK",
  "research": 99,
  "marketing": 93,
  "sales": 142
}, {
  "country": "Belgium",
  "research": 60,
  "marketing": 50,
  "sales": 55
}, {
  "country": "The Netherlands",
  "research": 50,
  "marketing": 42,
  "sales": 25
}];

lineData = [{
  "date": new Date(2018, 3, 20),
  "value": 90,
  "value2": 45
}, {
  "date": new Date(2018, 3, 21),
  "value": 102,
  "value2": 90
}, {
  "date": new Date(2018, 3, 22)
}, {
  "date": new Date(2018, 3, 23),
  "value": 125
}, {
  "date": new Date(2018, 3, 24),
  "value": 55,
  "value2": 90
}, {
  "date": new Date(2018, 3, 25),
  "value": 81,
  "value2": 60
}, {
  "date": new Date(2018, 3, 26)
}, {
  "date": new Date(2018, 3, 27),
  "value": 63,
  "value2": 87
}, {
  "date": new Date(2018, 3, 28),
  "value": 113,
  "value2": 62
}];

// --- Doughnut Chart ---
const drawDonutChart = () => {
	let donutChart = am4core.create("doughnutChart", am4charts.PieChart); // ��������� �������� ���������.
																		  // ��� �������� ��������� �� ������ ������ JSON-������ ������������ ������� am4charts.createFromConfig().
	donutChart.data = data;
	
	donutChart.innerRadius = am4core.percent(40); // �������������� �������� ��������� � ���������.
	// donutChart.radius = am4core.percent(100);  // ������.

	let donutSeries = donutChart.series.push(new am4charts.PieSeries()); // ����� ��� �������� ��������� (���������� ������).
																		 // ������ ����� ������������ ��������� ����� ������, ������� ����� ���� ������� � ���� ��������� ����������� ���������
																		 // (��������, �����, �������� ��� �����).
	donutSeries.dataFields.value = "litres";							 // ��� �������� (�������� ������).
	donutSeries.dataFields.category = "country";						 // ��� ��������� (��������� �����).

	donutSeries.slices.template.stroke = am4core.color("#fff"); // ���� ������� �������� "slices".
	donutSeries.slices.template.strokeWidth = 2;			    // ������� �������.
	donutSeries.slices.template.strokeOpacity = 1; 			  	// ������������ �������.

	donutSeries.labels.template.disabled = true;     // ���������� ����������� ��������� �����.
	donutSeries.ticks.template.disabled = true;      // ���������� ����������� �����-����������.
	// donutSeries.slices.template.tooltipText = ""; // ���������� ����������� ����������� ���������.

	// donutChart.startAngle = 180; // ��������� ���� �������� ���������.
	// donutChart.endAngle = 360;   // �������� ���� �������� ���������.
	donutSeries.hiddenState.properties.endAngle = -90; // ��������.

	let hs = donutSeries.slices.template.states.getKey("hover");  // ��������� ��������� "hover" �������� "slices".
	hs.properties.scale = 0.9;								      // ��������� ��������������� �������� (�� ��������� - 1.1).

	let as = donutSeries.slices.template.states.getKey("active"); // ��������� ��������� "active" �������� "slices".
	as.properties.shiftRadius = 0;				                  // ��������� ����������� �������� ��� ��� ������� (�� ��������� - 0.1).

	donutSeries.slices.template.fillOpacity = 1;                  // ������������ �������� "slices" �� ���������. 
	hs.properties.fillOpacity = 0.5;						      // ��������� ������������ ��������.

	let secondDonutSeries = donutChart.series.push(new am4charts.PieSeries()); // ������ ����� ��� �������� ��������� (������� ������).
	secondDonutSeries.dataFields.value = "bottles";
	secondDonutSeries.dataFields.category = "country";
	secondDonutSeries.slices.template.stroke = am4core.color("#fff");
	secondDonutSeries.slices.template.strokeWidth = 2;
	secondDonutSeries.slices.template.strokeOpacity = 1;
	secondDonutSeries.slices.template.states.getKey("hover").properties.scale = 1.1;
	secondDonutSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
	secondDonutSeries.hiddenState.properties.endAngle = -90;

	secondDonutSeries.labels.template.text = "{category}: {value.value}";		 // ���������� ��������� �����.
	secondDonutSeries.slices.template.tooltipText = "{category}: {value.value}"; // ���������� ����������� ���������.

	// donutChart.legend = new am4charts.Legend();                    // �������.
	// donutChart.legend.valueLabels.template.text = "{value.value}"; // ���������� �������.
};
drawDonutChart();

// (������)
// --- Pie Chart ---
{
	// ��������������� �������.
	function toggleSlice(item) {
	  let slice = pieSeries.dataItems.getIndex(item);
	  if (slice.visible) {
		slice.hide();
	  }
	  else {
		slice.show();
	  };
	};

	function hoverSlice(item) {
	  let slice = pieSeries.slices.getIndex(item);
	  slice.isHover = true;
	};

	function blurSlice(item) {
	  let slice = pieSeries.slices.getIndex(item);
	  slice.isHover = false;
	};
	
	// ---
	
	let pieChart = am4core.create("pieChart", am4charts.PieChart); // ��������� �������� ���������.
	pieChart.data = data;

	let pieSeries = pieChart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";

	pieSeries.ticks.template.disabled = true;
	pieSeries.alignLabels = false; 											 // ������������ ��������� �����.
	pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
	pieSeries.labels.template.radius = am4core.percent(-40); 				 // ������ ��� ��������� �����.
	pieSeries.labels.template.fill = am4core.color("white"); 				 // ���� ��������� �����.
	pieSeries.hiddenState.properties.endAngle = -90;

	// ����� �� ���������� 
	pieSeries.labels.template.adapter.add("radius", function(radius, target) { // !!! ������� �������� ��� callback-������� !!!
	  if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
		return 0;
	  }
	  return radius;
	});

	pieSeries.labels.template.adapter.add("fill", function(color, target) {
	  if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
		return am4core.color("#000");
	  }
	  return color;
	});

	// ����������� ������ ������ �������
	pieSeries.slices.template.events.on("hit", function(ev) { // !!! ������� �������� ��� event-� !!!
	  let series = ev.target.dataItem.component;
	  series.slices.each(function(item) {
		if (item.isActive && item != ev.target) {
		  item.isActive = false;
		}
	  })
	});

	// ��������� ������� !!! ��� �Ѩ ���� ������ !!!
	pieChart.events.on("ready", function(event) { 
	  pieChart.customLegend = document.getElementById('legend');
	  pieSeries.dataItems.each(function(row, i) {
		let color = pieChart.colors.getIndex(i);
		let percent = Math.round(row.values.value.percent * 100) / 100;
		let value = row.value;
		legend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
	  });
	});
};

// --- Line-Column Chart ---
const drawLineColumnChart = () => {
	let lineColumnChart = am4core.create("lineColumnChart", am4charts.XYChart); // ��������� XY-���������.
	lineColumnChart.padding(10, 20, 0, 0);           							// ����������� ���������� ��������.
	lineColumnChart.cursor = new am4charts.XYCursor(); 							// ������.
	lineColumnChart.data = data;

	let categoryAxis = lineColumnChart.xAxes.push(new am4charts.CategoryAxis()); // ��� X - ��� ���������.
	let valueAxis = lineColumnChart.yAxes.push(new am4charts.ValueAxis());	   	 // ��� Y - ��� ��������.
	categoryAxis.dataFields.category = "country";					   		 	 // ����������� ��������� ������ ��� ��� ���������.

	categoryAxis.title.text = "Countries";	  // ��������� ��� ���������.
	valueAxis.title.text = "Litres sold (M)"; // ��������� ��� ��������.

	categoryAxis.renderer.minGridDistance = 20; // ����������� ������������ ���������� ����� ���������� ����� (� ��������).

	valueAxis.min = 0; 	  					  	// ������ ������� ��� ����������� ������ �� ��� ��������.
	valueAxis.max = 1700; 					  	// ������� ������� ��� ����������� ������ �� ��� ��������.
	valueAxis.strictMinMax = true; 			  	// ������������� ������ ��������� ����������.

	let columnSeries = lineColumnChart.series.push(new am4charts.ColumnSeries()); // ����� "Column" (����������).
	columnSeries.dataFields.categoryX = "country";
	columnSeries.dataFields.valueY = "litres";
	columnSeries.name = "Sales";											  // ��� ����� (������������ ��� ������� �/��� ����������� ���������).
	columnSeries.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
	// columnSeries.columns.template.fill = am4core.color("#104547"); 	  	  // ���� ��������.

	let lineSeries = lineColumnChart.series.push(new am4charts.LineSeries()); // ����� "Line" (��������).
	lineSeries.dataFields.categoryX = "country";
	lineSeries.dataFields.valueY = "bottles";
	lineSeries.name = "Bottles";
	lineSeries.strokeWidth = 3; // ������� �����.
	// lineSeries.stroke = am4core.color("#CDA2AB"); // ���� �����.

	// let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());  // ������ ��� ����� "Line".	
	// circleBullet.stroke = am4core.color("#fff"); 	 	   					  // ���� ������� �������.
	// circleBullet.strokeWidth = 2;				     	   					  // ������� ������� �������.
	// circleBullet.tooltipText = "Value: [bold]{valueY}[/]"; 					  // ����������� ��������� ��� �������.

    let bullet = lineSeries.bullets.push(new am4core.Circle());					  // ������ ��������� ���������� ������� (����� � ������������������).
	bullet.radius = 5;
	bullet.stroke = am4core.color("#fff");
	bullet.strokeWidth = 2;
	bullet.tooltipText = "Value: [bold]{valueY}[/]";

	let labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet());
	labelBullet.label.text = "{valueY}";				   // ����� �������.				
	labelBullet.label.dy = -20;							   // �������� ������� �� ��� Y.

	// let shadow = new am4core.DropShadowFilter();  // ������� ������ (������ ����).
	// shadow.dx = 2; 								 // �������� ���� �� ����.
	// shadow.dy = 2;
	// bullet.filters.push(shadow);			         // ���������� �������� ������� � �������.
};
drawLineColumnChart();

// --- Column Chart ---
const drawColumnChart = () => {
	let columnChart = am4core.create("columnChart", am4charts.XYChart); // ��������� XY-���������.
	columnChart.data = columnData;
	
	columnChart.padding(10, 20, 0, 0);
	columnChart.cursor = new am4charts.XYCursor();
	// columnChart.scrollbarX = new am4core.Scrollbar();
	// columnChart.scrollbarY = new am4core.Scrollbar();
	columnChart.zoomOutButton.disabled = true;

	let categoryAxis = columnChart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country";
	categoryAxis.title.text = "Local country offices";
	categoryAxis.renderer.grid.template.location = 0; // ������������ ����� ������������ ��� ���������.
	categoryAxis.renderer.minGridDistance = 20;

	let valueAxis = columnChart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.title.text = "Expenditure (M)";
	valueAxis.min = 0;	
	valueAxis.max = 1000;
	valueAxis.strictMinMax = true;

	let columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
	columnSeries.dataFields.categoryX = "country";
	columnSeries.dataFields.valueY = "research";
	columnSeries.name = "Research";
	columnSeries.tooltipText = "{name}: [bold]{valueY}[/]";
	columnSeries.stacked = true; // ���������� (�����������) �����.

	let secondColumnSeries = columnChart.series.push(new am4charts.ColumnSeries());
	secondColumnSeries.dataFields.categoryX = "country";
	secondColumnSeries.dataFields.valueY = "marketing";
	secondColumnSeries.name = "Marketing";
	secondColumnSeries.tooltipText = "{name}: [bold]{valueY}[/]";
	secondColumnSeries.stacked = true;

	let thirdColumnSeries = columnChart.series.push(new am4charts.ColumnSeries());
	thirdColumnSeries.dataFields.categoryX = "country";
	thirdColumnSeries.dataFields.valueY = "sales";
	thirdColumnSeries.name = "Sales";
	thirdColumnSeries.tooltipText = "{name}: [bold]{valueY}[/]";
	thirdColumnSeries.stacked = true;
};
drawColumnChart();

// --- Line Chart ---
const drawLineChart = () => {
	let lineChart = am4core.create("lineChart", am4charts.XYChart); // ��������� XY-���������.
	lineChart.data = lineData;
	
	lineChart.zoomOutButton.disabled = true;
	
	let dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());  // ��� X - ��������?� ���.
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.location = 0.5;
	dateAxis.startLocation = 0.5; // ��������� ��������� ���.
	dateAxis.endLocation = 0.5;   // �������� ��������� ���.

	let valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;	
	valueAxis.max = 130;
	valueAxis.strictMinMax = true;
	
	let lineSeries = lineChart.series.push(new am4charts.LineSeries());
	lineSeries.dataFields.valueY = "value";
	lineSeries.dataFields.dateX = "date";
	lineSeries.strokeWidth = 3;
	lineSeries.strokeDasharray = "3,3"; // �����. 
	lineSeries.bullets.push(new am4charts.CircleBullet());
	lineSeries.connect = false;    // ������������ ����� ��� ������� ������ ����� ������. 

	let secondLineSeries = lineChart.series.push(new am4charts.LineSeries());
	secondLineSeries.dataFields.valueY = "value2";
	secondLineSeries.dataFields.dateX = "date";
	secondLineSeries.strokeWidth = 3;
	secondLineSeries.tensionX = 0.8;
	secondLineSeries.bullets.push(new am4charts.CircleBullet());
};
drawLineChart();

// (��������)
// --- Radar Charts ---
const drawRadarChart1 = () => {
	// let container = am4core.create("radarChart", am4core.Container); // �������� ������� (����� framerate).
	// container.width = am4core.percent(100);
	// container.height = am4core.percent(100);
	// container.layout = "horizontal";
	
	let radarChart = am4core.create("radarChart1", am4charts.RadarChart); // ��������� ���������� ���������.
	radarChart.data = columnData;
	radarChart.cursor = new am4charts.RadarCursor();
	
	let categoryAxis = radarChart.xAxes.push(new am4charts.CategoryAxis()); // ��� X - �������� ���.
	categoryAxis.dataFields.category = "country";
	
	let valueAxis = radarChart.yAxes.push(new am4charts.ValueAxis());	    // ��� Y - ���������� ���.
	valueAxis.renderer.gridType = "polygons";								// ��� ����� �����.
	
	let radarSeries = radarChart.series.push(new am4charts.RadarSeries());
	radarSeries.dataFields.categoryX = "country";
	radarSeries.dataFields.valueY = "sales";
	radarSeries.name = "Sales";
	radarSeries.strokeWidth = 3;
	radarSeries.zIndex = 2;	// ��������� ����������� �� �������.

	let secondRadarSeries = radarChart.series.push(new am4charts.RadarColumnSeries());
	secondRadarSeries.dataFields.valueY = "marketing";
	secondRadarSeries.dataFields.categoryX = "country";
	secondRadarSeries.name = "Units";
	secondRadarSeries.strokeWidth = 0;
	secondRadarSeries.columns.template.fill = am4core.color("#6771DC");
	secondRadarSeries.columns.template.fillOpacity = 0.5;
	secondRadarSeries.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
};

const drawRadarChart2 = () => {
	let secondRadarChart = am4core.create("radarChart2", am4charts.RadarChart); // ��������� ���������� ���������.
	secondRadarChart.data = columnData;

	let cAxis = secondRadarChart.yAxes.push(new am4charts.CategoryAxis());
	cAxis.dataFields.category = "country";
	cAxis.renderer.labels.template.horizontalCenter = "right";
	cAxis.renderer.labels.template.location = 1;
	cAxis.renderer.labels.template.fillOpacity = 0.5;
	cAxis.renderer.minGridDistance = 10;
	cAxis.strictMinMax = true;
	
	let vAxis = secondRadarChart.xAxes.push(new am4charts.ValueAxis());
	vAxis.renderer.maxLabelPosition = 0.99; // ������� ��������� ����� ���.
	vAxis.renderer.axisFills.template.fill = secondRadarChart.colors.getIndex(2);
	vAxis.renderer.axisFills.template.fillOpacity = 0.05;
	
	let fRadarSeries = secondRadarChart.series.push(new am4charts.RadarColumnSeries());
	fRadarSeries.dataFields.valueX = "research";
	fRadarSeries.dataFields.categoryY = "country";
	fRadarSeries.name = "Research";
	fRadarSeries.strokeWidth = 0;
	fRadarSeries.columns.template.tooltipText = "Series: {name}\nValue: {valueX}";
	fRadarSeries.sequencedInterpolation = true;
	fRadarSeries.sequencedInterpolationDelay = 100;
	fRadarSeries.stacked = true;	
	
	let sRadarSeries = secondRadarChart.series.push(new am4charts.RadarColumnSeries());
	sRadarSeries.dataFields.valueX = "marketing";
	sRadarSeries.dataFields.categoryY = "country";
	sRadarSeries.name = "Marketing";
	sRadarSeries.strokeWidth = 0;
	sRadarSeries.columns.template.tooltipText = "Series: {name}\nValue: {valueX}";
	sRadarSeries.sequencedInterpolation = true;
	sRadarSeries.sequencedInterpolationDelay = 100;
	sRadarSeries.stacked = true;	
	
	let tRadarSeries = secondRadarChart.series.push(new am4charts.RadarColumnSeries());
	tRadarSeries.dataFields.valueX = "sales";
	tRadarSeries.dataFields.categoryY = "country";
	tRadarSeries.name = "Sales";
	tRadarSeries.strokeWidth = 0;
	tRadarSeries.columns.template.tooltipText = "Series: {name}\nValue: {valueX}";
	tRadarSeries.sequencedInterpolation = true;
	tRadarSeries.sequencedInterpolationDelay = 100;
	tRadarSeries.stacked = true;
};

const drawRadarChart3 = () => {
	let thirdRadarChart = am4core.create("radarChart3", am4charts.RadarChart); // ��������� ���������� ���������.
	thirdRadarChart.data = columnData;
	
	let ctAxis = thirdRadarChart.xAxes.push(new am4charts.CategoryAxis());
	ctAxis.dataFields.category = "country";
	ctAxis.renderer.labels.template.location = 0.5;

	let vlAxis = thirdRadarChart.yAxes.push(new am4charts.ValueAxis());
	vlAxis.renderer.labels.template.location = 1;
	vlAxis.renderer.labels.template.verticalCenter = "bottom";
	vlAxis.renderer.labels.template.fillOpacity = 0.5;
	vlAxis.renderer.maxLabelPosition = 0.99;
	
	let series1 = thirdRadarChart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueY = "research";
	series1.dataFields.categoryX = "country";
	series1.name = "Research";
	series1.strokeWidth = 0;
	series1.columns.template.tooltipText = "Series: {name}\nValue: {research}";
	series1.sequencedInterpolation = true;
	series1.sequencedInterpolationDelay = 100;
	series1.stacked = true;		
	
	let series2 = thirdRadarChart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueY = "marketing";
	series2.dataFields.categoryX = "country";
	series2.name = "Marketing";
	series2.strokeWidth = 0;
	series2.columns.template.tooltipText = "Series: {name}\nValue: {marketing}";
	series2.sequencedInterpolation = true;
	series2.sequencedInterpolationDelay = 100;
	series2.stacked = true;	
	
	let series3 = thirdRadarChart.series.push(new am4charts.RadarColumnSeries());
	series3.dataFields.valueY = "sales";
	series3.dataFields.categoryX = "country";
	series3.name = "Sales";
	series3.strokeWidth = 0;
	series3.columns.template.tooltipText = "Series: {name}\nValue: {sales}";
	series3.sequencedInterpolation = true;
	series3.sequencedInterpolationDelay = 100;
	series3.stacked = true;	
	
	thirdRadarChart.legend = new am4charts.Legend();

	thirdRadarChart.startAngle = -170;
	thirdRadarChart.endAngle = -10;
	thirdRadarChart.innerRadius = am4core.percent(50);
};
drawRadarChart1();
drawRadarChart2();
drawRadarChart3();

// (��������)
// --- Gauge Charts ---
const drawGaugeChart1 = () => {
	let gaugeChart = am4core.create("gaugeChart1", am4charts.GaugeChart); // ��������� ������������� ��������� (��������� �����������). �� ����� ����������� ������������ ������.
	
	let axis = gaugeChart.xAxes.push(new am4charts.ValueAxis()); 
	axis.min = 0;
	axis.max = 100;
	axis.strictMinMax = true;
	
	let range = axis.axisRanges.create();
	range.value = 0;
	range.endValue = 70;
	range.axisFill.fillOpacity = 1;
	range.axisFill.fill = am4core.color("#88AB75");
	range.axisFill.zIndex = -1;

};
drawGaugeChart1();