var citas = citas || {};
citas.Index = citas.Index || {};

citas.Index = (function () {
  "use strict";
  let IndexLoad = function () {
    let flag = false;
    this.initialize = function () {
      $(".back-to-top").click();
      $("#colServices").hide();
      $("#colFrmFeedBack").show();
      $("#testimonios").hide();
      sendFeedBack();
      subscribe();
    };

    let sendFeedBack = function () {
      $("input:checkbox").click(function () {
        $("input:checkbox").prop("checked", true);
        $("#despues").prop("checked", false);
        $("input:checkbox").prop("disabled", "disabled");
        if (flag == false) {
          setTimeout(function () {
            $.confirm({
              title: "Agradecemos tu preferencia",
              content: "Tus respuestas seran enviadas de forma automatica",
              autoClose: "send|3000",
              buttons: {
                send: {
                  text: "Enviar",
                  btnClass: "btn btn-primary",
                  action: function () {
                    sendAnswers();
                  },
                },
                cancelAction: {
                  text: "Cancelar",
                  btnClass: "btn btn-danger",
                  action: function () {
                    $("input:checkbox").prop("checked", false);
                    $("input:checkbox").removeAttr("disabled");
                  },
                },
              },
            });
          }, 1000);
        }
      });

      $("#frmfeedBack").submit(function (event) {
        event.preventDefault();
        flag = true;
        sendAnswers();
      });
    };

    let sendAnswers = function () {
      let answers = $("#frmfeedBack").serializeArray();
      let nombre = $("#txtNombre").val();      
      let acum = 0;      
      answers.forEach((element) => {
        if (element.value == "true") acum++;
      });            
      $.ajax({
        type: "POST",
        url:"https://prod-09.centralus.logic.azure.com:443/workflows/73818ae4c60b41438a969f2933a3fb20/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xPPc1DV7cFmV4IENXSzrieDvfOTXffNw55gHK6gxSj8",
        dataType: "json",
        data: JSON.stringify({Nombre : nombre, Calificacion : acum}),        
        contentType: "application/json",
      })        
      $("#colFrmFeedBack").hide("slow");
      $("#colServices").show("slow");
      $("#encuesta").click();
    };

    let subscribe = function () {
      $(".btnSubscribe").click(function () {
        let type = parseInt($(this).attr("data-type"));
        let titulo = type == 1 ? "¿Juguetona he?" : "¡No te arrepentiras!";
        let nombre = $("#txtNombre").val();      
        let mensaje = type == 1 ? "Una vaca mas al ganado." : "Despidete del ganado.";
        let plan = type == 1 ? "Ocasional" : "Premium";
        $.ajax({
          type: "POST",
          url:"https://prod-04.southcentralus.logic.azure.com:443/workflows/ad021e82d8194886a2ec45a1b69c6c21/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VVMTaOt8rJ4TLYw95CGKDz4JCa3wFK-xKEHYzG9VhNU",
          dataType: "json",
          data: JSON.stringify({Nombre : nombre, Mensaje : mensaje, Plan : plan}),        
          contentType: "application/json",
        })        
        $.alert({
          title: titulo,
          content: "Pronto nos pondremos en contacto contigo.",
          buttons: {
            confirm: {
              text: "Ok",
              btnClass: "btn btn-primary",
              action: function () {
                location.reload();
              },
            },
          },
        });
      });
    };
  };
  return new IndexLoad();
})();
(function ($, window, document) {
  "use strict";
  $(function () {
    citas.Index.initialize();
  });
})(window.jQuery, window, document);
