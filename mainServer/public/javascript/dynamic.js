$(function () {


})

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
