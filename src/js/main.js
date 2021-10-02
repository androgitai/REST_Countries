import '../style/style.scss';
import image from '../img/flag.jpg';

const colorModeButton = document.querySelector('.btn-mode');

document.querySelectorAll('.card-img').forEach(card => (card.src = image));

colorModeButton.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  console.log(theme);
  document.documentElement.setAttribute('data-theme', `${theme === 'light' ? 'dark' : 'light'}`);
});
