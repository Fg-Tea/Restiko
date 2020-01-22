  var restikoTemplates = ' <div class="resume_restikos mt-5" data-id="###restikoId###">' +
    '<div class="row">' +
    '<div class="intro col-3">Mon restiko du:</div>' +
    '<div class="col-3">' +
    '<div class="date">###date###</div>' +
    '</div>' +
    '<div class="col-2">' +
    '<div class=" btn btn-info" onclick="viewRestiko(\'###restikoId###\')">Voir</div>' +
    '</div>' +
    '<div class="col-2">' +
    '<div id="edit_btn" class="btn btn-purple" onclick="updateRestiko(\'###restikoId###\')">Modifier</div>' +
    '</div>' +
    '<div class="col-2">' +
    '<div class="btn btn-success" onclick="deleteRestiko(\'###restikoId###\')">Supprimer</div>' +
    '</div>' +
    '</div></div>';

  base('RESTIKO').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 50000,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      console.log('Retrieved', record.get("Date"));
      var date = record.get('Date');
      var newDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');

      var restikoNouveau = "";
      var restikoNouveau = restikoTemplates.replace(/###restikoId###/gi, record.getId());
      var restikoNouveau = restikoNouveau.replace('###date###', newDate);

      $("#liste_restikos").prepend(restikoNouveau);
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  }, function done(err) {
    if (err) {
      console.error(err);
      return;
    }
  });

  function deleteRestiko(restikoId) {
    base('RESTIKO').destroy(restikoId, function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Deleted', restikoId, 'records');
    });
    $("#restikoId").remove();
    setTimeout(function () {
      document.location.reload(true);
    }, 500);
  }

  function newRestiko() {
    localStorage.setItem("mode", "nouveau");
    window.location = "new_edit.html";
  }

  function updateRestiko(restikoId) {
    localStorage.setItem("mode", "update");
    localStorage.setItem("id", restikoId);
    window.location = "new_edit.html";
  }

  function viewRestiko(restikoId) {
    localStorage.setItem("mode", "detail");
    localStorage.setItem("id", restikoId);
    window.location = "detail.html";
  }

  $(document).ready(function () {
    $("#new_restiko").on("click", function () {
      newRestiko();
    })
  })