var res_lat = document.getElementById('res_lat')
var res_long = document.getElementById('res_long')
var btn_env_cep = document.getElementById('btn_env_cep')
var localizacao = []
tiochico = [-22.74728, -50.57567]
var btn_distancia = document.getElementById('btn_distancia')
var calc_distancia = 0

btn_env_cep.addEventListener('click', function(e){
  e.preventDefault()
  var cepe = document.getElementById('cepe').value;
  console.log(typeof(cepe))
  var cepValidado = validarCEP(cepe);
  console.log("CEP válido:", cepValidado);
  buscarCEP(cepValidado)
  exibir_dados.style.display = 'block'  
})

var exibir_dados = document.getElementById('btn_exibir_dados')
exibir_dados.addEventListener('click', function(){
  var rua = document.getElementById('res_rua')
  var bairro = document.getElementById('res_bairro')
  var cidade = document.getElementById('res_cidade')
  rua.innerHTML = localizacao[2]
  bairro.innerHTML = localizacao[3]
  cidade.innerHTML = localizacao[4]
  btn_distancia.style.display = 'block'

})




btn_distancia.addEventListener('click', function(){
  var res_distancia = document.getElementById('res_distancia')

  const distancia = calcularDistancia(-22.74728, -50.57567, localizacao[0], localizacao[1]);
  var calc_distancia = distancia * 0.8
  res_distancia.innerHTML = 'A distancia do tio-chico é '+ distancia + 'Km <br>valor da taxa de entrega R$'+ calc_distancia + ',00'
  console.log('Distância entre as coordenadas:', distancia.toFixed(2), 'km');

})


// Função para buscar informações do CEP na API do Brasil API e extrair latitude e longitude

function buscarCEP(cep) {
  // URL da API do Brasil API para buscar informações do CEP
  const apiUrl = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  // Fazendo a requisição para a API
  fetch(apiUrl)
      .then(response => {
          // Verificando se a resposta da requisição foi bem sucedida
          if (!response.ok) {
              throw new Error('Erro ao buscar informações do CEP');
          }
          // Convertendo a resposta para JSON
          return response.json();
      })
      .then(data => {
          // Extraindo latitude e longitude do objeto retornado pela API
          localizacao.push(data.location.coordinates.latitude);
          localizacao.push(data.location.coordinates.longitude);
          localizacao.push(data.street)
          localizacao.push(data.neighborhood)
          localizacao.push(data.city)
          console.log(data)
        

          // Exibindo as informações no console
          console.log('Latitude:', localizacao[0]);
          console.log('Longitude:', localizacao[1]);
          console.log('rua',localizacao[2])
          console.log('bairro',localizacao[3])
          console.log('cidade',localizacao[4])


          // Você pode usar as variáveis latitude e longitude conforme necessário aqui
      })
      .catch(error => {
          // Exibindo mensagens de erro no console, caso ocorra algum problema
          console.error('Ocorreu um erro:', error);
      });
}






// Função para calcular a distância em quilômetros entre duas coordenadas geográficas (latitude e longitude)
function calcularDistancia(lat1, lon1, lat2, lon2) {
  
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * Math.PI / 180; // Diferença de latitude em radianos
  const dLon = (lon2 - lon1) * Math.PI / 180; // Diferença de longitude em radianos

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Ângulo central entre os pontos

const distancia = Math.round(R * c); // Distância em quilômetros

return distancia;
}

function validarCEP(entrada) {
  // Remove todos os caracteres não numéricos, exceto o hífen
  var cepLimpo = entrada.replace(/[^\d-]/g, '');
  
  // Remove todos os hífens duplicados
  cepLimpo = cepLimpo.replace(/-{2,}/g, '-');
  
  // Remove o hífen se estiver no início ou no fim
  cepLimpo = cepLimpo.replace(/^-+|-+$/g, '');

  return cepLimpo;
}








