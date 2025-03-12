function toggleMenu() {
  const $navMenu = document.getElementById('nav-menu');
  $navMenu.classList.toggle('show');
}

function init() {
  const $navToggle = document.getElementById('nav-toggle');
  $navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  const $navLinkList = document.querySelectorAll('.nav__link');
  $navLinkList.forEach((n) => n.addEventListener('click', toggleMenu));

  document.addEventListener('click', (e) => {
    e.stopPropagation();
    const $navMenu = document.getElementById('nav-menu');
    if ($navMenu.classList.contains('show')) {
      $navMenu.classList.remove('show');
    }
  });

  handleIntersectionObserver();
}

init();

function handleIntersectionObserver() {
  // IntersectionObserver 등록
  const options = {
    root: null,
    // 타겟 이미지 접근 전 이미지를 불러오기 위해 rootMargin을 설정했습니다.
    rootMargin: '0px 0px 0px 0px',
    threshold: 1,
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;

      if (entry.isIntersecting) {
        // 관찰 대상이 viewport 안에 들어온 경우 'active' 클래스 추가
        document
          .querySelector(`.nav__link[href*=${sectionId}]`)
          .classList.add('active-link');
        const disables = document.querySelectorAll(
          `.nav__link:not([href*=${sectionId}])`,
        );
        disables.forEach((el) => el.classList.remove('active-link'));
      }
    });
  }, options);

  // 관찰할 대상을 선언하고, 해당 속성을 관찰
  const sectionList = document.querySelectorAll('.section');
  sectionList.forEach((el) => io.observe(el));
}

// eslint-disable-next-line no-undef
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 100,
  //     reset: true
});
// 빠른 로딩
scrollReveal.reveal(
  '.home__data, .about__img, .skills__subtitle, .skills__text, .company__icon',
  {},
);
scrollReveal.reveal('.home__img, .about__data, .skills__img', { delay: 100 });
scrollReveal.reveal('.home__social-icon', { interval: 100 });

scrollReveal.reveal(
  '.skills__data, .work__link, .contact__container, .contact__info',
  {
    interval: 200,
  },
);

/* -------------------------- Floating Button Click ------------------------- */
const $floatingButton = document.getElementById('floating-button');
$floatingButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// eslint-disable-next-line no-undef
new TypeIt('#typeit', {
  speed: 70,
  startDelay: 1300,
  waitUntilVisible: true,
})
  .type('안녕하세요!<br />')
  .type('<strong class="home__title-color">개발자</strong><br />')
  .type('<strong class="home__title-color">SSG</strong>', { delay: 200 })
  .delete(3, { delay: 300 })
  .type('<strong class="home__title-color">송상근</strong>입니다!')

  .go();

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalClose = document.querySelector('.modal__close');
  let isModalOpen = false;

  // 이미지 링크 클릭 시 모달 표시
  document.querySelectorAll('.work__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalSrc = link.getAttribute('data-modal');
      if (modalSrc) {
        openModal(modalSrc);
      }
    });
  });

  // 모달 열기
  function openModal(src) {
    modalIframe.src = src;
    modal.style.display = 'flex';
    isModalOpen = true;

    // 뒤로가기 상태 추가
    history.pushState({ modal: true }, '', '#modal');
  }

  // 모달 닫기
  function closeModal() {
    modal.style.display = 'none';
    modalIframe.src = ''; // iframe 내용 초기화
    isModalOpen = false;

    // 뒤로가기로 모달 상태 삭제
    if (history.state?.modal) {
      history.back();
    }
  }

  // 닫기 버튼 클릭 시 닫기
  modalClose.addEventListener('click', () => {
    closeModal();
  });

  // 모달 외부 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 뒤로가기 처리
  window.addEventListener('popstate', (e) => {
    if (isModalOpen && (!e.state || !e.state.modal)) {
      // 뒤로가기로 모달이 닫혀야 할 때
      closeModal();
    }
  });

  // screens/index.html에서 닫기 요청 수신
  window.addEventListener('message', (event) => {
    if (event.data === 'closeModal') {
      closeModal();
    }
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const modal = document.getElementById('modal');
//   const modalIframe = document.getElementById('modal-iframe');
//   const modalClose = document.querySelector('.modal__close');

//   document.querySelectorAll('.work__link').forEach((link) => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();
//       const modalSrc = link.getAttribute('data-modal');
//       if (modalSrc) {
//         modalIframe.src = modalSrc;
//         modal.style.display = 'flex';
//       }
//     });
//   });

//   modalClose.addEventListener('click', () => {
//     modal.style.display = 'none';
//     modalIframe.src = ''; // Reset iframe content
//   });

//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       modal.style.display = 'none';
//       modalIframe.src = '';
//     }
//   });
// });
