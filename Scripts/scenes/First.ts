module scenes {
  export class First extends objects.Scene {
    // PRIVATE INSTANCE MEMEBERS
    background: objects.Image;
    playerA: objects.Player;
    playerB: objects.Player;
    playerAHealthLabel: objects.Label;
    playerABulletLabel: objects.Label;
    playerBHealthLabel: objects.Label;
    playerBBulletLabel: objects.Label;
    bulletAList: objects.Bullet[] = [];
    bulletBList: objects.Bullet[] = [];

    // PUBLIC PROPERTIES
    public keyPressedStates: boolean[]; // to detect which keys are down

    // CONTRUCTOR
    constructor() {
      super();

      this.keyPressedStates = [];
      this.background = new objects.Image(
        util.BACKGROUND_PATH_GAME,
        0,
        0,
        util.STAGE_W,
        util.STAGE_H,
        false
      );
      // player A
      this.playerA = new objects.Player(
        util.PALYER_A_SUBMARINE,
        util.PLAYER_A_POS.x,
        util.PLAYER_A_POS.y
      );
      this.playerAHealthLabel = new objects.Label(
        "Playe A: Health " + this.playerA.health,
        "24px",
        "Times",
        "white",
        100,
        25,
        true
      );
      this.playerABulletLabel = new objects.Label(
        "Bullet " + this.playerA.bulletNum,
        "24px",
        "Times",
        "white",
        250,
        25,
        true
      );
      // player B
      this.playerB = new objects.Player(
        util.PALYER_B_SUBMARINE,
        util.PLAYER_B_POS.x,
        util.PLAYER_B_POS.y
      );
      this.playerBHealthLabel = new objects.Label(
        "Player B: Health " + this.playerB.health,
        "24px",
        "Times",
        "white",
        750,
        25,
        true
      );
      this.playerBBulletLabel = new objects.Label(
        "Bullet " + this.playerB.bulletNum,
        "24px",
        "Times",
        "white",
        900,
        25,
        true
      );

      // selectedd weapon type
      this.playerA.weaponType = "normal";
      this.playerB.weaponType = "normal";

      this.Start();
    }

    // PUBLIC METHODS
    public Start(): void {
      this.addChild(this.background);
      this.addChild(this.playerA);
      this.addChild(this.playerAHealthLabel);
      this.addChild(this.playerABulletLabel);
      this.addChild(this.playerB);
      this.addChild(this.playerBHealthLabel);
      this.addChild(this.playerBBulletLabel);
      this.Main();
    }

    public Update(): void {
      // detect keys to make movement
      this.detectPressedKeys();
      // detect the bullet collision
      this.detectBulletCollision(this.bulletAList, this.playerB);
      this.detectBulletCollision(this.bulletBList, this.playerA);

      // detect bullet collision with each other
      this.detectDestructablesBulletCollision(
        this.bulletAList,
        this.bulletBList
      );

      // update health and bullet label
      this.detectPlayerHealth();
      this.detectPlayersBullet();
    }

    public Main(): void { }

    detectPressedKeys(): void {
      if (this.keyPressedStates[util.Key.UP]) {
        this.playerB.moveUp();
      } else if (this.keyPressedStates[util.Key.DOWN]) {
        this.playerB.moveDown();
      }
      if (this.keyPressedStates[util.Key.LEFT]) {
        this.playerB.moveLeft();
      } else if (this.keyPressedStates[util.Key.RIGHT]) {
        this.playerB.moveRight();
      }
      if (this.keyPressedStates[util.Key.W]) {
        this.playerA.moveUp();
      } else if (this.keyPressedStates[util.Key.S]) {
        this.playerA.moveDown();
      }
      if (this.keyPressedStates[util.Key.A]) {
        this.playerA.moveLeft();
      } else if (this.keyPressedStates[util.Key.D]) {
        this.playerA.moveRight();
      }
    }

    public detectShootingEvent(): void {
      // shoot key for player A
      if (this.keyPressedStates[util.Key.C]) {
        if (this.children.indexOf(this.playerA) !== -1) {
          let aim = objects.Vector2.right();
          let bulletsA = this.playerA.shoot(util.PLAYER_A_BULLET, aim);
          this.playerABulletLabel.setText("Bullet " + this.playerA.bulletNum);
          if (bulletsA) {
            bulletsA.forEach(b => {
              this.bulletAList.push(b);
              this.addChild(b);
            });
          }
        }
      }

      // shoot key for player B
      if (this.keyPressedStates[util.Key.M]) {
        if (this.children.indexOf(this.playerB) !== -1) {
          // aim specifies the direction of shooting
          let aim = objects.Vector2.left();
          let bulletsB = this.playerB.shoot(util.PLAYER_B_BULLET, aim);
          this.playerBBulletLabel.setText("Bullet " + this.playerB.bulletNum);
          if (bulletsB) {
            bulletsB.forEach(b => {
              this.bulletBList.push(b);
              this.addChild(b);
            });
          }
        }
      }
    }

    detectBulletCollision(
      bullets: objects.Bullet[],
      target: objects.Player
    ): void {
      for (let i = 0; i < bullets.length; i++) {
        managers.Collision.AABBCheck(bullets[i], target);

        if (target.isColliding) {
          let healthA = this.playerA.health;
          let healthB = this.playerB.health;

          this.removeChild(bullets[i]); // remove the bullet from the stage
          bullets.splice(i, 1); // remove the bullet from the list

          // update player health
          target.health -= 1;
          this.playerAHealthLabel.setText(
            "Playe A: Health " + this.playerA.health
          );
          this.playerBHealthLabel.setText(
            "Playe B: Health " + this.playerB.health
          );

          // update player score;
          if (
            healthA == this.playerA.health &&
            healthB - 1 == this.playerB.health
          ) {
            util.GameConfig.PLAYER_A_SCORE += 10;
          } else if (
            healthA - 1 == this.playerA.health &&
            healthB == this.playerB.health
          ) {
            util.GameConfig.PLAYER_B_SCORE += 10;
          }
        } else if (
          bullets[i].x + bullets[i].halfWidth >= util.STAGE_W ||
          bullets[i].x <= bullets[i].halfWidth
        ) {
          // simplying check the left and right border
          this.removeChild(bullets[i]);
          bullets.splice(i, 1); // remove the bullet from the list
        }
      }
    }


    detectDestructablesBulletCollision(
      destructableA: objects.Bullet[],
      destructableB: objects.Bullet[]
    ): void {
      for (let i = 0; i < destructableA.length; i++) {
        for (let j = 0; j < destructableB.length; j++) {
          managers.Collision.AABBCheck(destructableA[i], destructableB[j]);
          if (destructableB[j].isColliding) {
            this.removeChild(destructableA[i]); // remove the bullet from the stage
            destructableA.splice(i, 1); // remove the bullet from the list
            this.removeChild(destructableB[j]); // remove the bullet from the stage
            destructableB.splice(j, 1); // remove the bullet from the list
          }
        }
      }
    }

    detectPlayersBullet(): void {
      if (
        this.playerA.bulletNum == 0 &&
        this.playerB.bulletNum == 0 &&
        this.bulletAList.length == 0 &&
        this.bulletBList.length == 0
      ) {
        //util.GameConfig.SCENE_STATE = scenes.State.END;
        util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
      }
    }

    detectPlayerHealth(): void {
      if (this.playerA.health <= 0 || this.playerB.health <= 0) {
        //util.GameConfig.SCENE_STATE = scenes.State.END;
        util.GameConfig.SCENE_STATE = scenes.State.STAGECLEANED;
      }
    }
  }
}
