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
        enemy1AudioBom:{
            url:cc.AudioClip,
            default:null
        },
        enemy2AudioBom:{
            url:cc.AudioClip,
            default:null
        }

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    action(target){
        
        var anim=this.getComponent(cc.Animation)
        var enemy=this.getComponent('Enemy')
        enemy.life--
        var life=enemy.life
        var animPrefix,p

        var lifeNode=this.node.getChildByName('life')


        if(lifeNode){
            p=lifeNode.getComponent(cc.ProgressBar)
        }
        
        
        if(enemy.type==='enemy1'){
            animPrefix='enemy'       
        }else if(enemy.type==='enemy2'){
            animPrefix='enemy2'
        }
        
        if(life<=0){
            //有血条时候处理，无血条不处理
            if(p){
                p.progress=0
            }
            this.node.removeComponent(cc.PolygonCollider)
            
            anim.on('finished',()=>{
                this.node.destroy()
    
            },this)
            var audioClipBom
            if(enemy.type==='enemy1'){
                audioClipBom=this.enemy1AudioBom
            }else if(enemy.type==='enemy2'){
                audioClipBom=this.enemy2AudioBom
            }

            if(audioClipBom){
                cc.audioEngine.play(audioClipBom)
            }
           

            global.updateScore(1)
              //飞机爆炸
            anim.play(animPrefix+'_bom')
            
        }else{
           
            p.progress=life/10
            anim.play(animPrefix+'_hit')
        }
       

    }


    // update (dt) {},
});
