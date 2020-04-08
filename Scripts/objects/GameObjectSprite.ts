module objects {
    /**
     * Class for Game Object Sprite
     *
     * @export
     * @abstract
     * @class GameObjectSprite
     * @extends {createjs.Sprite}
     */
    export abstract class GameObjectSprite extends createjs.Sprite {
        // PRIVATE INSTANCE MEMBERS
        private _width: number;
        private _height: number;
        private _halfWidth: number;
        private _halfHeight: number;
        private _position: Vector2;
        private _velocity: Vector2;
        private _isColliding: boolean;
        private _isCentered: boolean;
        private _isActive: boolean;

        // PUBLIC PROPERTIES
        // getters and setters
        get width(): number {
            return this._width;
        }

        set width(newWidth: number) {
            // set width and half width
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }

        get height(): number {
            return this._height;
        }

        set height(newHeight: number) {
            // set height and half height
            this._height = newHeight;
            this._halfHeight = this._computeHalfHeight();
        }

        get halfWidth(): number {
            return this._halfWidth;
        }

        get halfHeight(): number {
            return this._halfHeight;
        }

        get position(): Vector2 {
            return this._position;
        }

        set position(newPosition: Vector2) {
            // set position along with x and y
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        get velocity(): Vector2 {
            return this._velocity;
        }

        set velocity(newVelocity: Vector2) {
            this._velocity = newVelocity;
        }

        get isColliding(): boolean {
            return this._isColliding;
        }

        set isColliding(newState: boolean) {
            this._isColliding = newState;
        }

        get isCentered(): boolean {
            return this._isCentered;
        }

        set isCentered(newState: boolean) {
            // center an object
            this._isCentered = newState;
            if (newState) {
                this._centerGameObject();
            }
        }

        public get isActive(): boolean {
            return this._isActive;
        }

        public set isActive(v: boolean) {
            this._isActive = v;
        }

        // CONSTRUCTOR
        /**
         * Creates an instance of Game Object Sprite
         * @param {createjs.SpriteSheet} [first]
         * @param {string} [second]
         * @param {Vector2 | number} [third]
         * @param {boolean | number} [fourth]
         * @param {boolean} [fifth]
         * @memberof GameObjectSprite
         */
        constructor(sprite_sheet?: createjs.SpriteSheet, frame_name?: string, x?: number, y?: number, centered?: boolean)
        constructor(sprite_sheet: createjs.SpriteSheet, frame_name: string, position: objects.Vector2, centered?: boolean)
        constructor(first: createjs.SpriteSheet, second: string = "placeholder", third: Vector2 | number = 0, fourth: boolean | number = 0, fifth: boolean = false) {
            super(first, second);

            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new Vector2(0, 0, this);
            this._velocity = new Vector2(0, 0);
            this._isColliding = false;
            this._isCentered = false;
            this._isActive = false;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            // depends on the type of value for fifth, perform different function
            if (fifth != undefined) {
                this.isCentered = fifth;
            }

            // depends on the type of value for fourth, perform different function
            if (typeof fourth == "boolean") {
                this.isCentered = fourth;
            }

            // depends on the type of value for third and fourth, perform different function
            if ((typeof third == "number") && (typeof fourth == "number")) {
                this.position = new Vector2(third, fourth, this);
            }

            // depends on the type of value for third, perform different function
            if (third instanceof Vector2) {
                this.position = third;
            }
        }

        // PRIVATE METHODS
        /**
         * Method for calculating half width
         *
         * @private
         * @returns {number}
         * @memberof GameObjectSprite
         */
        private _computeHalfWidth(): number {
            return this.width * 0.5;
        }

        /**
         * Method for calculating half height
         *
         * @private
         * @returns {number}
         * @memberof GameObjectSprite
         */
        private _computeHalfHeight(): number {
            return this.height * 0.5;
        }

        /**
         * Method for centering an object
         *
         * @private
         * @memberof GameObjectSprite
         */
        private _centerGameObject(): void {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }

        /**
         * Abstract method for checking its bounds
         *
         * @protected
         * @abstract
         * @memberof GameObjectSprite
         */
        protected abstract _checkBounds(): void;

        // PUBLIC METHODS
        // Life Cycle Methods
        /**
         * This method is used for initialization
         *
         * @abstract
         * @memberof GameObjectSprite
         */
        public abstract Start(): void;

        /**
         * This method is used to update all child objects
         *
         * @abstract
         * @memberof GameObjectSprite
         */
        public abstract Update(): void;

        /**
         * This method is used to reset elements
         *
         * @abstract
         * @memberof GameObjectSprite
         */
        public abstract Reset(): void;
    }
}