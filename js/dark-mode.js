const darkModeButton = document.querySelector('button[aria-label="dark-mode"]');

export const darkMode = () => {
  darkModeButton.addEventListener('click', () => {
    const body = document.body;
    const buttonText = darkModeButton.querySelector('span');
    body.classList.toggle('dark-mode');
    buttonText.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
}
