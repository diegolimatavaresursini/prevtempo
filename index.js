const formulario = document.getElementById('procurar')

formulario.addEventListener('submit', async (event) =>{
  event.preventDefault()

  try {
    const cidade = document.getElementById("cidade").value
    if (cidade === '') {
      throw new Error("ERRO: Não inseriu uma cidade");
    }

    const apiKEY = 'ad2b957eac969c56ed11226cecc59dd9'
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${apiKEY}&units=metric&lang=pt_br`

    const res = await fetch(apiURL)
    if (!res.ok) {
      throw new Error('ERRO: erro ao buscar dados')
    }

    const dados = await res.json()
    console.log(dados)

    let nomeCidade = document.querySelector('#nome-cidade')
    nomeCidade.textContent = dados.name

    let temperatura = document.querySelector('#temperatura')
    temperatura.textContent = `${dados.main.temp} Cº`

    let descricao = document.querySelector('#temperatura-descricao')
    descricao.textContent = dados.weather[0].description

    let humidade = document.querySelector('#humidade')
    humidade.textContent = `${dados.main.humidity}% de umidade`  

    let vento = document.querySelector('#vento')
    const velocidade = dados.wind.speed * 3.6
    vento.textContent = `${velocidade.toFixed(2)} km/h`

  } catch (error) {
    alert(error.message)
  }
})