import App from "../App.js";

export default class Splash extends lng.Component{

    static _template(){
        return {
            Background:{
                src:App.getPath("background.png")
            },
            GrayBackdrop:{
                src:App.getPath("gradient.png"), scale:1.1, w:1920, h:1080, y: 1000, x:200, rotation: -0.3
            },
            Logo:{
                src:App.getPath("movies-tv-logo.png"), y: 714, x:1100, rotation: -0.3
            }
        };
    }

    _init(){
        this._setState("Loading");
        this._createAnimations();
        this._register();
    }

    _createAnimations(){
        this._reveal = this.animation({
            duration:1.3, repeat: 0, delay:1, actions:[
                {t:'Background', p:'y', v:{0.20:0,1:-550}},
                {t:'GrayBackdrop', p:'rotation', v:{0:-0.3,1:0}},
                {t:'GrayBackdrop', p:'scale', v:{0.6:1.1,1:1}},
                {t:'GrayBackdrop', p:'y', v:{0:1000,1:0}},
                {t:'GrayBackdrop', p:'x', v:{0:200,1:0}},
                {t:'Logo', p:'y', v:{0:714,1:-400}},
                {t:'Logo', p:'rotation', v:{0:-0.3,1:-0}},
            ]
        });
    }

    _register(){
        this._reveal.on("finish",()=>{
            this.signal("animationFinished");
        });
    }

    startAnimation(){
        this._start();
    }

    static _states(){
        return [
            class Loading extends this{
                _start(){
                    this._reveal.start();
                }
            },
            class Error extends this{
                $enter(){
                    // signal error & retry
                }
                $exit(){
                    // signal that we exit Error state
                }
            }
        ];
    }
}