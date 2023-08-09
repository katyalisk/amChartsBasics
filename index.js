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

gaugeData = {
  score: 52.7,
  gradingData: [
    {
      title: "Unsustainable",
      color: "#ee1f25",
      lowScore: -100,
      highScore: -20
    },
    {
      title: "Volatile",
      color: "#f04922",
      lowScore: -20,
      highScore: 0
    },
    {
      title: "Foundational",
      color: "#fdae19",
      lowScore: 0,
      highScore: 20
    },
    {
      title: "Developing",
      color: "#f3eb0c",
      lowScore: 20,
      highScore: 40
    },
    {
      title: "Maturing",
      color: "#b0d136",
      lowScore: 40,
      highScore: 60
    },
    {
      title: "Sustainable",
      color: "#54b947",
      lowScore: 60,
      highScore: 80
    },
    {
      title: "High Performing",
      color: "#0f9747",
      lowScore: 80,
      highScore: 100
    }
  ]
};

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

// --- Pie Chart ---
const drawPieChart = () => {
	let pieChart = am4core.create("pieChart", am4charts.PieChart); // ��������� �������� ���������.
	pieChart.data = data;
	pieChart.legend = new am4charts.Legend();
	pieChart.legend.position = "right";

	let pieSeries = pieChart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";

	pieSeries.ticks.template.disabled = true;
	pieSeries.alignLabels = false; 											 // ������������ ��������� �����.
	pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
	pieSeries.labels.template.radius = am4core.percent(-40); 				 // ������ ��� ��������� �����.
	pieSeries.labels.template.fill = am4core.color("white"); 				 // ���� ��������� �����.
	pieSeries.hiddenState.properties.endAngle = -90;

    // ���������� ��������� ����� ������/��� ���������.
	pieSeries.labels.template.adapter.add("radius", function(radius, target) {
	  if (!!target.dataItem && (target.dataItem.values.value.percent < 10)) {
		return 0;
	  }
	  return radius;
	});

	pieSeries.labels.template.adapter.add("fill", function(color, target) {
	  if (!!target.dataItem && (target.dataItem.values.value.percent < 10)) {
		return am4core.color("#000");
	  }
	  return color;
	});

	// ����� ������ ������ �������� "slice".
	pieSeries.slices.template.events.on("hit", function(ev) {
	  let series = ev.target.dataItem.component;
	  series.slices.each(function(item) {
		if (item.isActive && item != ev.target) {
		  item.isActive = false;
		}
	  })
	});
};
drawPieChart();

// --- Line-Column Chart ---
const drawLineColumnChart = () => {
	let lineColumnChart = am4core.create("lineColumnChart", am4charts.XYChart);  // ��������� XY-���������.
	lineColumnChart.padding(10, 20, 0, 0);           							 // ����������� ���������� ��������.
	lineColumnChart.cursor = new am4charts.XYCursor(); 							 // ������.
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
	lineSeries.connect = false;    		// ������������ ����� ��� ������� ������ ����� ������. 

	let secondLineSeries = lineChart.series.push(new am4charts.LineSeries());
	secondLineSeries.dataFields.valueY = "value2";
	secondLineSeries.dataFields.dateX = "date";
	secondLineSeries.strokeWidth = 3;
	secondLineSeries.tensionX = 0.8;
	secondLineSeries.bullets.push(new am4charts.CircleBullet());
};
drawLineChart();

// --- Radar Charts ---
const drawRadarChart1 = () => {	
	let radarChart = am4core.create("radarChart1", am4charts.RadarChart);   // ��������� ���������� ���������.
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
	radarSeries.stroke = "#6771dc";
	radarSeries.strokeWidth = 3;
	radarSeries.zIndex = 2;	// ��������� ����������� �� �������.
	
	let bullet = radarSeries.bullets.push(new am4charts.CircleBullet());
	bullet.radius = 3;
	bullet.fill = am4core.color("#6794dc");

	let secondRadarSeries = radarChart.series.push(new am4charts.RadarColumnSeries());
	secondRadarSeries.dataFields.valueY = "marketing";
	secondRadarSeries.dataFields.categoryX = "country";
	secondRadarSeries.name = "Units";
	secondRadarSeries.strokeWidth = 0;
	secondRadarSeries.columns.template.fill = am4core.color("#67b7dc");
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
	fRadarSeries.sequencedInterpolation = true; 	// �������� ��������� ���������.
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
	thirdRadarChart.zoomOutButton.disabled = true;
	
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

// --- Gauge Charts ---
const drawGaugeChart1 = () => {
	// ��������������� �������.
	const lookUpGrade = (lookupScore, grades) => {
	  for (let i = 0; i < grades.length; i++) {
		if (
		  grades[i].lowScore < lookupScore &&
		  grades[i].highScore >= lookupScore
		) {
		  return grades[i];
		}
	  }
	  return null;
	};
	// ---
	
	let gaugeChart = am4core.create("gaugeChart1", am4charts.GaugeChart);
	gaugeChart.innerRadius = am4core.percent(80);
	
	let chartMin = -50;
	let chartMax = 100;
	
	let axis = gaugeChart.xAxes.push(new am4charts.ValueAxis());
	axis.min = chartMin;
	axis.max = chartMax;
	axis.strictMinMax = true;
	axis.renderer.radius = am4core.percent(80);
	axis.renderer.inside = true;
	axis.renderer.line.strokeOpacity = 0.1;
	axis.renderer.ticks.template.disabled = false;
	axis.renderer.ticks.template.strokeOpacity = 1;
	axis.renderer.ticks.template.strokeWidth = 0.5;
	axis.renderer.ticks.template.length = 5;
	axis.renderer.labels.template.radius = am4core.percent(15);
	axis.renderer.labels.template.fontSize = "0.9em";
	
	let axis2 = gaugeChart.xAxes.push(new am4charts.ValueAxis());
	axis2.min = chartMin;
	axis2.max = chartMax;
	axis2.strictMinMax = true;
	axis2.renderer.labels.template.disabled = true;
	axis2.renderer.grid.template.opacity = 0;
	axis2.renderer.labels.template.bent = true; // "��������" ����� �� ����������.
	axis2.renderer.labels.template.fill = am4core.color("#000");
	axis2.renderer.labels.template.fontWeight = "bold";
	axis2.renderer.labels.template.fillOpacity = 0.7;
	
	for (let grading of gaugeData.gradingData) {
		let range = axis2.axisRanges.create(); // �������� ��������� (��������� � �������� ��������� �� ���).
		range.axisFill.fill = am4core.color(grading.color);
		range.axisFill.fillOpacity = 0.8;
		range.axisFill.zIndex = -1;
		range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
		range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
		range.grid.strokeOpacity = 0;
		range.stroke = am4core.color(grading.color).lighten(-0.1);
		range.label.inside = true;
		range.label.text = grading.title.toUpperCase();
		range.label.inside = true;
		range.label.location = 0.5;
		range.label.inside = true;
		range.label.radius = am4core.percent(10);
		range.label.paddingBottom = -5;
		range.label.fontSize = "0.6em";
	};
	
	let matchingGrade = lookUpGrade(gaugeData.score, gaugeData.gradingData);
	
	let label = gaugeChart.radarContainer.createChild(am4core.Label);
	label.isMeasured = false; 		   // ���������� ����� �������� � ���������� ���������� Container (������������ ��� ������������ �������� �������).
	label.fontSize = "6em";
	label.x = am4core.percent(50); 	   // ??? ���������
	label.paddingBottom = 10;
	label.horizontalCenter = "middle"; // ������������ �� �����������.
	label.verticalCenter = "bottom";   // ������������ �� ���������.
	label.text = gaugeData.score.toFixed(1);
	
	let label2 = gaugeChart.radarContainer.createChild(am4core.Label);
	label2.isMeasured = false;
	label2.fontSize = "1em";
	label2.horizontalCenter = "middle";
	label2.verticalCenter = "bottom";
	label2.text = matchingGrade.title.toUpperCase();
	
	let hand = gaugeChart.hands.push(new am4charts.ClockHand());
	hand.axis = axis2;
	hand.innerRadius = am4core.percent(55);
	hand.startWidth = 8;
	hand.pin.disabled = true; // ����������� �����.
	hand.value = 0;
	hand.fill = am4core.color("#444");
	hand.stroke = am4core.color("#000");

	// ��������������� �������.
	setInterval(function() {
    let value = chartMin + Math.random() * (chartMax - chartMin);
    hand.showValue(value, 1000, am4core.ease.cubicOut);
	}, 2000);
	
	hand.events.on("positionchanged", function(){
		label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
		let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), gaugeData.gradingData);
		if (matchingGrade !== null) {
			label2.text = matchingGrade.title.toUpperCase();
		}		
	});
};

const drawGaugeChart2 = () => {
	// ��������������� �������.
	setInterval(() => {
	  hand1.showValue(Math.random() * 160, 1000, am4core.ease.cubicOut);
	  hand2.showValue(Math.random() * 240, 1000, am4core.ease.cubicOut);
	}, 1000);
	// ---
	
	let gaugeChart = am4core.create("gaugeChart2", am4charts.GaugeChart);
	
	let axis1 = gaugeChart.xAxes.push(new am4charts.ValueAxis()); 
	axis1.min = 0;
	axis1.max = 160;
	axis1.strictMinMax = true;
	axis1.renderer.inside = true; // ���������� ����� ���� ������ ������� �������.
	axis1.renderer.radius = am4core.percent(97);
	axis1.renderer.line.strokeOpacity = 1;
	axis1.renderer.line.strokeWidth = 5;
	axis1.renderer.line.stroke = gaugeChart.colors.getIndex(0);
	axis1.renderer.labels.template.radius = 35;
	axis1.renderer.grid.template.disabled = true;	
	
	let axis2 = gaugeChart.xAxes.push(new am4charts.ValueAxis()); 
	axis2.min = 0;
	axis2.max = 240;
	axis2.strictMinMax = true;
	axis2.renderer.line.strokeOpacity = 1;
	axis2.renderer.line.strokeWidth = 5;
	axis2.renderer.line.stroke = gaugeChart.colors.getIndex(3);
	axis2.renderer.grid.template.disabled = true;

	let hand1 = gaugeChart.hands.push(new am4charts.ClockHand());
	hand1.value = 10;
	hand1.fill = gaugeChart.colors.getIndex(0);
	hand1.stroke = gaugeChart.colors.getIndex(0);
	hand1.axis = axis1;
	hand1.pin.radius = 14;
	hand1.startWidth = 10;
	
	let hand2 = gaugeChart.hands.push(new am4charts.ClockHand());
	hand2.value = 10;
	hand2.fill = gaugeChart.colors.getIndex(3);
	hand2.stroke = gaugeChart.colors.getIndex(3);
	hand2.axis = axis2;
	hand2.pin.radius = 10;
	hand2.startWidth = 10;
};
drawGaugeChart1();
drawGaugeChart2();

// --- Charts Container ---
const drawMixedCharts = () => {
	let container = am4core.create("chartsContainer", am4core.Container); // ��������� ��� �������� ��������.
	container.layout = "grid"; // �������� ����������.
	container.fixedWidthGrid = false;
	container.width = am4core.percent(100);
	container.height = am4core.percent(100);
	container.paddingTop = 20;
	container.paddingRight = 0;
	container.paddingLeft = 20;
	container.paddingBottom = 0;

	let colors = new am4core.ColorSet();

	const createLine = (title, data, color) => {
		let chart = container.createChild(am4charts.XYChart);
		chart.width = am4core.percent(45);
		chart.height = 100;

		chart.data = data;

		chart.titles.template.fontSize = 10;
		chart.titles.template.textAlign = "left";
		chart.titles.template.isMeasured = false;
		chart.titles.create().text = title;

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.grid.template.disabled = true;
		dateAxis.renderer.labels.template.disabled = true;
		dateAxis.startLocation = 0.5;
		dateAxis.endLocation = 0.7;
		dateAxis.cursorTooltipEnabled = false;

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		chart.cursor = new am4charts.XYCursor();
		chart.cursor.lineY.disabled = true;
		chart.cursor.behavior = "none";

		let series = chart.series.push(new am4charts.LineSeries());
		series.tooltipText = "{date}: [bold]{value}";
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "value";
		series.tensionX = 0.8;
		series.strokeWidth = 2;
		series.stroke = color;

		let bullet = series.bullets.push(new am4charts.CircleBullet());
		bullet.circle.opacity = 0;
		bullet.circle.fill = color;
		bullet.circle.propertyFields.opacity = "opacity";
		bullet.circle.radius = 3;

		return chart;
	};

	const createColumn = (title, data, color) => {
		let chart = container.createChild(am4charts.XYChart);
		chart.width = am4core.percent(45);
		chart.height = 100;

		chart.data = data;

		chart.titles.template.fontSize = 10;
		chart.titles.template.textAlign = "left";
		chart.titles.template.isMeasured = false;
		chart.titles.create().text = title;

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.grid.template.disabled = true;
		dateAxis.renderer.labels.template.disabled = true;
		dateAxis.cursorTooltipEnabled = false;

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.renderer.grid.template.disabled = true;
		valueAxis.renderer.baseGrid.disabled = true;
		valueAxis.renderer.labels.template.disabled = true;
		valueAxis.cursorTooltipEnabled = false;

		chart.cursor = new am4charts.XYCursor();
		chart.cursor.lineY.disabled = true;

		let series = chart.series.push(new am4charts.ColumnSeries());
		series.tooltipText = "{date}: [bold]{value}";
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "value";
		series.strokeWidth = 0;
		series.fillOpacity = 0.5;
		series.columns.template.propertyFields.fillOpacity = "opacity";
		series.columns.template.fill = color;
		
		series.columns.template.events.on("hit", function(ev) {
			let series = ev.target.dataItem.valueY;
			console.log(series);
		});

		return chart;
	};

	const createPie = (data, color) => {
		let chart = container.createChild(am4charts.PieChart);
		chart.width = am4core.percent(10);
		chart.height = 100;

		chart.data = data;

		let pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "value";
		pieSeries.dataFields.category = "category";
		pieSeries.labels.template.disabled = true;
		pieSeries.ticks.template.disabled = true;
		pieSeries.slices.template.fill = color;
		pieSeries.slices.template.adapter.add("fill", function(fill, target) {
		  return fill.lighten(0.1 * target.dataItem.index);
		});
		pieSeries.slices.template.stroke = am4core.color("#fff");

		return chart;
	};

	createLine("AAPL (Price)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 57 },
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 27 },
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 24 },
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 59 },
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 33 },
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 46 },
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 20 },
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 42 },
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 59, "opacity": 1}
	], colors.getIndex(0));

	createColumn("AAPL (Turnover)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 22 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 25 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 40 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 35 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 1 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 15 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 33, "opacity": 1 }
	], colors.getIndex(0));

	createPie([
	{ "category": "Marketing", "value": 501 }, 
	{ "category": "Research", "value": 301 }, 
	{ "category": "Sales", "value": 201 }, 
	{ "category": "HR", "value": 165 }
	], colors.getIndex(0));

	createLine("MSFT (Price)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 22 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 25 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 40 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 35 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 1 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 15 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 33, "opacity": 1 }
	], colors.getIndex(1));

	createColumn("MSFT (Turnover)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 57 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 27 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 24 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 59 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 33 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 46 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 20 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 42 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 59, "opacity": 1 }
	], colors.getIndex(1));

	createPie([
	{ "category": "Marketing", "value": 130 }, 
	{ "category": "Research", "value": 450 }, 
	{ "category": "Sales", "value": 400 }, 
	{ "category": "HR", "value": 200 }
	], colors.getIndex(1));

	createLine("AMZN (Price)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 16 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 62 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 55 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 34 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 28 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 32 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 30, "opacity": 1 }
	], colors.getIndex(2));

	createColumn("AMZN (Turnover)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 50 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 51 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 62 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 60 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 25 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 20 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 70 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 42 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 33, "opacity": 1 }
	], colors.getIndex(2));

	createPie([
	{ "category": "Marketing", "value": 220 }, 
	{ "category": "Research", "value": 200 }, 
	{ "category": "Sales", "value": 150 }, 
	{ "category": "HR", "value": 125 }
	], colors.getIndex(2));

	createLine("FB (Price)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 52 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 55 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 35 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 34 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 39 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 42 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 22 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 15, "opacity": 1 }
	], colors.getIndex(3));

	createColumn("FB (Turnover)", [
	{ "date": new Date(2018, 0, 1, 8, 0, 0), "value": 20 }, 
	{ "date": new Date(2018, 0, 1, 9, 0, 0), "value": 20 }, 
	{ "date": new Date(2018, 0, 1, 10, 0, 0), "value": 25 }, 
	{ "date": new Date(2018, 0, 1, 11, 0, 0), "value": 26 }, 
	{ "date": new Date(2018, 0, 1, 12, 0, 0), "value": 29 }, 
	{ "date": new Date(2018, 0, 1, 13, 0, 0), "value": 27 }, 
	{ "date": new Date(2018, 0, 1, 14, 0, 0), "value": 25 }, 
	{ "date": new Date(2018, 0, 1, 15, 0, 0), "value": 32 }, 
	{ "date": new Date(2018, 0, 1, 16, 0, 0), "value": 30, "opacity": 1 }
	], colors.getIndex(3));

	createPie([
	{ "category": "Marketing", "value": 120 }, 
	{ "category": "Research", "value": 150 }, 
	{ "category": "Sales", "value": 125 }, 
	{ "category": "HR", "value": 250 }
	], colors.getIndex(3));
};
drawMixedCharts();