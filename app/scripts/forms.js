const forms = [
  {
    id: 0,
    name: "Warranty Registration",
    jotformId: "62344566898371",
  },
  {
    id: 1,
    name: "Back Garden Delivery",
    jotformId: "73314427413349",
  },
  {
    id: 2,
    name: "RMA",
    jotformId: "80526858123358",
  },
];

function buildFormFilter(form, email, ticketId) {
  var filter;

  switch (form.id) {
    case 0:
      filter = { "q4:matches:email": email };
      break;
    case 1:
      filter = { "q4:matches:email4": email };
      break;
    case 2:
      filter = { "q74:matches:ticketNumber": ticketId };
      break;
    default:
      alert("Invalid form: ", form);
  }

  return JSON.stringify(filter);
}

// prettier-ignore
function buildSubmissionContent(form, submission) {
  const { answers } = submission;

  switch (form.id) {
    case 0:
      var date = answers["17"].answer;

      var product = answers["21"].answer;
      var style = getProductColour(product);
      return $(`
          <div class="submission">
            <div>
              <span>Purchase Date</span>
              <div>${date.day}/${date.month}/${date.year}</div>
              <span>Product</span>
              <div class="product" style="${style}">${product}</div>
              <span>Address</span>
              <div>${answers["5"].answer.addr_line1}</div>
              <div>${answers["5"].answer.city}</div>
              <div>${answers["5"].answer.state}</div>
              <div>${answers["5"].answer.postal}</div>
            </div>
            <button name="${submission.id}" id="view">View</button>
          </div>
        `);
    case 1:
      var date = answers["17"].answer;

      var product = answers["32"].answer;
      var style = getProductColour(product);
      return $(`
          <div class="submission">
            <div>
              <span>Order Number</span>
              <div>${answers["6"].answer || "Not given"}</div>
              <span>Spa Model</span>
              <div class="product" style="${style}">${product || "Not given"}</div>
              <span>Address</span>
              <div>${answers["5"].answer.addr_line1}</div>
              <div>${answers["5"].answer.city}</div>
              <div>${answers["5"].answer.state}</div>
              <div>${answers["5"].answer.postal}</div>
            </div>
            <button name="${submission.id}" id="view">View</button>
          </div>
        `);
    case 2:
      return $(`
          <div class="submission">
            RMA
          </div>
        `);
    default:
      alert("Invalid form");
  }
}
