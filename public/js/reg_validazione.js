$().ready(function() {
  $("#reg_form").validate({
    rules: {
      nome: "required",
      cognome: "required",
      password: {
        required: true,
        minlength: 7
      },
      cf: {
        required: true,
        codfiscale: true
      },
      telefono: {
        required: true,
        cellphone: true
      },
      confirm_password: {
        required: true,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      termini_condizioni: "required",
      comitato: "required"
    },
    groups: {
      comitato: "gruppo"
    },
    errorPlacement: function(error, element) {
      if (element.attr("name") == "comitato") {
        error.insertAfter($("h5"));
      }else{
        error.insertAfter(element);
      }
    },
    messages: {
      nome: "inserisci il tuo nome",
      cognome: "inserisci il tuo cognome",
      password: {
        required: "inserisci una password",
        minlength: "inserisci una password di almeno 7 caratteri"
      },
      confirm_password: {
        required: "conferma la password",
        equalTo: "le password non corrispondono"
      },
      email: {
        required: "inserisci una mail",
        email: "inserisci una mail valida"
      },
      termini_condizioni: "accetta i termini e le condizioni",
      comitato: "seleziona un comitato",
      cf: {
        required: "inserisci il tuo codice fiscale"
      },
      telefono: {
        required: "inserisci il tuo numero di telefono"
      }
    }
  });
  jQuery.validator.addMethod("codfiscale", function(value) {
    var regex = /[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}/;
    return value.match(regex);
  }, "inserisci un codice fiscale corretto");
  jQuery.validator.addMethod("cellphone", function(value) {
    var regex = /[0-9]{10}/;
    return value.match(regex);
  }, "inserisci un numero di telefono corretto");
});
