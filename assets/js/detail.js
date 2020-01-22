    
    $(document).ready(function () {
        setTimeout(function () {
            var monStockage = localStorage.getItem("id")
            getRestiko(monStockage)
        }, 1000);
    })

    function getRestiko(restikoId) {

        base('RESTIKO').find(restikoId, function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            var date = record.get("Date");
            var newDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
            var fais = record.get("Ce que j'ai fait");
            var appris = record.get("Ce que j'ai appris");
            var aime = record.get("Ce que j'ai aimé");
            var nouveau = record.get("Ce que j'ai utilisé de nouveaux");
            var problems = record.get("Problématiques  rencontrées");
            var objectif = record.get("Quels sont les objectifs ?");
            var manque = record.get("Qu'est-ce qui m'a manqué ?");
            var formateur = record.get("Qu'est-ce que tu ferais à la place du formateur ?");
            var succes = record.get("Objectif atteint ou pas");
            var rating = record.get("Field 13");

            $("#date").html(newDate);
            $("#do").html(fais);
            $("#learn").html(appris);
            $("#like").html(aime);
            $("#new").html(nouveau);
            $("#problems").html(problems);
            $("#objectif").html(objectif);
            $("#miss").html(manque);
            $("#former").html(formateur);
            $("#success").html(succes);
            $("#rating").html(rating);

            console.log('Retrieved', record.id);
        });
    }