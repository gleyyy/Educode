// ---------------------- DESAFIOS ----------------------
// Exemplo: Array de desafios iniciante (mesmo do protótipo anterior)
const desafiosIniciante = [
  {explicacao:"O que é análise de requisitos?", pergunta:"Qual a definição correta de análise de requisitos?", alternativas:["Processo de codificação","Coleta e entendimento das necessidades","Design de banco de dados"], correta:1, explicacaoCorreta:"A análise de requisitos é o processo de identificar, documentar e compreender o que o sistema deve fazer."},
  // ... restante dos 15 desafios iniciante
];

const desafiosMediano = [
  // perguntas sobre HTML, CSS, JS básico com explicação e alternativas
];

const desafiosEmergente = [
  // perguntas avançadas HTML, CSS, JS
];

const desafiosProPlayer = [
  // perguntas práticas de código
  // cada item deve ter: explicacao, pergunta, tipo:"pratico", avaliarCodigo(codigo)
];

let faseAtual = "iniciante";
let desafiosAtuais = [...desafiosIniciante];
let indiceAtual = 0;

function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
function carregarDesafio(){
  const d = desafiosAtuais[indiceAtual];
  document.getElementById("faseAtual").innerText = capitalize(faseAtual);
  document.getElementById("numeroDesafio").innerText = indiceAtual+1;
  document.getElementById("explicacao").innerText = d.explicacao;
  document.getElementById("pergunta").innerText = d.pergunta;

  if(d.tipo!=="pratico"){
    document.getElementById("alternativas").style.display="block";
    document.getElementById("codigoUsuario").style.display="none";
    const altContainer = document.getElementById("alternativas");
    altContainer.innerHTML = "";
    d.alternativas.forEach((a,i)=>{
      const btn=document.createElement("button");
      btn.innerText = a;
      btn.onclick=()=>enviarAlternativa(i);
      altContainer.appendChild(btn);
    });
  }else{
    document.getElementById("alternativas").style.display="none";
    document.getElementById("codigoUsuario").style.display="block";
  }
  document.getElementById("feedback").innerText="";
}

function enviarAlternativa(ind){
  const d = desafiosAtuais[indiceAtual];
  if(ind===d.correta){
    document.getElementById("feedback").innerText="✅ Correto! "+(d.explicacaoCorreta||"");
    indiceAtual++;
    if(indiceAtual>=desafiosAtuais.length) avancarFase();
    else setTimeout(carregarDesafio,1000);
  }else{
    document.getElementById("feedback").innerText="❌ Incorreto. "+(d.explicacaoCorreta||"");
  }
}

document.getElementById("botaoEnviar").addEventListener("click",()=>{
  if(faseAtual==="proplayer"){
    const codigo=document.getElementById("codigoUsuario").value;
    const resultado = desafiosProPlayer[indiceAtual].avaliarCodigo(codigo);
    if(resultado.correto){
      document.getElementById("feedback").innerText="✅ Correto!";
      // Atualiza pontuação do usuário logado (simulado)
      let usuarios=JSON.parse(localStorage.getItem('usuarios')||'[]');
      if(usuarios.length>0){ usuarios[0].pontos+=10; localStorage.setItem('usuarios',JSON.stringify(usuarios));}
      indiceAtual++;
      if(indiceAtual>=desafiosProPlayer.length){
        document.getElementById("feedback").innerText="🎉 Parabéns, você concluiu todos os nossos desafios, é um verdadeiro campeão! 🏆";
      }else setTimeout(carregarDesafio,1000);
    }else{
      document.getElementById("feedback").innerText="❌ Incorreto: "+resultado.feedback;
    }
  }
});

function avancarFase(){
  if(faseAtual==="iniciante"){ faseAtual="mediano"; desafiosAtuais=[...desafiosMediano]; }
  else if(faseAtual==="mediano"){ faseAtual="emergente"; desafiosAtuais=[...desafiosEmergente]; }
  else if(faseAtual==="emergente"){ faseAtual="proplayer"; desafiosAtuais=[...desafiosProPlayer]; }
  indiceAtual=0;
  carregarDesafio();
}

carregarDesafio();