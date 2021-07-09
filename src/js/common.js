window.onload = () => {
  document.getElementsByClassName('header_button')[0].addEventListener('click', toggleNav);
  window.addEventListener('scroll',changeHeaderColor)
}

const toggleNav = () => {
  const buttonBar = document.getElementsByClassName('button_bar')[0];
  const buttonText = document.getElementsByClassName('button_menu')[0];
  const nav = document.getElementsByClassName('header_nav')[0];
  const mask = document.getElementsByClassName('bg_mask')[0];
  const isOpen = buttonBar.classList.contains('open');
  if (isOpen) {
    buttonBar.classList.remove('open');
    buttonBar.classList.add('close');
    nav.classList.remove('open');
    nav.classList.add('close');
    mask.classList.remove('open');
    mask.classList.add('close');
    buttonText.classList.remove('open');
    buttonText.classList.add('close');
  } else {
    buttonBar.classList.remove('close');
    buttonBar.classList.add('open');
    nav.classList.remove('close');
    nav.classList.add('open');
    mask.classList.remove('close');
    mask.classList.add('open');
    buttonText.classList.remove('close');
    buttonText.classList.add('open');
  }
}
const changeHeaderColor = () => {
  const fvHeight = document.getElementsByClassName('firstView')[0].clientHeight;
  const imageHeight = document.getElementsByClassName('firstView_wrapper')[0].clientHeight;
  if (window.scrollY >= imageHeight-58) {
    document.getElementsByTagName('h1')[0].classList.add('logo_black')
  } else {
    document.getElementsByTagName('h1')[0].classList.remove('logo_black')
  }
  if (window.scrollY >= fvHeight-58) {
    document.getElementsByClassName('header_button')[0].classList.add('button_black')
  } else {
    document.getElementsByClassName('header_button')[0].classList.remove('button_black')
  }
}
