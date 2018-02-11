

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

        enemyType:{
            default:[],
            type:cc.SpriteFrame
        },
        life:0,
        type:''

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    gen(main){
        var enemeyLayerNode=cc.find('Canvas/enemy_layer')
        enemeyLayerNode.addChild(this.node)

        var width=cc.winSize.width

        var y=cc.winSize.height/2

        var x=width/2

        this.node.x=(-x)+Math.random()*width
        var _y=this.node.height/2
        this.node.y=y+_y


        var moveTime=2.5

        if(this.type==='enemy2'){
            moveTime=4.5
        }

        var down=cc.moveTo(moveTime,this.node.x,-y-_y)

        var seq=cc.sequence(down,cc.callFunc(()=>{
            this.node.destroy()
        }))


        this.node.runAction(seq)


    },


 

    start () {

    },

    // update (dt) {},
});
