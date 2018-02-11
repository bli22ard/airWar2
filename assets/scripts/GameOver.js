// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var global=require('Global')
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
        ogLabel:{
            default:null,
            type:cc.Label
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        gameOverAudioClip:{
            url:cc.AudioClip,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        cc.audioEngine.play(this.gameOverAudioClip)
        this.scoreLabel.string=global.getScore()
        var down=cc.moveTo(0.5,0,0).easing(cc.easeIn(3.0));
        this.ogLabel.node.runAction(down)

    },
    restartGame(event){



        var labelNode=event.target.getChildByName('Label')
        
        var label=labelNode.getComponent(cc.Label)

        if(label.string==='重新开始'){
            label.string='加载中'
            cc.director.loadScene('main_scene')
        }

        
        
        
    },
    exit(){
        cc.director.end()
    }

    // update (dt) {},
});
