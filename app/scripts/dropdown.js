function buildDropdown(options, onChange) {
  var dropdown = $("#dropdown");

  $.map(options, function (option) {
    const { name, id } = option;

    $("<option>").text(name).val(id).appendTo(dropdown);
  });

  addEventHandler(onChange);
}

function addEventHandler(onChange) {
  $("#dropdown").on("change", function () {
    var value = $(this).val();
    onChange(value);
  });
}
