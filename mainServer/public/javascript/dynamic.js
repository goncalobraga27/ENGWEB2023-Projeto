$(function () {


})

$(document).on('change', '#order', function() {
    var value = $(this).val();
    console.log(value)
    $('#apply').attr('href', value);
});