let slides = document.querySelector('.slide'),
    slide = document.querySelectorAll('.slide li'),
    slideCount = slide.length,
    currentIdx = 0,
    slideWidth = 300,
    slideMargin = 30,
    prev = document.querySelector('.prev_btn'),
    next = document.querySelector('.next_btn');

    slides.style.width = (slideWidth + slideMargin)*slideCount - slideMargin + 'px';


    function moveSlide(num) {
        slides.style.left = -num * 330 + 'px';
        currentIdx = num;
    }

    next.addEventListener('click', () => {
        if(currentIdx < slideCount - 6){
            moveSlide(currentIdx + 1);
        }else {
            moveSlide(0)
        }
    });

    prev.addEventListener('click', () => {
        if(currentIdx > 0){
            moveSlide(currentIdx - 1);
        }else {
            moveSlide(slideCount - 3)
        }
    });



