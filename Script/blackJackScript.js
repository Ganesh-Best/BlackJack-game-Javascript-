let BlackJack = {
Card:['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
cardValue:{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'J':10,'K':10,'Q':10},
You:{Div:"#yourBox",Result:"#yourResult",Score:0},
Bot:{Div:"#botBox",Result:"#botResult",Score:0},
Bot:{Score:0},
};

const   Swish = new Audio('BlackJackAssets/swish.m4a');
document.querySelector("#blackJackHit").addEventListener('click',blackJackHit);

function blackJackHit(){
 
 let Card = randomCard();
 
 showCard(Card,"You");

 

 updateScore(Card,'You');
 showScore('You');
}

function randomCard(){
      
    return BlackJack['Card'][Math.floor(Math.random()*13)];

}
function showCard(Card,Player){

    if(BlackJack[Player]['Score'] <= 21){
    console.log(Card); 
    let Img = document.createElement('img');
    Img.src = `BlackJackAssets/${Card}.png`;
    document.querySelector(BlackJack[Player]['Div']).appendChild(Img);
    Swish.play();

    }
}

function updateScore(Card,Player){

     if(BlackJack[Player]['Score']  <= 21 ){
       if(Card === 'A'){
        
          if( BlackJack[Player]['Score'] + BlackJack['cardValue'][Card][1] <=  21 ){
             BlackJack[Player]['Score'] += BlackJack['cardValue'][Card][1];
            }else{
              
             BlackJack[Player]['Score'] += BlackJack['cardValue'][Card][0];

           }    
         

          }else{
            BlackJack[Player]['Score']  += BlackJack['cardValue'][Card] ;  
            console.log(BlackJack[Player]['Score']);
          }
}
}

function showScore(Player){  
    if(BlackJack[Player]['Score'] < 22){
    document.querySelector(BlackJack[Player]['Result']).textContent = BlackJack[Player]['Score'] ;
    }else{

        document.querySelector(BlackJack[Player]['Result']).textContent = "Bust !";
        document.querySelector(BlackJack[Player]['Result']).style.color = "Red";

    }
}


