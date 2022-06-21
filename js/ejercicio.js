let cargarDatos = () =>{
  fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser()
      const xml = parser.parseFromString(data,"application/xml")
      let escritores = xml.getElementsByTagName("escritor")
      text = ``
      for(let escritor of escritores){
          let id = escritor.getElementsByTagName('id')[0].textContent
          let nombre = escritor.getElementsByTagName('nombre')[0].textContent
          text+=`
          <option value="${id}">${nombre}</option>
          `
      }
      let select = document.querySelector("div.input-group > select")
      select.innerHTML += text
    })
    .catch(console.error)
}

let cargarFrases = (id, autor) => {
  const frasesContainer = document.querySelector('#frases')
  fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
    .then(response => response.json())
    .then(({frases}) => {
      let textoContenedor = ``
      for (let frase of frases) {
        if(frase.id_autor === id){
          textoContenedor+=`
          <div class="col-lg-3">
            <div class="test-inner ">
              <div class="test-author-thumb d-flex">
                <div class="test-author-info">
                  <h4>${autor}</h4>                                            
                </div>
              </div>
              <span>${frase.texto}</span>
              <i class="fa fa-quote-right"></i>
            </div>
          </div>
          `
        }
      }
      frasesContainer.innerHTML = textoContenedor
    })
}

document.addEventListener("DOMContentLoaded", event => {
  cargarDatos()
  
  alert()

})

const selectElement = document.querySelector('div.input-group > select')
selectElement.addEventListener('change', event => {
  let id = event.target.value
  let autor = selectElement.options[selectElement.selectedIndex].text
  cargarFrases(Number(id), autor)
})