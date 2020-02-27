
// It is an object( DataStructure ) used for storing informations related to BlackJack :   
let BlackJack = {
Card:['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
cardValue:{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'J':10,'K':10,'Q':10},
You:{Div:"#yourBox",Result:"#yourResult",Score:0},
Bot:{Div:"#botBox",Result:"#botResult",Score:0},
Win:0,
Lose:0,
Draw:0,
Hit:true, 
Stand:false,
};

// It is Swish audio object,play when an card show to frontend:
const   Swish = new Audio('BlackJackAssets/swish.m4a');
//It is Cash audio object ,play when You win the match:
const   Cash  = new Audio('BlackJackAssets/cash.mp3');
//It is Aww audio object ,play when You Lose the match:
const   Aww   = new Audio('BlackJackAssets/aww.mp3');

//It is an click  event ,trigger when user hit Hit button:   
document.querySelector("#blackJackHit").addEventListener('click',blackJackHit);

//It is an click  event ,trigger when user hit Stand button:   
document.querySelector("#blackJackStand").addEventListener('click',blackJackStand);
//It is an click  event ,trigger when user  Hit Deal button:   
document.querySelector("#blackJackDeal").addEventListener('click',blackJackDeal);


// It is function ,run when someone  hit Deal Button:
function blackJackDeal(){
  
 // Select All Images element from yourBox Div & return them as array of objects :
 let youImages = document.querySelector(BlackJack['You']['Div']).querySelectorAll('img');
 
 // Select All Images element from botBox Div  & return them as array of objects:
 let botImages = document.querySelector(BlackJack['Bot']['Div']).querySelectorAll('img');     
 

 // It will remove all images object(Element) from yourBox Div(Object):
  for(let i =0 ; i < youImages.length ; i++ )
      youImages[i].remove();
 
// It will remove all images object(Element) from yourBox Div(Object):      
  for(let i =0 ; i < botImages.length ; i++ )
      botImages[i].remove();

  // It will reset bot and your player Score in Backend(Javascript) :
  BlackJack['You']['Score'] = 0;
  BlackJack['Bot']['Score'] = 0;
 
  // It will reset your Player score and color in frontend :
  document.querySelector(BlackJack['You']['Result']).textContent = 0 ;
  document.querySelector(BlackJack['You']['Result']).style.color = "white";
 
  // It will reset bot Player score and color in frontend :
  document.querySelector(BlackJack['Bot']['Result']).textContent = 0 ;
  document.querySelector(BlackJack['Bot']['Result']).style.color = "white";

  // It will reset message header: 
  document.querySelector('#header').textContent = "Let's Play";
  document.querySelector('#header').style.color = "White";
 
  //It will reset click buttons(Hit and Stand) :
  BlackJack['Hit'] =true;
  BlackJack['Stand'] = false;
}

// It is an asynchrounous function ,run when someone  hit Stand Button:
async function blackJackStand(){
   
  if(BlackJack['Stand']){
    
    BlackJack['Hit'] = false ;

    while(BlackJack['Bot']['Score'] <= 16){
    let Card = randomCard();
    showCard(Card,"Bot");
    updateScore(Card,"Bot");
    showScore("Bot");
     await sleep(1000);
    }

   let Winner = decideWinner();
   console.log(Winner);
   displayWin(Winner);
   updateTable();

   BlackJack['Stand'] = false;
  
  
  }

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}


// It is function used to update  table from frontend[Html document or User-Interface] 
function updateTable(){

  document.querySelector("#Win").textContent = BlackJack['Win'];
  document.querySelector("#Loss").textContent = BlackJack['Lose'];
  document.querySelector("#Draw").textContent = BlackJack['Draw'];

}

// It will display Winner message ,also updates Win,Lose Draw variable Value:
function displayWin(Winner){
 
  if(Winner === "Bot"){
     
    document.querySelector("#header").textContent = "You Lose :(^ _ ^)"; // Show Lose message when User gets lose:
    document.querySelector("#header").style.color = "Red";
    BlackJack['Lose']++; // Update Lose Variable Value:
    Aww.play(); // It play Aww sound when User gets Lose:

  }else if(Winner === "You"){
     
    document.querySelector("#header").textContent = "You Won :)"; // Show win message when User gets win:
    document.querySelector("#header").style.color = "Green";
    BlackJack['Win']++; // Update Win Variable Value :

    Cash.play(); // It play Cash Sound When User gets Win:
  }else{
       
    document.querySelector("#header").textContent = "Match Draw :(^ _ ^)"; //// Show Draw message when User gets Draw:
     BlackJack['Draw']++ ; // Update Draw Variable Value:
    
  }

}

// This function will run/execute when some hit Hit button:
function blackJackHit(){
 
if(BlackJack['Hit']){  // It  will check Hit Value,If Hit value true then  all code of Hit function will execute:  

 let Card = randomCard();  // It will generate random card from 2,3,4,5,6,7,8,9,10,A(either 1 or 11),J,K,Q:
 
 showCard(Card,"You"); // It will show card to User Box :

 

 updateScore(Card,'You'); // It will Update score from backend(Javascript):
 showScore('You'); // It will update score from User-Interface :
 BlackJack['Stand'] = true ; // It Update Stand Value  
}
}

// This function decide who is winner between User And Bot:
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

//It will generate random card and return it:
function randomCard(){
      
    return BlackJack['Card'][Math.floor(Math.random()*13)];

}
// It will show card ,when we provide card & Player{ Either Bot,You }:
function showCard(Card,Player){

    if(BlackJack[Player]['Score'] <= 21){
    let Img = document.createElement('img'); // Create Image Object :
    Img.src = `BlackJackAssets/${Card}.png`; // Link Image to Image Object:
    document.querySelector(BlackJack[Player]['Div']).appendChild(Img); // Add Image Object to  Player{Either You,bot}:
    Swish.play(); // It will Play Swish Sound :

    }
}

// This function Will Update Score in Javascript :
function updateScore(Card,Player){

     // It checks if Card is Ace or Not  
       if(Card === 'A'){
          // If card Is Ace Then:
           // This logic add Ace Card Value, Either it will 11 or 1:
          if( BlackJack[Player]['Score'] + BlackJack['cardValue'][Card][1] <=  21 ){
             BlackJack[Player]['Score'] += BlackJack['cardValue'][Card][1];
            }else{
              
             BlackJack[Player]['Score'] += BlackJack['cardValue'][Card][0];

           }    
         

          }else{
            // Card is Not Ace :
            // It will update Card value according to Card Corresponding value:    :
            BlackJack[Player]['Score']  += BlackJack['cardValue'][Card] ;  
            
          }
}

// This function will Update Score In User-Interface   :
function showScore(Player){

  //It will check Player{You/Bot} Score :
    if(BlackJack[Player]['Score'] < 22){
  //if Score Less than equal to 21 then it will show in User-Interface:
    document.querySelector(BlackJack[Player]['Result']).textContent = BlackJack[Player]['Score'] ;
    }else{

  //If Score is Greater than 21 than it will show Bust Message to User-Interface:
        
        document.querySelector(BlackJack[Player]['Result']).textContent = "Bust !";
        document.querySelector(BlackJack[Player]['Result']).style.color = "Red";

    }
}


