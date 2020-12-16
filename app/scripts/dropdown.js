function buildDropdown(options, onChange) {
  var dropdown = $("#dropdown");

  dropdown.append(
    options.map((option) => {
      const { name, value } = option;
      return $("<option>").text(name).val(value);
    })
  );

  dropdown.change((element) => {
    var value = $(element.target).val();

    var option = options.find((opt) => opt.value === value);

    onChange(option);
  });
}
