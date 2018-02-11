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
        bg1:{
            default:null,
            type:cc.Sprite
        },
        bg2:{
            default:null,
            type:cc.Sprite
        },
        speed:0,
        enemyPrefab:{
            default:null,
            type:cc.Prefab
        },
        enemy2Prefab:{
            default:null,
            type:cc.Prefab
        },
        ufoPrefab:{
            default:null,
            type:cc.Prefab
        },
        enemyLayer:{
            default:null,
            type:cc.Node
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        bgAudioClip:{
            default:null,
            url: cc.AudioClip,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //开启碰撞系统
        cc.director.getCollisionManager().enabled = true
      //  cc.director.getCollisionManager().enabledDebugDraw  = true
      //  cc.director.getCollisionManager().enabledDrawBoundingBox = true
       
        
        //把分数label 放入全局变量
        var global=require('Global')
        global.scoreLabel=this.scoreLabel
        
        this.schedule(this.genEnemy,0.4)
        this.schedule(this.genUfo,30)
    
        this.playBgMusic()
        
    },
    playBgMusic(){
        cc.audioEngine.play(this.bgAudioClip,true)
    },
    genUfo(){
        var ufoPrefab=cc.instantiate(this.ufoPrefab)
        

        var ufo=ufoPrefab.getComponent('Ufo')
        var random=Math.floor(Math.random()*2)

        ufo.init(random==0?'two':'one')
        ufo.addToEnemyLayer(this.enemyLayer)
    },

    genEnemy(){
        var random=Math.random()*10+1
        random=Math.floor(random)
        var prefab=this.enemyPrefab
            if(random>9){
             prefab=this.enemy2Prefab
        }
    
        var enemyPrefab=cc.instantiate(prefab)

        var enemy=enemyPrefab.getComponent('Enemy')

        enemy.gen(this)
    },

    gameOver(){
        this.unschedule(this.genEnemy)
        cc.audioEngine.stopAll()
        cc.director.loadScene('game_over_scene')
    },
    pause(){
        cc.director.pause()
    },

    update (dt) {
        var S=this.speed*dt

        this.bg1.node.y-=S;
        this.bg2.node.y-=S;

        if(this.bg1.node.y+this.bg1.node.height-30<=0){

            var y=this.bg2.node.y-this.bg1.node.y
            this.bg1.node.y=this.bg2.node.y+y
            var tmp=this.bg1
            this.bg1=this.bg2
            this.bg2=tmp


        }

        


     },
     
});
