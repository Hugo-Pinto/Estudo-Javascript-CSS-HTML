import geraCPF from './modules/geraCPF';
import './assets/css/style.css';
import GeraCPF from './modules/geraCPF';


(function(){
    const cpfGerado = document.querySelector('.cpf-gerado');
    const cpf = new GeraCPF();
    cpfGerado.innerHTML = cpf.geraNovoCpf();
})();