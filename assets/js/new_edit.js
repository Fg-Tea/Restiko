  var date, fait, appris, aime, nouveau, problem, objectif, manque, formateur, succes, rating;

  function getValueFromForm() {
    date = $("#date_restiko").val();
    fait = $("#fait_restiko").val();
    appris = $("#appris_restiko").val();
    aime = $("#aime_restiko").val();
    nouveau = $("#utilise_restiko").val();
    problem = $("#problem_restiko").val();
    objectif = $("#objectif_restiko").val();
    manque = $("#manque_restiko").val();
    formateur = $("#formateur_restiko").val();
    succes = $("#atteint_restiko").val();
    rating = parseInt($("#rating_restiko").val());
  }

  $(document).ready(function () {
    var mode = localStorage.getItem("mode");
    if (mode == "nouveau") {
      getFormForNewRestiko();
    } else {
      getFormForEditRestiko();
    }
  });

  // create mode
  function getFormForNewRestiko() {
    // reset le formulaire
    $("#date_restiko").val("")
    $("#fait_restiko").val("")
    $("#appris_restiko").val("")
    $("#aime_restiko").val("")
    $("#utilise_restiko").val("")
    $("#problem_restiko").val("")
    $("#objectif_restiko").val("")
    $("#manque_restiko").val("")
    $("#formateur_restiko").val("")
    $("#atteint_restiko").val("")
    $("#rating_restiko").val("")
    // Afficher le bouton create
    $("#create_restiko").show();
    $("#modifier_restiko").hide();
  }

  function create() {
    getValueFromForm();
    base('RESTIKO').create([{
      "fields": {
        "Date": date,
        "Ce que j'ai aimé": aime,
        "Ce que j'ai fait": fait,
        "Ce que j'ai utilisé de nouveaux": nouveau,
        "Ce que j'ai appris": appris,
        "Problématiques  rencontrées": problem,
        "Quels sont les objectifs ?": objectif,
        "Qu'est-ce qui m'a manqué ?": manque,
        "Personne (Initiales)": {
          "id": "usrVA8D2T1b8KxCEw",
          "email": "teaariki@gmail.com",
          "name": "FONG Tea"
        },
        "Qu'est-ce que tu ferais à la place du formateur ?": formateur,
        "Objectif atteint ou pas": succes,
        "Field 13": rating,
      }
    }], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
    setTimeout(function () {
      window.location = "list.html";
    }, 500);

  }
  // Update mode
  function getFormForEditRestiko() {
    var restikoId = localStorage.getItem("id");
    console.log("restikoId", restikoId);

    base('RESTIKO').find(restikoId, function (err, record) {
      console.log("record", record);
      if (err) {
        console.error(err);
        return;
      }
      $("#date_restiko").val(record.get("Date"));
      $("#fait_restiko").val(record.get("Ce que j'ai fait"));
      $("#appris_restiko").val(record.get("Ce que j'ai appris"));
      $("#aime_restiko").val(record.get("Ce que j'ai aimé"));
      $("#utilise_restiko").val(record.get("Ce que j'ai utilisé de nouveaux"));
      $("#problem_restiko").val(record.get("Problématiques  rencontrées"));
      $("#objectif_restiko").val(record.get("Quels sont les objectifs ?"));
      $("#manque_restiko").val(record.get("Qu'est-ce qui m'a manqué ?"));
      $("#formateur_restiko").val(record.get("Qu'est-ce que tu ferais à la place du formateur ?"));
      $("#atteint_restiko").val(record.get("Objectif atteint ou pas"));
      $("#rating_restiko").val(record.get("Field 13"));
      console.log('Retrieved', record.id);
    });
    $("#create_restiko").hide();
    $("#modifier_restiko").show();
  }
  // pour enregistrer les modifications
  function update() {
    var restikoId = localStorage.getItem("id");
    getValueFromForm()
    base('RESTIKO').update([{
      "id": restikoId,
      "fields": {
        "Date": date,
        "Ce que j'ai fait": fait,
        "Ce que j'ai appris": appris,
        "Ce que j'ai aimé": aime,
        "Ce que j'ai utilisé de nouveaux": nouveau,
        "Problématiques  rencontrées": problem,
        "Quels sont les objectifs ?": objectif,
        "Qu'est-ce qui m'a manqué ?": manque,
        "Qu'est-ce que tu ferais à la place du formateur ?": formateur,
        "Personne (Initiales)": {
          "id": "usrVA8D2T1b8KxCEw",
          "email": "teaariki@gmail.com",
          "name": "FONG Tea"
        },
        "Objectif atteint ou pas": succes,
        "Field 13": rating
      }
    }], function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
    });
    setTimeout(function () {
      window.location = "list.html";
    }, 500);
  }

  $("#retour").on("click", function () {
    window.location = "list.html"
    localStorage.clear();
  })