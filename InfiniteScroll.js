const elementToObserve = document.querySelectorAll('.child');
const parentContainer = document.getElementsByClassName('parent-container')[0];

let count = 10;

// observer for observing last card and calling loadMoreCards, 
// unobserving the old last card and observing the new last card
let observeCards = new IntersectionObserver(entries => {
    const lastCard = entries[0];

    entries.forEach(entry => {

        entry.target.classList.toggle('show', entry.isIntersecting);
    })

    if (!lastCard.isIntersecting) return;
    loadMoreCards();
    observeCards.unobserve(lastCard.target);
    observeCards.observe(document.querySelector(".child:last-child"));
})

elementToObserve.forEach((card) => {
    observeCards.observe(card);
})
observeCards.observe(document.querySelector(".child:last-child"));

const loadMoreCards = () => {
    let fragment = document.createDocumentFragment();
    for (let i = count; i < count + 10; i++) {

        let newElement = document.createElement('div');
        newElement.textContent = "new Card " + i;
        newElement.className = 'show child ' + i;
        fragment.appendChild(newElement);
    }
    count = count + 10;
    parentContainer.appendChild(fragment);
}

