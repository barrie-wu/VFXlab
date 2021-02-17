// header animations
const vfx = document.querySelector('.vfxSpan');
const labs = document.querySelector('.labSpan');

setTimeout(function() {
    vfx.classList.add('logoFade')
}, 3000)

setTimeout(function () {
    labs.classList.add('logoFade')
}, 4500)



// carousel
const track = document.querySelector('.carouselTrack');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carouselButtonRight');
const prevButton = document.querySelector('.carouselButtonLeft');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrrange slides next to one another
const setSlidePosition = (slide, i) => {
    slide.style.left = (slideWidth + 25) * i + 'px';
}
slides.forEach(setSlidePosition)


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('currentSlide');
    targetSlide.classList.add('currentSlide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('currentSlide');
    targetDot.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('isHidden');
        nextButton.classList.remove('isHidden')
    } else if (targetIndex === slides.length - 2) {
        prevButton.classList.remove('isHidden');
        nextButton.classList.add('isHidden');
    } else {
        prevButton.classList.remove('isHidden');
        nextButton.classList.remove('isHidden');
    }
}

// when i click left, move slide to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// when i click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// when i click nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // what indicator was clicked
    const targetDot = e.target.closest('button');
    // if not a button, stop 
    if(!targetDot) return;
    // if a button, do stuff
    const currentSlide = track.querySelector('.currentSlide');
    const currentDot = dotsNav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});