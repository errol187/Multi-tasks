/*
* 
* 
*/

// $('.js-team').modal('show');

$('#modal-aboutUs').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var t_name = button.data('teamName'); // tName //<strong></strong><br >CEO
  var t_description = button.data('teamDescription'); // tDescription
  var t_position = button.data('teamPosition'); // tPosition
  var t_image = button.data('teamImage'); // tImage

  var modal = $(this)
  var modalCopy = modal.find('.mod__info-copy');
  modalCopy.find('#tNamePosition').html('<strong>' + t_name + '</strong><br />' + t_position);
  modalCopy.find('#tDescription').text(t_description);
  //modal.find('#tNamePosition').text(t_position);
  modalCopy.find('#tImage').attr("src", t_image);
})

// .find("#tNamePosition")