if($('[data-mask-phone-with-ddd]').length) {
  $('[data-mask-phone-with-ddd]').mask('(00) 0000-00009');
}

if($('[data-mask-3-digits]').length) {
  $('[data-mask-3-digits]').mask('999');
}



if($("[data-form-client-validation]").length) {

  emailjs.init({
    publicKey: 'GwODNXFIOP_Rqt42p',
  });
  

  $("[data-form-client-validation]").each(function(){



    $(this).validate({
      // errorClass: "invalid-field",
      // errorElement: "p",
      rules: {
        nome: {
          required: true,
          // minWords: 2
        },
        email: {
          required: true,
          email: true
        },
        telefone: {
          required: true,
          minlength: 14
        },
        ies: 'required',
        programa: 'required',
        assunto: 'required',  
        numeroParticipantes: {
          // required: function() {
          //   console.log("THIS", $(this))
          //   return $(this).parents('form').find("[data-campo-assunto]").val() === "workshop-lattes" || $(this).parents('form').find("[data-campo-assunto]").val() === "workshop-sucupira";
          // },
          required: true,
          number: true,
          min: 20
        },       
        mensagem: 'required',         
      },
      messages: {
        nome: {
          required: "Insira seu nome",
          // minWords: "Inclua seu sobrenome"
        },
        email: {
          required: 'Insira seu e-mail corporativo',
          email: 'Insira um e-mail válido'
        },        
        telefone: {
          required: 'Insira seu telefone para contato',
          minlength: 'Insira um telefone válido'
          
        },
        ies: 'Qual é a sua instituição?',   
        programa: 'Qual é o seu programa?',   
        assunto: 'Sobre o que deseja falar?',     
        numeroParticipantes: {
          required: "Insira a quantidade de participantes",
          number: "Apenas números são permitidos",
          min: "Turmas são formadas de ao menos 20 participantes",
          // depends: function(element) {
          //   return $(this).find("[data-numero-participantes]").val() === "workshop-lattes" || $(this).find("[data-numero-participantes]") === "workshop-sucupira";
          // }          
        },                                                                                     
        mensagem: 'Digite sua mensagem',  
      },
      // errorPlacement: function(error, element) {

      // },      
      submitHandler: async function(form, e) {
        e.preventDefault();


        debugger

        const submitButton = $(form).find(":submit");
        const originalSubmitButtonText = submitButton.text();
        const loadingSubmitButtonText = "Enviando...";
        submitButton.prop("disabled", true);

        submitButton.text(loadingSubmitButtonText);
        
        let message = '';
        let status = '';        
        let assuntoEmail = '';

        const contatoAssunto = $(form).find("[name='assunto']").val();
        switch(contatoAssunto) {
          case "assessoria-sucupira" : assuntoEmail = "Assessoria Plataforma Sucupira";
          break;
          case "assessoria-lattes" : assuntoEmail = "Assessoria Currículo Lattes";
          break;
          case "workshop-sucupira" : assuntoEmail = "Workshop Plataforma Sucupira";
          break;                                        
          case "workshop-lattes" : assuntoEmail = "Workshop Currículo Lattes";
          break;                                        
          case "apcn" : assuntoEmail = "Proposta de Cursos Novos - APCN";          
          break;          
          default: assuntoEmail = "Assunto não definido"          
        }


        var formData = new FormData(form);

        formData.set("assunto", assuntoEmail);

        formData.append('service_id', 'servico_email_athena');
        formData.append('template_id', 'template_contato_athena');
        formData.append('user_id', 'GwODNXFIOP_Rqt42p');
     
        $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
            type: 'POST',
            data: formData,
            contentType: false, // auto-detection
            processData: false // no need to parse formData to string
        }).done(function() {
          message = `
                    <h4>Mensagem recebida com sucesso!</h4>
                    <p>Entraremos em contato em breve.</p>
                    `;  
            status = "positivo";   
        }).fail(function(error) {
          console.log(error)
          message = `
                      <h4>Houve um erro ao receber sua mensagem!</h4>
                      <p>Tente novamente mais tarde.</p>
                      `;              
              status = "negativo";
        }).always(function(){
          $(form).find(".form-feedback-message").attr("data-status", status);   
              $(form).find(".form-feedback-message").html(message);
              $(form).find(".form-feedback-message").removeClass("hidden");

              $(form)[0].reset();

              submitButton.text(originalSubmitButtonText);

              setTimeout(() => {
                $(form).find(".form-feedback-message").addClass("hidden");
                submitButton.prop("disabled", false);
              },3000)          
        });


        return false;

      }
    })

  })

  $("[data-campo-assunto]").each(function(){

    
    $(this).on("change", function() {
      const valorSelecionado = $(this).val();
  
      if(valorSelecionado === "workshop-lattes" || valorSelecionado === "workshop-sucupira") {
        $(this).parents("form").find("[data-numero-participantes]").removeAttr("hidden");
      } else {
        $(this).parents("form").find("[data-numero-participantes]").attr("hidden", true);
      }
      $(this).parents("form").validate();
    })
  })







}