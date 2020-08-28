$().ready(function() {
  $(".disabilitabile").prop("disabled",true);
  $(".trigger").on("click",function(){
    $(".disabilitabile").prop("disabled", false);
    });
});
