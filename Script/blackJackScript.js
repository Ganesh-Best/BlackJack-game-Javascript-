let BlackJack = {
Card:['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
cardValue:{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'J':10,'K':10,'Q':10},
You:{Div:"#yourBox",Result:"#yourResult",Score:0},
Bot:{Div:"#botBox",Result:"#botResult",Score:0},
Win:0,
Lose:0,
Draw:0,
};


const   Swish = new Audio('BlackJackAssets/swish.m4a');
const   Cash  = new Audio('BlackJackAssets/cash.mp3');
const   Aww   = new Audio('BlackJackAssets/aww.mp3');

document.querySelector("#blackJackHit").addEventListener('click',blackJackHit);


document.querySelector("#blackJackStand").addEventListener('click',blackJackStand);

document.querySelector("#blackJackDeal").addEventListener('click',blackJackDeal);



function blackJackDeal(){
   let Winner = decideWinner();
  console.log(Winner);
  displayWin(Winner);
  updateTable();
}


function blackJackStand(){
   
  let Card = randomCard();
    showCard(Card,"Bot");
    updateScore(Card,"Bot");
    showScore("Bot");

 
}


function updateTable(){

  document.querySelector("#Win").textContent = BlackJack['Win'];
  document.querySelector("#Loss").textContent = BlackJack['Lose'];
  document.querySelector("#Draw").textContent = BlackJack['Draw'];

}

function displayWin(Winner){
 
  if(Winner === "Bot"){
     
    document.querySelector("#header").textContent = "You Lose :(^ _ ^)";
    document.querySelector("#header").style.color = "Red";
    BlackJack['Lose']++;
    console.log(BlackJack['Lose']);
    Aww.play();

  }else if(Winner === "You"){
     
    document.querySelector("#header").textContent = "You Won :)";
    document.querySelector("#header").style.color = "Green";
    BlackJack['Win']++;

    console.log(BlackJack['Win']);
    Cash.play();
  }else{
       
    document.querySelector("#header").textContent = "Match Draw :(^ _ ^)";
     BlackJack['Draw']++ ;
     console.log(BlackJack['Drwa']);
  }

}

function blackJackHit(){
 
 let Card = randomCard();
 
 showCard(Card,"You");

 

 updateScore(Card,'You');
 showScore('You');
}


function decideWinner(){
  
  if(BlackJack['You']['Score'] > 21 && BlackJack['Bot']['Score'] > 21) 
     return "Draw";
  else if(BlackJack['You']['Score'] >21 && BlackJack['Bot']['Score'] < 21){
    return "Bot";
  }else if( BlackJack['You']['Score'] <= 21 && BlackJack['Bot']['Score'] > 21){
     return "You";
  }else{
       
       if(BlackJack['You']['Score'] > BlackJack['Bot']['Score'] )
          return "You";
        else if(BlackJack['You']['Score'] < BlackJack['Bot']['Score'] )
           return "Bot";
        else{
           return "Draw";
        }  
  }

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


function showScore(Player){  
    if(BlackJack[Player]['Score'] < 22){
    document.querySelector(BlackJack[Player]['Result']).textContent = BlackJack[Player]['Score'] ;
    }else{

        document.querySelector(BlackJack[Player]['Result']).textContent = "Bust !";
        document.querySelector(BlackJack[Player]['Result']).style.color = "Red";

    }
}


