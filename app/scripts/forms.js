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
      console.error("Invalid form: ", form);
  }

  return JSON.stringify(filter);
}

function buildSubmissionContent(form, submission) {
  const { answers } = submission;

  switch (form.id) {
    case 0:
      var date = answers["17"].answer;

      var product = answers["21"].answer;
      var style = buildProductColour(product);
      return $(`
          <div class="submission">
            <span>Purchase Date</span>
            <div>${date.day}/${date.month}/${date.year}</div>
            <span>Product</span>
            <div class="product" style="${style}">${answers["21"].answer}</div>
            <span>Address</span>
            <div>${answers["5"].answer.addr_line1}</div>
            <div>${answers["5"].answer.city}</div>
            <div>${answers["5"].answer.state}</div>
            <div>${answers["5"].answer.postal}</div>
            <button name="${submission.id}" id="view">View</button>
          </div>
        `);
    case 1:
      return $(`
          <div class="submission">
            Back garden delivery
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

function buildProductColour(product) {
  switch (product) {
    case "Alberta":
      return "background-color: rgb(255, 207, 164);";
    case "Calgary":
      return "background-color: rgb(255, 216, 207);";
    case "Cambridge SE":
      return "background-color: rgb(253, 218, 243);";
    case "Grand Bend":
      return "background-color: rgb(224, 210, 255);";
    case "Grand Rapids":
      return "background-color: rgb(195, 240, 235);";
    case "Halifax":
      return "background-color: rgb(215, 239, 252);";
    case "Hamilton":
      return "background-color: rgb(218, 245, 201);";
    case "Kelowna SE":
      return "background-color: rgb(237, 232, 195);";
    case "Kingston":
      return "background-color: rgb(250, 213, 180);";
    case "Montreal":
      return "background-color: rgb(222, 229, 242);";
    case "Muskoka":
      return "background-color: rgb(178, 225, 239);";
    case "Niagara":
      return "background-color: rgb(255, 225, 208);";
    case "Niagara Falls":
      return "background-color: rgb(244, 203, 255);";
    case "Okanagan":
      return "background-color: rgb(222, 227, 255);";
    case "Ottawa":
      return "background-color: rgb(241, 226, 179);";
    case "Quebec":
      return "background-color: rgb(197, 220, 255);";
    case "Rio Grange":
      return "background-color: rgb(190, 238, 192);";
    case "Saskatoon":
      return "background-color: rgb(213, 211, 255);";
    case "St. Lawrence 13' Swim Spa":
      return "background-color: rgb(255, 199, 199);";
    case "St. Lawrence 16' Swim Spa":
      return "background-color: rgb(255, 232, 172);";
    case "St. Lawrence 20' Swim Spa":
      return "background-color: rgb(249, 207, 99);";
    case "Swift Current V1":
      return "background-color: rgb(255, 186, 122);";
    case "Swift Current V2":
      return "background-color: rgb(255, 178, 162);";
    case "Thunder Bay":
      return "background-color: rgb(246, 184, 229);";
    case "Toronto":
      return "background-color: rgb(191, 164, 252);";
    case "Toronto SE":
      return "background-color: rgb(144, 235, 225);";
    case "Vancouver":
      return "background-color: rgb(187, 228, 252);";
    case "Victoria":
      return "background-color: rgb(180, 228, 149);";
    case "Winnipeg":
      return "background-color: rgb(219, 213, 163);";
    case "Yukon":
      return "background-color: rgb(234, 177, 123);";
    case "Sauna - Jasper":
      return "background-color: rgb(200, 210, 228);";
    case "Sauna - Chilliwack":
      return "background-color: rgb(150, 208, 226);";
    case "Sauna - Huron":
      return "background-color: rgb(241, 206, 186);";
    case "Sauna - Banff":
      return "background-color: rgb(255, 148, 149);";
    case "Sauna - Whistler":
      return "background-color: rgb(229, 148, 255);";
    case "Sauna - Aspen":
      return "background-color: rgb(171, 183, 231);";
    case "Fraser Gazebo":
      return "background-color: rgb(228, 203, 126);";
    case "Other":
      return "background-color: rgb(143, 188, 255);";
    default:
      return "background-color: pink;";
  }
}
