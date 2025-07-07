$(".dark-btn").click(
    function(){
  $(".box").toggleClass("dark");
  $("body").toggleClass("dark");

});

$(".spin-btn").click(
    function(){
        $(".box").toggleClass("spin");
    }
);
$(".reveal-btn").click(
    function(){
//$(".sugie").addClass("reveal"); //
//$(".sugie").css("display", "block"); //
$(".sugie").show();

//$(".reveal.btn").css("display", "none"); //
$(".reveal-btn").hide();
    }
);
$( "#draggable" ).draggable({
    snap:true,
containment:".container",
scroll:false,
stack:".draggable"
});


