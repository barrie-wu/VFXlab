const vfx = document.querySelector('.vfxSpan');
const labs = document.querySelector('.labSpan');

setTimeout(function() {
    vfx.classList.add('logoFade')
}, 2000)

setTimeout(function () {
    labs.classList.add('logoFade')
}, 5000)
