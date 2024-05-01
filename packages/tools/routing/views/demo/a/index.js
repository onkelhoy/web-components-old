window.onload = () => {
  console.log('document A loaded');
  document.querySelector('button#btn').onclick = () => {
    console.log('document A click');
  }
}