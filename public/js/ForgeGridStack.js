$(document).ready(function () {

let ForgeStacks = [
    {type:'viewer',node: {x: 0,y: 0,w: 8,h: 5},    
    function:'launchViewer',arguments:{urn:'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2Utc3RhY2tzL0NhciUyMFNlYXQuZHdm'}},
    
    {type:'piechart',node: {w: 3,h: 3},
    function:'drawPieChart',arguments:{defaultproperty:'Material'}},
    
    {type:'barchart',node: {w: 3,h: 3},
    function:'drawBarChart',arguments:{defaultproperty:'Material'}}
]
$(".addwidget").click(function(){
    let info = getInfoBYType($(this).attr('data-type'));
    console.log(info)
    addNewWidget(info)
  });

  function getInfoBYType(type) {
      for (let index = 0; index < ForgeStacks.length; index++) {
        if(ForgeStacks[index].type === type) return ForgeStacks[index];          
      }
  }
    let options = { // put in gridstack options here
    disableOneColumnMode: true, // for jfiddle small window size
    float: false
  };
  let grid = GridStack.init(options);  
  
  addNewWidget = function (info) {
    info.node.content = getContent(info);
    grid.addWidget(info.node);
    executeFunctionByName(info.function,window,info.arguments);
    return false;
  };
let uniqueid;
  function getContent(info) {
      uniqueid = UUID.generate()
      switch (info.type) {
          case 'viewer':
            info.arguments.container = uniqueid+'forgeViewer';
            return '<div id="'+uniqueid+'forgeViewer"></div>';
          case 'piechart':
          case 'barchart':
            info.arguments.selectchart = uniqueid+'selectchart';
            info.arguments.dashboard = uniqueid+'dashboard';
            return '<div id="'+uniqueid+'selectchart"></div><div id="'+uniqueid+'dashboard"></div>';
          default:
              break;
      }
  }


function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }
});
function drawPieChart(data) {
    new Dashboard(NOP_VIEWER, new PieChart(data.defaultproperty),data.dashboard,data.selectchart,data.defaultproperty)
}
function drawBarChart(data) {
    new Dashboard(NOP_VIEWER, new BarChart(data.defaultproperty),data.dashboard,data.selectchart,data.defaultproperty)
}

let UUID = (function() {
    let self = {};
    let lut = []; for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
      let d0 = Math.random()*0xffffffff|0;
      let d1 = Math.random()*0xffffffff|0;
      let d2 = Math.random()*0xffffffff|0;
      let d3 = Math.random()*0xffffffff|0;
      return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    }
    return self;
  })();