// slides li을 가져오는 이유는 슬라이드 갯수가 변경되는것을 반영해 주기 위해서.
// 끝과 끝에서 처음 혹은 끝으로 돌아가게끔 하기위해 currentIndex가 필요함
// 처음인지 마지막인지 구분하려면 슬라이드갯수도 필요하다.(slideCount)
let slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    slideCount = slide.length,
    slideWidth = 300,
    slideMargin = 30,
    currentIdx = 0,
    prev = document.querySelector('.prev__btn'),
    next = document.querySelector('.next__btn');


slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

// 숫자(num)이 들어오면 slides를 움직여주는 함수를 만든다.
function moveSlide(num) {
    slides.style.left = -num * 330 + 'px';
    currentIdx = num;
}

next.addEventListener('click', () => {
    if (currentIdx < slideCount - 3) {
        moveSlide(currentIdx + 1);
    } else {
        moveSlide(0)
    }
});

prev.addEventListener('click', () => {
    if (currentIdx > 0) {
        moveSlide(currentIdx - 1);
    } else {
        moveSlide(slideCount - 3)
    }
});
