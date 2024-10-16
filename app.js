const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pts = 0


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    pair();
}

function pair() {
    if (firstCard.dataset.item === secondCard.dataset.item) {
        pts+=1
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    
    if (pts==6) {
        win
        setTimeout(() => {
           alert("GAGNÉ !")  
        }, 500);
           }

}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function win(gamewin) {
    setTimeout(() => {
        document.getElementById('win').classList.remove('opacity')
    }, 500);
}

document.body.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        location.reload();
    }
});