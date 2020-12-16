const forms = [
  {
    name: "Warranty Registration",
    value: "warrantyReg",
    id: "62344566898371",
  },
  {
    name: "RMA",
    value: "rma",
    id: "80526858123358",
  },
  {
    name: "Back Garden Delivery",
    value: "backGardenDelivery",
    id: "73314427413349",
  },
];

function buildFormFilter(form, email, ticketId) {
  var filter;

  switch (form.name) {
    case "Warranty Registration":
      filter = { "q4:matches:email": email };
      break;
    case "Back Garden Delivery":
      filter = { "q4:matches:email4": email };
      break;
    case "RMA":
      filter = { "q74:matches:ticketNumber": ticketId };
      break;
    default:
      console.error("Invalid form: ", form);
  }

  return JSON.stringify(filter);
}

function buildSubmissionContent(form, submission) {
  const { answers } = submission;

  switch (form.name) {
    case "Warranty Registration":
      return $(`
          <div class="submission">
            <span>Country</span>
            <div>${answers["25"].answer}</div>
            <span>Purchase Date</span>
            <div>${answers["17"].prettyFormat}</div>
            <span>Product</span>
            <div class="product">${answers["21"].answer}</div>
            <button>View</button>
          </div>
        `);
    case "RMA":
      return $(`
          <div class="submission">
            TODO
          </div>
        `);
    case "Back Garden Delivery":
      return $(`
          <div class="submission">
            TODO
          </div>
        `);
    default:
      alert("Invalid form");
  }
}
