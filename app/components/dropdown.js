function buildDropdown(options, onChange) {
  var dropdown = $("#dropdown");

  dropdown.append(
    options.map(
      (option) => `<option value="${option.id}">${option.name}</option>`
    )
  );

  dropdown.change((element) => {
    var value = $(element.target).val();
    var id = parseInt(value);

    var option = options.find((opt) => opt.id === id);

    onChange(option);
  });
}
