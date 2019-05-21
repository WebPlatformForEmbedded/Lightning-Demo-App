export default class Menu extends lng.Component{

    static _template(){
        return {
            flex:{
                direction: "row"
            }
        }
    }

    _init(){
        this._index = 0;
        this.patch({
            Movies:{
                type: MenuItem, item:{label:"Movies", ref:"Movies"}
            }
        });

        const shows = this.stage.c({
            type: MenuItem, item:{label:"Series", ref:"TvShows"}
        });

        this.childList.add(shows);
    }

    get items(){
        return this.children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleLeft(){
        if(this._index > 0){
            this.setIndex(this._index - 1)
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this.setIndex(this._index + 1)
        }
    }

    setIndex(index){
        this._index = index;
    }

    _getFocused(){
        return this.active;
    }

    _handleEnter(){
        this.signal("select",{item:this.active.item});
    }
}

class MenuItem extends lng.Component{
    static _template(){
        return {
            text:{fontSize:40, fontFace:"verdana"}, flexItem: {
                marginRight:30
            }
        }
    }

    set item(v){
        this._item = v;
        this.text.text = v.label;
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.2);
    }

    _unfocus(){
        this.setSmooth("scale",1);
    }
}