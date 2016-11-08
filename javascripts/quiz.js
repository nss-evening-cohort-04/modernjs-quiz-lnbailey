'use strict';

// Parent Class
class Robot {
    constructor(name){
        this.name = name;
    }

    getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRobotType(){
        return this.robotType;
    }

    getSpecialWeapon(){
        return this.specialWeapon;
    }

    getName(){
        return this.name;
    }

    getHealth(){
        return this.health;
    }

    setHealth(val){
        this.health = val;
    }

    getTerrain(){
        return this.terrain;
    }

    getSpecialAttack(){
        return this.specialAttack;
    }

    getHealHealth(){
        return this.healHealth;
    }

    getRandomAttack(){
        return this.getRandomInt(20, 40);
    }

}


//Child Classes
class Drone extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Air';
        this.robotType = 'Drone';
        this.health = this.getRandomInt(100, 200);
        this.specialAttack = 100;
        this.healHealth = 30;
        this.specialWeapon = 'The Drone Attack';
    }
}


class SpaceShip extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Space';
        this.robotType = 'SpaceShip';
        this.health = this.getRandomInt(200, 300);
        this.specialAttack = 30;
        this.healHealth = 40;
        this.specialWeapon = 'The Space Ship Laser';
    }
}


class Bipedal extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Ground';
        this.robotType = 'Bipedal';
        this.health = this.getRandomInt(300, 500);
        this.specialAttack = 40;
        this.healHealth = 50;
        this.specialWeapon = 'The Bipedal Kick';

    }

}

class ATVLava extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Lava';
        this.robotType = 'ATVLava';
        this.health = this.getRandomInt(250, 400);
        this.specialAttack = 20;
        this.healHealth = 70;
        this.specialWeapon = 'Melting the Enemy in Lava';

    }
}

class Submarine extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Water';
        this.robotType = 'Submarine';
        this.health = this.getRandomInt(350, 750);
        this.specialAttack = 70;
        this.healHealth = 93;
        this.specialWeapon = 'The Submarine Torpedos';




    }
}

class HoverCar extends Robot {
    constructor(name){
        super(name);
        this.terrain = 'Mid-Air';
        this.robotType = 'HoverCar';
        this.health = this.getRandomInt(350, 450);
        this.specialAttack = 93;
        this.healHealth = 20;
        this.specialWeapon = 'The Blow Wind Tornado';
    }
}


//Application Starts after DOM is loaded.
$(function(){
    var player1, player2;//player variables

    let _startGame = () =>{
        if(player1 && player2){
            $('button').prop('disabled', false);
        }
    };

    let _initializeRobot = (e, player) =>{//start each robot type after user selects a type.
        let thisRobot;
        let name = player === 1 ? $('#name1').val() : $('#name2').val();
        let robotType = $(e.currentTarget).val();

        if(robotType === 'Drone'){
            thisRobot = new Drone(name);
        }else if(robotType === 'SpaceShip'){
            thisRobot = new SpaceShip(name);
        }else if(robotType === 'Bipedal'){
            thisRobot = new Bipedal(name);
        }else if(robotType === 'ATVLava'){
            thisRobot = new ATVLava(name);
        }else if(robotType === 'Submarine'){
            thisRobot = new Submarine(name);
        }else if(robotType === 'HoverCar'){
            thisRobot = new HoverCar(name);
        }

        //update the DOM
        if(player === 1){
            $('#player1Name').html(thisRobot.getName());
            $('#player1Health').html(thisRobot.getHealth());
            $('#player1Terrain').html(thisRobot.getTerrain());
            $('#player1specialWeapon').html(thisRobot.getSpecialWeapon());
            $('#player1img').html(`<img src="images/${thisRobot.getRobotType()}.png" class="img-circle" style="position:absolute;left:100px;" width="304" height="236">`);


        }else{
            $('#player2Name').html(thisRobot.getName());
            $('#player2Health').html(thisRobot.getHealth());
            $('#player2Terrain').html(thisRobot.getTerrain());
            $('#player2specialWeapon').html(thisRobot.getSpecialWeapon());
            $('#player2img').html(`<img src="images/${thisRobot.getRobotType()}.png" class="img-circle" style="position:absolute;right:100px;" width="304" height="236">`);

        }
        return thisRobot;
    };



    let _checkGameOver = () =>{
        let msg;
        $('#boom').show();

        setTimeout(function(){
            $('#boom').hide('slow');
        }, 3000);


        if(player1.getHealth() <= 0 && player2.getHealth() > 0){//player 1 dead
            msg = `${player1.getName()} is Dead. Player ${player2.getName()} wins with ${player2.getRobotType()} using the ${player2.getSpecialWeapon()}`;
        }else if(player2.getHealth() <= 0 && player1.getHealth() > 0){//player 2 dead
            msg = `${player2.getName()} is Dead. Player ${player1.getName()} wins with ${player1.getRobotType()} using the ${player1.getSpecialWeapon()}`;
        }else if(player1.getHealth() <= 0 && player2.getHealth() <= 0){ //both players dead.
            msg = `${player1.getName()} and ${player2.getName()} are both dead. ${player1.getRobotType()} used its ${player1.getSpecialWeapon()} and ${player2.getRobotType()} used its ${player2.getSpecialWeapon()} `;
        }

        if(msg){
            setTimeout(function(){ //set time out so that alert appears after DOM is updated with actual health value.
                $('#modalGameOver').modal({show: true});
                $('#gameOverResult').html(`${msg}.`);
            }, 0);

        }
    };

    //event listener for change of robot type.
    $('#name1select').change(function(e){
        player1 = _initializeRobot(e, 1);
        _startGame();

    });

    $('#name2select').change(function(e){
        player2 = _initializeRobot(e, 2);
        _startGame();

    });

    $('#playAgain').click(function(){
        location.reload();
    });


    //attack button function
    $('#attackBtn').click(function(){
        let attackLevel1 = player1.getRandomAttack();
        let attackLevel2 = player2.getRandomAttack();
        let player1Health = player1.getHealth() - attackLevel2;
        let player2Health = player2.getHealth() - attackLevel1;
        player1.setHealth(player1Health);
        $('#player1Health').html(player1.getHealth());
        player2.setHealth(player2Health);
        $('#player2Health').html(player2.getHealth());
        _checkGameOver();
    });

});









