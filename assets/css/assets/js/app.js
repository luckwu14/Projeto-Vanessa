// Validação bootstrap e lógica de formulário
(function(){
  'use strict';
  // Bootstrap validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form=>{
    form.addEventListener('submit', function(e){
      e.preventDefault();
      e.stopPropagation();
      // custom senha check
      const senha = document.getElementById('senha');
      const conf = document.getElementById('confSenha');
      if (senha && conf && senha.value !== conf.value) {
        conf.setCustomValidity('Senhas não conferem');
      } else if (conf) {
        conf.setCustomValidity('');
      }
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      form.classList.add('was-validated');
      // Simulação de envio
      const msg = document.getElementById('formMsg');
      msg.innerHTML = '<div class="alert alert-success">Cadastro simulado com sucesso. Em produção, envie para o servidor via fetch.</div>';
      // Para visualizar upload localmente (preview)
      const arquivo = document.getElementById('documento');
      if (arquivo && arquivo.files && arquivo.files[0]) {
        const file = arquivo.files[0];
        if (file.size > 5 * 1024 * 1024) {
          msg.innerHTML = '<div class="alert alert-danger">Arquivo excede 5MB.</div>';
          return;
        }
        // se imagem, mostrar preview
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e){
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'img-thumbnail mt-3';
            img.style.maxWidth = '200px';
            msg.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else {
          msg.innerHTML += `<div class="mt-2"><strong>Arquivo:</strong> ${file.name} (${Math.round(file.size/1024)} KB)</div>`;
        }
      }
    }, false);
  });

  // Máscara simples de CPF
  const cpfEl = document.getElementById('cpf');
  if (cpfEl) {
    cpfEl.addEventListener('input', function(){
      let v = this.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      this.value = v;
    });
  }
})();