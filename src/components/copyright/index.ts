import './style.css'

function createCopyright() {
  const app = <Element>document.querySelector('#app')
  const p = document.createElement('p')
  p.innerHTML = 'copyright@galen!!!!!'
  p.classList.add('copyright')
  app.appendChild(p)
}
export default createCopyright
