/**
 * 人物动画：
 * att_1, att_2,att_3,att_4
 * move, idle, att_sp 突擊
 */

const COM = require("common")
const ANI_GROUP = "normal"

cc.Class({
    extends: cc.Component,

    properties: {
        leftButton: cc.Node,
        rightButton: cc.Node,
    },

    onLoad() {
        this.dbDisplay = this.node.getChildByName("body").getComponent(dragonBones.ArmatureDisplay)
        cc.log(this.dbDisplay, 'dbDisplay')
        this.dbArmature = this.dbDisplay.armature()
        this._speed = 0
        this.moveSpeed = 15
        this._faceDir = 1 //脸部朝向 -1：左边， 1：右边
        this._State = COM.State.IDLE // 当前动画设置为待机
        this._onButton = false  // 按钮是否被按着
        this.setEvent(this.leftButton)
        this.setEvent(this.rightButton)
    },

    start() {

    },

    setEvent(node) {
        node.on("touchstart", this.touchStart, this)
        node.on("touchend", this.touchEnd, this)
        node.on("touchcancel", this.touchEnd, this)
    },

    touchStart(e) {
        this._onButton = true
        let name = e.target.name


        // 点击按钮播放跑步动画
        this.dbArmature.animation.fadeIn("move", -1, -1, 0, ANI_GROUP)

        switch (name) {
            case "left":
                this._faceDir = -1
                break;
            case "right":
                this._faceDir = 1
                break;
        }
        this._speed = this.moveSpeed * this._faceDir
        this.node.scaleX = - this._faceDir / 2
    },
    touchEnd() {
        this._onButton = false
        this._speed = 0
        this.dbArmature.animation.fadeIn("idle", -1, -1, 0, ANI_GROUP)
    },


    // 初始化角色
    init() {
        this.idleAni()
    },

    // 待机动画
    idleAni() {
        this._State = COM.State.IDLE // 当前动画设置为待机

    },
    move() {
        this.node.x += this._speed
    },
    update(dt) {
        if (this._speed != 0) {
            this.move(dt)
        }
    }

});
