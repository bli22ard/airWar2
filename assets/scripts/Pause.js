// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        spriteFames:{
            default:[],
            type:cc.SpriteFrame

        },
        state:'pause',
        pauseAudioClip:{
            url:cc.AudioClip,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    pauseClick(){
        var sprite=this.getComponent(cc.Sprite)
        if(this.state==='pause'){
            cc.director.pause()
            sprite.spriteFrame=this.spriteFames[1]
            this.state='resume'
            var audioID=cc.audioEngine.play(this.pauseAudioClip)

            cc.audioEngine.setFinishCallback(audioID,()=>{
                cc.audioEngine.pauseAll()
            })

            
        }else if(this.state==='resume'){
            cc.director.resume();
            sprite.spriteFrame=this.spriteFames[0]
            this.state='pause'
            cc.audioEngine.resumeAll()

        }
    }

    // update (dt) {},
});
