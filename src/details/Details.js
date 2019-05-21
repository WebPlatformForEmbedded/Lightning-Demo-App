import App from "../App.js";

export default class Details extends lng.Component{

    static _template(){
        return {
            rect: true, w: 1920, h: 1080, color: 0xff000000,
            Blur: {
                type: lng.components.FastBlurComponent, amount: 0, w: 1920, h:1080,
                transitions:{
                    amount:{duration:2.1, delay:0.4},
                    alpha:{duration:1, delay:2.5}
                },
                content:{
                    Background:{
                        w: 1920, h: 1080
                    }
                }
            },
            Details:{
                x: 250, y: 300, flex:{direction:"row"}, w: 1000, alpha: 0,
                Poster:{
                    flexItem:{
                        marginRight: 150
                    }
                },
                Metadata:{
                    flex: {
                        direction: "column"
                    },
                    Title:{
                        w: 900, text:{fontFace:"RobotoRegular", fontSize:51, lineHeight:50},
                    },
                    Year:{
                        w: 900,  text:{fontFace:"RobotoRegular", fontSize:28, lineHeight:50}
                    },
                    Info:{
                        w: 700, text:{fontFace:"RobotoRegular", fontSize:39, lineHeight:60}
                    }
                }
            }

        }
    }

    _init(){
        this._blur  = this.tag("Blur").content;

        this._events = {
            showDetails: ()=>{
                const amount = this.tag("Blur").amount;
                if(amount === 3){
                    this.tag("Details").patch({
                        smooth:{
                            alpha: 1, y: 150
                        }
                    });
                }
            }
        };

        this._register();
    }

    _register(){
        this._blur.tag("Background").on("txLoaded", (e)=>{
            this.signal("detailsLoaded");
        });

        this._blur.tag("Background").on("txError", (e)=>{
            this._blur.tag("Background").texture = null;
            this.signal("detailsLoaded");
        });

        this.tag("Blur").transition("amount").on("finish",this._events.showDetails);
    }

    set asset(v){
        this._asset = v;
        this._updateDetails(v);
        this._blur.tag("Background").src = App.getPath(`${v.path}/backdrop.jpg`)

    }

    _updateDetails({path, cast, title, year, info}){
        this.patch({
            Details:{
                Poster:{
                    src: App.getPath(`${path}/posterS.jpg`)
                },
                Metadata:{
                    Title:{text:{text:title}},
                    Year:{text:{text:`released: ${year}`}},
                    Info:{text:{text:info}}
                }
            }
        });
    }

    _focus() {
        this.tag("Blur").patch({
            smooth:{
                amount:3,
                alpha: 0.4
            }
        });
    }

    _unfocus(){
        this.patch({
            Blur:{
                smooth:{
                    amount:0,
                    alpha: 1
                }
            },
            Details:{
                smooth:{
                    alpha: 0,
                    y: 300
                }
            }

        });
    }
}