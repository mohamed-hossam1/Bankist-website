// hamburger menu
const hamburger = document.querySelector(".hamburger")
const hamburger_span = document.querySelectorAll(".hamburger > span")
const menu = document.querySelector(".nav_links")

// learn button smooth scroll
const learn_button = document.querySelector(".learn-button")

// popup page
const popup_buttons = document.querySelectorAll(".popup-button")
const popup_overlay = document.querySelector(".popup-overlay")

// operation buttons
const operation_desktop_buttons = document.querySelectorAll(".operation-desktop-button")
const operation_mobile_buttons = document.querySelectorAll(".operation-mobile-button")


// slides
const slides = document.querySelectorAll('.slide');
const btn_left = document.querySelector('.slider_btn_left');
const btn_right = document.querySelector('.slider_btn_right');
const dot_container = document.querySelector('.dots');
let cur_slide = -1;
const max_slide = slides.length;

// for responsive slider height
const slider_box = document.querySelector('.slider_box');
const slide_boxs = document.querySelectorAll('.slide_box');

// lazy load
const image_element = document.querySelectorAll(".lazy_load")





// hamburger menu
hamburger.addEventListener('click', () => {
    menu.classList.toggle('-translate-x-full')
    hamburger_span[0].classList.toggle('rotate-45')
    hamburger_span[0].classList.toggle('translate-y-[1px]')
    hamburger_span[1].classList.toggle('block')
    hamburger_span[2].classList.toggle('-rotate-45')
    hamburger_span[2].classList.toggle('translate-y-[-7px]')
})

// nav smooth scroll
menu.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.hasAttribute("href")){
        document.querySelector(e.target.getAttribute("href")).scrollIntoView({ behavior: 'smooth' })
    }
})


// learn button smooth scroll
learn_button.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(e.target.closest('a').getAttribute("href")).scrollIntoView({ behavior: 'smooth' })
})


// popup page
const PopUp = () => {
    popup_overlay.classList.toggle('hidden')
}

popup_buttons.forEach(popup_button => {
    popup_button.addEventListener('click', e =>{
        e.preventDefault();
        PopUp()
    })
})

popup_overlay.addEventListener('click', e =>{
    if(e.target.classList.contains('popup-overlay') || e.target.classList.contains('popup-close') ){
        PopUp()
    }
})

document.addEventListener('keydown', e =>{
    if(e.key==='Escape' && !popup_overlay.classList.contains('hidden')){
        PopUp()
    }
})


// operation buttons
operation_desktop_buttons.forEach(operation_button =>{
    operation_button.addEventListener('click',()=>{
        operation_desktop_buttons.forEach(button =>{
            const operation_card = document.querySelector(`.operation-desktop div[data-content='${button.getAttribute('data-tab')}']`)
            
            if(button === operation_button){
                operation_card.classList.remove('hidden')
                setTimeout(() => {
                    operation_card.classList.remove('max-h-0')
                    operation_card.classList.add('max-h-56')
                }, 600);
                
                button.classList.add("-translate-y-1/4")
            }else{
                operation_card.classList.remove('max-h-56')
                operation_card.classList.add('max-h-0')
                setTimeout(() => {
                    operation_card.classList.add('hidden')
                }, 600);
                button.classList.remove("-translate-y-1/4")
            }
        })
    })
})

operation_mobile_buttons.forEach(operation_button => {
    operation_button.addEventListener('click', () => {
        operation_mobile_buttons.forEach(button => {
            const operation_card = document.querySelector(`.operation-mobile div[data-content='${button.getAttribute('data-tab')}']`);

            if (button === operation_button) {
                operation_card.classList.remove('hidden');
                setTimeout(() => {
                    operation_card.classList.remove('max-h-0');
                    operation_card.classList.add('max-h-[500px]', 'p-8');
                }, 10); 
            } else {
                operation_card.classList.remove('max-h-[500px]', 'p-8');
                operation_card.classList.add('max-h-0');
                
                setTimeout(() => {
                    operation_card.classList.add('hidden');
                }, 1000);
            }
        });
    });
});


// slides
const createDots = ()=>{
    for (let i = 0; i < max_slide; i++)
        dot_container.innerHTML += `<button data-dot = "${i}" class="cursor-pointer min-w-2.5 h-2.5 rounded-full bg-neutral-600/30"></button>`
}

const slideRight = ()=>{
    cur_slide = (cur_slide + 1) % max_slide
    slides.forEach((slide,i) =>{
        slide.style.transform = `translateX(${100 * (i - cur_slide)}%)`
    })


    document.querySelectorAll(`button[data-dot]`).forEach(dot =>{
        if(dot.getAttribute('data-dot') === cur_slide.toString()){
            dot.classList.add('bg-neutral-600/80')}
        else
            dot.classList.remove('bg-neutral-600/80')
    })
}

const slideLeft = ()=>{
    cur_slide = ((cur_slide - 1) + max_slide) % max_slide
    slides.forEach((slide,i) =>{
        slide.style.transform = `translateX(${100 * (i - cur_slide)}%)`
    })

    document.querySelectorAll(`button[data-dot]`).forEach(dotButton =>{
        if(dotButton.getAttribute('data-dot') === cur_slide.toString()){
            dotButton.classList.add('bg-neutral-600/80')}
        else
            dotButton.classList.remove('bg-neutral-600/80')
    })
}

const selectDot = (e)=>{
    const dotButton =  e.target.closest('button')
    if(dotButton){
        cur_slide = dotButton.getAttribute('data-dot') - 1
        slideRight()
    }
}

btn_right.addEventListener('click',slideRight)
btn_left.addEventListener('click',slideLeft)
dot_container.addEventListener('click', selectDot)
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight') slideRight()
    if(e.key === 'ArrowLeft') slideLeft()
})


// for responsive slider height
const slider_box_observer = new ResizeObserver ((entries) => {
    const max_height = Math.max(...entries.map(entrie=>entrie.contentRect.height))
    slider_box.style.height = `${max_height + 140}px`
})

slide_boxs.forEach(slide_box => {
    slider_box_observer.observe(slide_box)
})


// lazy load
image_element.forEach(image => {
    image.setAttribute('src', image.getAttribute('src').replace('-lazy',""))
    image.addEventListener('load',(e) => {
        e.target.classList.remove('blur-sm')
    })
})


// animation
const callback = (entries, observer) => {
    entries.forEach(el => {
        if (el.isIntersecting) { 
            if (el.target.classList.contains('right_boxs'))
                el.target.classList.remove('-translate-x-full')

            else if (el.target.classList.contains('left_boxs'))
                el.target.classList.remove('translate-x-full')

            observer.unobserve(el.target); 
        }
    });
};


const options = {
    root: null,
    rootMargin: "-40px",
};

const animation = new IntersectionObserver(callback, options);

document.querySelectorAll('.right_boxs').forEach(box=>{
    animation.observe(box);
})

document.querySelectorAll('.left_boxs').forEach(box=>{
    animation.observe(box);
})

document.querySelectorAll('.top_boxs').forEach(box=>{
    animation.observe(box);
})



// init
createDots()
slideRight()