//Aliases
var Container = PIXI.Container,
            autoDetectRenderer = PIXI.autoDetectRenderer,
            Text = PIXI.Text,
            Sprite = PIXI.Sprite;

//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
            renderer = autoDetectRenderer(64, 64);
document.getElementById("render-place").appendChild(renderer.view);

PIXI.loader
            .add("sprites/background_4_1.png")
            .add("sprites/rails.png")
            .add("sprites/train_main.png")
            .add("sprites/wagon.png")
            .add("sprites/gun.png")
            .load(setup);

var updatable_objects = [];

function setup() {
    var background = CreateBackground();
    stage.addChild(background);
    
    var rails = CreateRails();
    stage.addChild(rails);

    var wagon2 = CreateWagon(1);
    stage.addChild(wagon2);

    var wagon1 = CreateWagon(0);
    stage.addChild(wagon1);

    var train = CreateTrain();
    stage.addChild(train);

    var gun1 = CreateGun(0);
    stage.addChild(gun1);

    var gun2 = CreateGun(1);
    stage.addChild(gun2);

    var gun3 = CreateGun(2);
    stage.addChild(gun3);

    //Set the game state
    state = play;

    //Start the game loop
    gameLoop();
}

function gameLoop() {
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
    //Update the current game state
    state();
    //Render the stage
    renderer.render(stage);
}

function play() {
    // 1. Подвинуть снаряды, если такие есть
    // 2. Вычислить хиты, как вариант у объектов ставить флаг, который будет обрабатываться в update
    // 3. foreach объект на сцене - update
    updatable_objects.forEach(function(item, i, arr) {
        item.update();
    });
}


function CreateRails() {
    var rails = new Sprite(PIXI.loader.resources["sprites/rails.png"].texture);
    rails.position.set(0, 56);
    rails.fr_length = 3;

    rails.update = function(){
        this.x -= 1;
        if (this.x <= -this.fr_length) {
            this.x = 0;
        }
    }

    updatable_objects.push(rails);
    return rails;
}

function CreateBackground() {
    var background = new Sprite(PIXI.loader.resources["sprites/background_4_1.png"].texture);
    background.fr_length = 152;

    background.update = function(){
        this.x -= 1;
        if (this.x <= -this.fr_length) {
            this.x = 0;
        }
    }

    updatable_objects.push(background);
    return background;
}

function CreateTrain(){
    var train = new Sprite(PIXI.loader.resources["sprites/train_main.png"].texture);
    train.position.set(35, 45);

    train.update = function(){
    }

    updatable_objects.push(train);
    return train;   
}

function CreateWagon(index){
    var wagon = new Sprite(PIXI.loader.resources["sprites/wagon.png"].texture);
    wagon.y = 45;
    if (index == 0){
        wagon.x = 18; 
    } else {
        wagon.x = 1; 
    } 

    wagon.update = function(){
    }

    updatable_objects.push(wagon);
    return wagon;
}

function CreateGun(index){
    var gunHolder = new Sprite(PIXI.loader.resources["sprites/gun.png"].texture);
    gunHolder.y = 41;
    if (index == 0){
        gunHolder.x = 41;
        gunHolder.barrelbase_x = 44;
        gunHolder.barrelbase_y = 44;
    } else if(index == 1){
        gunHolder.x = 24;
        gunHolder.barrelbase_x = 27;
        gunHolder.barrelbase_y = 44;
    } else {
        gunHolder.x = 7;
        gunHolder.barrelbase_x = 10;
        gunHolder.barrelbase_y = 44;
    }

    var barrel = new PIXI.Graphics();
    stage.addChild(barrel);


    barrel.position.set(gunHolder.barrelbase_x, gunHolder.barrelbase_y);

    barrel.lineStyle(1, 0)
          .moveTo(0, 0)
          .lineTo(0, - 7);

    gunHolder.update = function(){
    }

    updatable_objects.push(gunHolder);
    return gunHolder;
}