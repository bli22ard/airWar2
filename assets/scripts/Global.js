var global={

    score:0,
    addScore(v){
        this.score+=v
        
    },

    updateScore(v){
        this.addScore(v)
        this.scoreLabel.string=this.getScore()
    },

    getScore(){
        return "Score:"+this.score
    },
    scoreLabel:null


}

module.exports=global