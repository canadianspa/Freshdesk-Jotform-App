function emptyNavigator() {
  $("#indicator").empty();
}

function buildNavigator(options, onClick) {
  var index = 0;

  var indicator = $("#indicator")
    .empty()
    .append("<div></div>".repeat(options.length));

  addEventHandlers();
  onNavigateClick(0); // Load initial option

  function addEventHandlers() {
    // Remove previous event handlers
    $("#button-right").off("click");
    $("#button-left").off("click");

    $("#button-right").click(function () {
      onNavigateClick(1);
    });
    $("#button-left").click(function () {
      onNavigateClick(-1);
    });
  }

  function onNavigateClick(direction) {
    var idx = index + direction;

    if (idx >= 0 && idx < options.length) {
      index = idx;
      setSelectedIndicator(idx);
      onClick(options[idx]);
    }
  }

  function setSelectedIndicator(idx) {
    var children = indicator.children();

    children.removeClass("selected");
    children.eq(idx).addClass("selected");
  }
}
