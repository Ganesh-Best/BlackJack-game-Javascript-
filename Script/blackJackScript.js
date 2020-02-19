let BlackJack ={
Card:['2','3','4','5','6','7','8','9','10','J','K','Q','A'],

}

document.querySelector("#blackJackHit").addEventListener('click',blackJackHit);

function blackJackHit(){
 
 let Card = randomCard();
 
 showCard(Card,"#yourBox");

}

function randomCard(){
     
    return BlackJack['Card'][Math.floor(Math.random()*13)];

}
function showCard(Card,Player){
    
    let Img = document.createElement('img');
    Img.src = `BlackJackAssets/${Card}.png`;
    document.querySelector(Player).appendChild(Img);
    
}