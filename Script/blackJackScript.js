
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


// It is function used to update  table from frontend 
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
 
if(BlackJack['Hit']){

 let Card = randomCard();
 
 showCard(Card,"You");

 

 updateScore(Card,'You');
 showScore('You');
 BlackJack['Stand'] = true ;
}
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


