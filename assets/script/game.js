const COM = require("common")

cc.Class({
    extends: cc.Component,

    properties: {
        mainCamera: cc.Node
    },

    onLoad() {
        this.hero = this.node.getChildByName("hero")
        this.boundary = 1650
    },

    updateCamera() {
        let x = this.hero.x
        this.mainCamera.x = x
    },


    update() {
        this.updateCamera()

    },

});
