// navbar 
let navbar = document.querySelector('.header .navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
}


document.querySelector('#close-navbar').onclick = () =>{
    navbar.classList.remove('active');
}


// register and login forms
let registerBtn = document.querySelector('.account-form .register-btn');
let loginBtn = document.querySelector('.account-form .login-btn');

registerBtn.onclick = () =>{
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
    document.querySelector('.account-form .login-form').classList.remove('active');
    document.querySelector('.account-form .register-form').classList.add('active');
};

loginBtn.onclick = () =>{
    registerBtn.classList.remove('active');
    loginBtn.classList.add('active');
    document.querySelector('.account-form .login-form').classList.add('active');
    document.querySelector('.account-form .register-form').classList.remove('active');
};


let accountForm = document.querySelector('.account-form')

document.querySelector('#account-btn').onclick = () =>{
    accountForm.classList.add('active');
}

document.querySelector('#close-form').onclick = () =>{
    accountForm.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const admissionStatusElement = document.getElementById('admission-status');
  
  // Define admission start and end dates
  const admissionStartDate = new Date('2024-02-17'); // Replace YYYY-MM-DD with your admission start date
  const admissionEndDate = new Date('2024-02-18'); // Replace YYYY-MM-DD with your admission end date

  const currentDate = new Date();

  if (currentDate >= admissionStartDate && currentDate <= admissionEndDate) {
      admissionStatusElement.textContent = 'Admission Open';
  } else {
      admissionStatusElement.textContent = 'Admission Closed';
  }
});



// homepage slider
var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop:true,
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
      
    },
    // Enable navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});


// home courses slider
var swiper = new Swiper(".home-course-slider",{
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
    },
});


// teacher's slider
var swiper = new Swiper(".teachers-slider",{
  loop:true,
  grabCursor:true,
  spaceBetween: 20,
  breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
  },
});


// reviews slider
var swiper = new Swiper(".reviews-slider",{
  loop:true,
  grabCursor:true,
  spaceBetween: 20,
  breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
  },
});


// accordion content
let accordion = document.querySelectorAll('.faq .accordion-container .accordion');

accordion.forEach(acco => {
  acco.onclick = () => {
    accordion.forEach(dion => dion.classList.remove('active'));
    acco.classList.toggle('active');
  }
});

document.querySelector('.load-more .btn').onclick = () => {
  document.querySelectorAll('.courses .box-container .hide').forEach(show =>{
    show.style.display = 'block';
  });
  document.querySelector('.load-more .btn').style.display = 'none';
};
