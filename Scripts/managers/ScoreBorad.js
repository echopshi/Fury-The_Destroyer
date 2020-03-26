"use strict";
var managers;
(function (managers) {
    class ScoreBorad {
        constructor() {
            // set up the labels
            this._livesLabelA = new objects.Label("Playe A: Health 99", "24px", "Times", "white", 100, 25, true);
            this._bulletLabelA = new objects.Label("Bullet 999", "24px", "Times", "white", 250, 25, true);
            this._livesLabelB = new objects.Label("Player B: Health 99", "24px", "Times", "white", 750, 25, true);
            this._bulletLabelB = new objects.Label("Bullet 999", "24px", "Times", "white", 900, 25, true);
            this._scoreLabelA = new objects.Label("Player A Score: 999", "24px", util.FONT_FAMILY, "white", 330, 200, true);
            this._scoreLabelB = new objects.Label("Player B Score: 999", "24px", util.FONT_FAMILY, "white", 630, 200, true);
            // initial values
            this._livesA = 0;
            this._livesB = 0;
            this._bulletsA = 0;
            this._bulletsB = 0;
            this._scoreA = 0;
            this._scoreB = 0;
            // assign values
            this.LivesA = util.GameConfig.PLAYER_A_LIVES;
            this.LivesB = util.GameConfig.PLAYER_B_LIVES;
            this.BulletsA = util.GameConfig.PLAYER_A_BULLETS;
            this.BulletsB = util.GameConfig.PLAYER_B_BULLETS;
            this.ScoreA = util.GameConfig.PLAYER_A_SCORE;
            this.ScoreB = util.GameConfig.PLAYER_B_SCORE;
        }
        // public properties
        get ScoreLabelA() {
            return this._scoreLabelA;
        }
        get ScoreLabelB() {
            return this._scoreLabelB;
        }
        get BulletLabelA() {
            return this._bulletLabelA;
        }
        get BulletLabelB() {
            return this._bulletLabelB;
        }
        get LivesLabelA() {
            return this._livesLabelA;
        }
        get LivesLabelB() {
            return this._livesLabelB;
        }
        get ScoreA() {
            return this._scoreA;
        }
        set ScoreA(v) {
            this._scoreA = v;
            util.GameConfig.PLAYER_A_SCORE = this._scoreA;
            this.ScoreLabelA.setText("Player A Score: " + this._scoreA);
        }
        get ScoreB() {
            return this._scoreB;
        }
        set ScoreB(v) {
            this._scoreB = v;
            util.GameConfig.PLAYER_B_SCORE = this._scoreB;
            this.ScoreLabelB.setText("Player B Score: " + this._scoreB);
        }
        get BulletsA() {
            return this._bulletsA;
        }
        set BulletsA(v) {
            this._bulletsA = v;
            util.GameConfig.PLAYER_A_BULLETS = this._bulletsA;
            this.BulletLabelA.setText("Bullet " + this.BulletsA);
        }
        get BulletsB() {
            return this._bulletsB;
        }
        set BulletsB(v) {
            this._bulletsB = v;
            util.GameConfig.PLAYER_B_BULLETS = this._bulletsB;
            this.BulletLabelB.setText("Bullet " + this.BulletsB);
        }
        get LivesA() {
            return this._livesA;
        }
        set LivesA(v) {
            this._livesA = v;
            util.GameConfig.PLAYER_A_LIVES = this._livesA;
            this.LivesLabelA.setText("Playe A: Health " + this._livesA);
        }
        get LivesB() {
            return this._livesB;
        }
        set LivesB(v) {
            this._livesB = v;
            util.GameConfig.PLAYER_B_LIVES = this._livesB;
            this.LivesLabelB.setText("Playe B: Health " + this._livesB);
        }
    }
    managers.ScoreBorad = ScoreBorad;
})(managers || (managers = {}));
//# sourceMappingURL=ScoreBorad.js.map