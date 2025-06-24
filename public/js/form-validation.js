if($('[data-mask-phone-with-ddd]').length) {
  $('[data-mask-phone-with-ddd]').mask('(00) 0000-00009');
}

if($('[data-mask-3-digits]').length) {
  $('[data-mask-3-digits]').mask('999');
}



if($("[data-form-client-validation]").length) {

  

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
      submitHandler: function(form, e) {
        e.preventDefault();

        debugger
        const formIdentifier = $(form).attr("id");
        

       

        return false;


      }
    })

  })

  $("[data-campo-assunto]").each(function(){

    
    $(this).on("change", function() {
      const valorSelecionado = $(this).val();
  
      console.log(valorSelecionado)
  
      if(valorSelecionado === "workshop-lattes" || valorSelecionado === "workshop-sucupira") {
        $(this).parents("form").find("[data-numero-participantes]").removeAttr("hidden");
      } else {
        $(this).parents("form").find("[data-numero-participantes]").attr("hidden", true);
      }
      $(this).parents("form").validate();
    })
  })



}