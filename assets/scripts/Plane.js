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
        bullet1Prefab:{
            default:null,
            type:cc.Prefab
        },
        bullet2Prefab:{
            default:null,
            type:cc.Prefab
        },
        //1单颗子弹 2双颗子弹
        bulletType:2,
        bulletAudioClip:{
            default:null,
            url:cc.AudioClip
        },
        planeAudioClipBom:{
            url:cc.AudioClip,
            default:null
        },
        ufoAudioClipBom:{
            url:cc.AudioClip,
            default:null
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.schedule(this.sendBullet,0.2)

        this.regTouchEvent()
        
    },
    regTouchEvent(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            var delta=event.getDelta()
            this.node.x+=delta.x
            this.node.y+=delta.y
        })
    },
    sendBullet(){
        //播放子弹声音
        cc.audioEngine.play(this.bulletAudioClip)

        var bulletNode

        var bulletPos,planePos=this.node.position
        
        if(this.bulletType===1){
            bulletNode=cc.instantiate(this.bullet1Prefab)
            bulletPos=cc.p(planePos.x,planePos.y+92)
        }else if(this.bulletType===2){
            bulletNode=cc.instantiate(this.bullet2Prefab)
            bulletPos=cc.p(planePos.x,planePos.y+44)
        }

        bulletNode.position=bulletPos


        this.node.parent.addChild(bulletNode)

        // var up=cc.moveTo(0.5,bulletPos.x,cc.winSize.height/2)


        // var cb=cc.callFunc(()=>{

        //     bulletNode.destroy()

        // })

        // var seq=cc.sequence(up,cb)


        // bulletNode.runAction(seq)


    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {


        //是ufo，改变子弹状态
        if(other.node.name==='ufoPrefab'){
            var ufo=other.getComponent('Ufo')
            if(ufo.ufoType==='one'){
                this.bulletType=1
            }else if(ufo.ufoType==='two'){
                this.bulletType=2
            }
            var audioId=cc.audioEngine.play(this.ufoAudioClipBom)
            other.node.destroy()
           
            
        }else{
            var anim=this.getComponent(cc.Animation)
            anim.play('plane_bom')
            var audioId=cc.audioEngine.play(this.planeAudioClipBom)

            var p1=new Promise((resolve,reject)=>{

                anim.on('finished',resolve)

            })

            p1.then(()=>{
                //动画播放完毕，先把飞机隐藏了， 等待爆炸声音播放完毕。 不能调用节点移除方法， 要是调用了节点移除方法，那下面的gameOver方法就调用不了了
                this.node.active=false
            })

          
            var p2=new Promise((resolve,reject)=>{
                cc.audioEngine.setFinishCallback(audioId,resolve)
            })

        
            Promise.all([p1,p2]).then(()=>{
                var main=this.node.parent.getComponent('Main')
                main.gameOver()
            })
           
            this.unschedule(this.sendBullet)
        }

      

        
        
    },
    // update (dt) {},
});
