
const overfiews = document.querySelectorAll(".overfiew .slide")

var repeat = function (activeClassName) {
  let active = document.getElementsByClassName(".overfiew .active")
  let i = 0;

  var repeater = () => {
    setTimeout(function () {
      overfiews[i].classList.add("active")
      i++

      if (overfiews.length == 0) i = 0
      if (i >= overfiews.length) return;
      repeater()

      console.log(overfiews[i]);
    }, 1000)
    repeater()
  }

}
repeat()

// setInterval(()=>playSlide(), 1000);
/*
!toogle icon list*/
const link = document.querySelector(".header .links"),
  icon = document.querySelector(".fa-list"),
  responsiveNav = document.querySelector(".responsive-nav")


icon.addEventListener("click", () => {
  responsiveNav.style.display = responsiveNav.style.display === "block" ? "none" :"block"
})

/*
! Change Like Element State */

const divHeart = document.querySelector(".sub-coll .like");
const likeTag = document.querySelectorAll(".sub-coll .like .fa-heart");
likeTag.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.target.classList.toggle("liked");

  });
});

/*
! Show Image Details  */

const images = document.querySelectorAll(".collection .row img"),
  collection_container = document.querySelector(".collection .row"),
  parags = document.querySelectorAll(".collection .row .details p");

parags.forEach((parag) => {
  parag.addEventListener("click", (event) => {

    // let overlay = document.createElement("div")
    // overlay.className = "overlay";
    // document.body.appendChild(overlay);
    
    let popup_box = document.createElement("div")
    popup_box.className = "popup-box";
    // overlay.appendChild(popup_box)
    document.body.appendChild(popup_box)

    let mark = event.target.dataset.selectimage,
      infoEl = document.querySelectorAll(`#${mark}`),
      info = Array.from(infoEl),
      image = info[0];
    
    let imageEl = document.createElement("img")
    imageEl.src = image.src
    
    if (image.alt !== null) {
      let caption = document.createElement("h6")
      caption.style.cssText = "margin: 10px 0 ; color: #FFF; order:-1";
      caption.innerText = image.alt;
      info[1].appendChild(caption)
    }

    popup_box.appendChild(imageEl)
    popup_box.appendChild(info[1])
    
    let close_btn = document.createElement("i")
    close_btn.className = "fa fa-xmark";
    popup_box.appendChild(close_btn);

    close_btn.addEventListener('click', () => {
      popup_box.remove()
      // overlay.removeChild(popup_box);
      // overlay.remove()
    })
  })
})

/* 
! Old Fashion Container "Slide Images Show" */

const oldProducts = ["fashion", "mittens", "young-woman"],
  imageTag = document.querySelector(".old-fashion .row .col-lg-6 img");

let index = 0;

function showImage() {
  let newSrc = `../../assets/${oldProducts[index]}.jpg`;
  imageTag.setAttribute("src", newSrc);
  index++;

  if (index === oldProducts.length) {
    index = 0;
  }
}
 setInterval(showImage, 3000);

/* 
! Products Container "filter products" */

const productFilter = document.querySelector(".products .collectionProducts .filter"),
  contents = document.querySelectorAll(".content"),
  btns = document.querySelectorAll(".filter div");


productFilter.addEventListener('click', (event) => {
  const mark = event.target.dataset.mark;

  if (mark) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
      event.target.classList.add("active");
    })
  }
  contents.forEach((content) => {
    content.classList.remove("visible")
    const getMarkToId = document.getElementById(mark)
    getMarkToId.classList.add("visible"); // add visible class to content by mark 
  })
})

/*
! countDown for deadline product  */

let deadline_Date = new Date("Dec 30 ,2023 12:00:00 am").getTime(),
  deadline_container = document.querySelectorAll(".deadline-counter span"),
  timer = document.querySelector(".timer");

let interval = setInterval(() => {
  let dateNow = new Date().getTime(),
    TIME_DIFF = deadline_Date - dateNow,
    // Time Units
    Day = Math.floor(TIME_DIFF / (24 * 60 * 60 * 1000)),
    Hours = Math.floor((TIME_DIFF % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
    Minutes = Math.floor((TIME_DIFF % (60 * 60 * 1000)) / (60 * 1000)),
    Seconds = Math.floor((TIME_DIFF % (60 * 1000)) / 1000),
    VALUES = [Day, Hours, Minutes, Seconds];
  
  deadline_container.forEach((item, index) => {
    item.innerHTML = format(VALUES[index]);
  })

  function format(val) {
    if (val < 10) return `0${val}`
    return val
  };

  if (TIME_DIFF <= 0) {
    clearInterval(interval);

    deadline_container.forEach((item) => {
      item.innerText = "00";
    })

    const captionEl = document.createElement("span")
    captionEl.style.cssText = "color: red; font-weight: bold; display: block; text-align:center";
    captionEl.innerText = "Product Has Expired"

    timer.appendChild(captionEl)
  };
}, 1000);

/*
! Best Seller Container "Dragging Card slider" */

const carousel = document.querySelector(".wrapper .carousel"),
  firstCardWidth = carousel.querySelector(".card").offsetWidth,
  carouselChildrens = [...carousel.children],
  wrapper = document.querySelector(".wrapper"),
  navBtns = document.querySelectorAll(".best-sellers .navigation .nav");

let isDragging = false, startScrollLeft, prevPageX, timeOutId;

const dragging = (e) => {
  if (!isDragging) return; // if is false return from here

  // update the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - prevPageX);

}
carousel.addEventListener("mousemove", dragging)

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging")
  // record the initial cursor and scrll position of the carousel
  prevPageX = e.pageX;
  startScrollLeft = carousel.scrollLeft ;

}
carousel.addEventListener("mousedown", dragStart)

const stopDrag = () => {
  isDragging = false
  carousel.classList.remove("dragging")
}
carousel.addEventListener("mouseup", stopDrag)

// get the umber of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth); //3

// insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
  
})

// insert copies of the last few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML)
})

const infiniteScroll = () => {
  // if the carousel is at the begginning , scroll to the end
  if (carousel.scrrolLeft === 0) {
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)

    // if the carousel is at the end , scroll to the the beginning
  } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    setTimeout(() => carousel.scrollLeft = carousel.offsetWidth, 1000);
    
 
  }

  //  clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeOutId);
  if (!wrapper.matches(":hover")) autoPlay();

}


const autoPlay = () => {
  if (window.innerWidth < 900) return; // return if window is smaller than 900
  
  // When the timer expires, it triggers a function that increases the scrollLeft property of the carousel element. This scrolls the content of the carousel to the left.
  timeOutId = setTimeout(() =>  carousel.scrollLeft += firstCardWidth, 2500)

}


autoPlay()
wrapper.addEventListener("mouseleave", autoPlay)
carousel.addEventListener("scroll", infiniteScroll)
wrapper.addEventListener("mouseenter", ()=> clearTimeout(timeOutId) )


/*
! obout  */

let icons = document.querySelectorAll(".about-us .wrapper i"),
  Wrapper = document.querySelector(".about-us .wrapper"),
  carousel_dragger = document.querySelector(".about-us .carousel"),
  item_card = document.querySelectorAll(".about-us .wrapper .carousel .item-card")[0],
  itemCardWidth = item_card.offsetWidth + 32,
  timeout,
  carouselScrollWidth = carousel_dragger.scrollWidth - carousel_dragger.offsetWidth;
  
  const showHideIcons = () => {
  icons[0].style.display = carousel_dragger.scrollLeft === 0 ? "none" : "block";
  icons[1].style.display = carousel_dragger.scrollLeft === carouselScrollWidth ? "none" : "block";

}

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    carousel_dragger.scrollLeft += icon.id === "left" ? -itemCardWidth : itemCardWidth;
    setTimeout(() => showHideIcons() , 60);
  })
})

// function playCarousel() {
//   carousel_dragger.scrollLeft += itemCardWidth;
//   showHideIcons()

//   console.log(carousel_dragger.scrollLeft);
// }

// timeout= setInterval( playCarousel, 2500)








