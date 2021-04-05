
// Handles the Dashboard panels
class Dashboard {
    constructor(viewer, panel, container, selectcontainer, property) {
        var _this = this;
        this._viewer = viewer;
        this._panel = panel;
        this._container = container;
        this._selectcontainer = selectcontainer;
        this._property = property;
        this._listcreated = false;
        _this.loadPanels();
    }

    loadPanels () {
        var _this = this;
        var data = new ModelData(this);
        data.init(function () {
            $('#'+_this._container).empty();
            if(_this._listcreated === false){
                _this.createList(Object.getOwnPropertyNames(data._modelData))
                _this.listcreated = true;
            }
            _this._panel.load(_this._container, viewer, data);
        });
    }

    createList(categories){
        var _this = this;
        let template = '<select id="'+_this._selectcontainer+'"'+' >';
        for (let index = 0; index < categories.length; index++) {
            if (categories[index] === _this._property) {
                template += '<option selected value="'+categories[index]+'">'+categories[index]+'</option>'
            } else {                
                template += '<option value="'+categories[index]+'">'+categories[index]+'</option>'
            }
        }
        template += '</select>';
        $('#'+_this._selectcontainer).html(template);
        $('#'+_this._selectcontainer).change(function() {
            console.log($('#'+_this._selectcontainer+' option:selected').text())
            _this._panel.loadWithCustomProperty($('#'+_this._selectcontainer+' option:selected').text())            
        });             
    }
}
