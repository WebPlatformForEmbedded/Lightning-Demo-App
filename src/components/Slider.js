import SliderItem from "./SliderItem.js";

export default class Slider extends lng.Component {
    static _template(){
        return {
            alpha: 0.5,
            Title:{
                text:{text:"", fontSize:40, fontFace:"verdana"}
            },
            Items:{
                y:100
            }
        }
    }

    set data(v){
        const {label, data} = v;
        this.patch({
            Title:{
                text:{text:label.toUpperCase()}
            },
            Items:{
                children: data.map((item, idx)=>{
                    return {type: SliderItem, x:idx*350, item:item, scale:0.9}
                })
            }
        });
    }

    _init(){
        this._index = 0;
    }

    _focus(){
        this.setSmooth("alpha",1);
        this._setState("Expanded");
        this._setIndex();
    }

    _unfocus(){
        this.setSmooth("alpha",0.5);
        this._setState("Collapsed");
    }

    get items(){
        return this.tag("Items").children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleLeft(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        }
    }

    _handleEnter(){
        this.fireAncestors("$onItemSelect",{item:this.active.item});
    }

    _setIndex(index=this._index){
        this._index = index;
        this.patch({
            Items:{
                smooth:{x: !index?0:(index*-440)}
            }
        });
    }

    _getFocused(){
        return this.active;
    }


    static _states(){
        return [
            class Expanded extends this{
                $enter(){
                    this.setSmooth("alpha",1);
                    this.items.forEach((item, idx)=>{
                        item.patch({
                            smooth:{
                                x: [idx * 440, {duration:0.3, delay:idx*0.04}],
                                scale: 1
                            }
                        });
                    });
                }
            },
            class Collapsed extends this{
                $enter(){
                    this.setSmooth("alpha",0.5);
                    this.items.forEach((item, idx)=>{
                        item.patch({
                            smooth:{
                                x: [idx * 350, {duration:0.3, delay:idx*0.03}],
                                scale: 0.9
                            }
                        });
                    });
                }
            }
        ]
    }
}
