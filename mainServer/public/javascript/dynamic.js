$(function () {


})

/*
function getOrder() {
    var id;
    var original_link = "";
    $('#order').on('change', function(){
            //$('.apply').attr('href', original_link);
            id = $(this).val();
            var new_href = $('.apply').attr('href') + id;
            //$('.apply').attr('href', new_href);
            document.querySelector('#order').setAttribute("href", new_href);
    });
}
*/
/*
$('apply').on('click', function() {
    var text = $('#myInput').val() + ' ' + $('#mySelect').val();
    alert(text);
  })
  */


$(document).on('change', '#order', function() {
    var value = $(this).val();
    console.log(value)
    $('#apply').attr('href', value);
});