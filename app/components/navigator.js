var index = 0;

function buildNavigator(length, onClick) {
  var indicator = $("#indicator").empty();

  indicator.append("<div></div>".repeat(length));

  function navigate(direction) {
    var idx = index + direction;
    console.log(idx);

    if (idx >= 0 && idx < length) {
      index = idx;
      setSelectedIndicator(idx);
      onClick(idx);
    }
  }

  function setSelectedIndicator(idx) {
    var children = indicator.children();

    children.removeClass("selected");
    children.eq(idx).addClass("selected");
  }

  function addEventHandlers() {
    $("#button-right").click(() => navigate(1));
    $("#button-left").click(() => navigate(-1));
  }

  addEventHandlers();
  navigate(0); // Add "selected" class to first element
}

function emptyNavigator() {
  $("#indicator").empty();
}
