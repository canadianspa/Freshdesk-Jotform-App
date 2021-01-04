function buildNavigator(length, onClick) {
  var index = 0;
  var indicator = $("#indicator").empty();

  indicator.append("<div></div>".repeat(length));

  function navigate(direction) {
    var idx = index + direction;

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
    // Remove previous event handlers
    $("#button-right").off("click");
    $("#button-left").off("click");
    $("#button-right").click(() => navigate(1));
    $("#button-left").click(() => navigate(-1));
  }

  addEventHandlers();
  navigate(0); // Add "selected" class to first element
}

function emptyNavigator() {
  $("#indicator").empty();
}
