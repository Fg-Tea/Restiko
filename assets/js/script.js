// Page de connection
var admin = {
    pseudo: "Tea",
    password: "ari"
}
$("#connect_btn").on("click", function () {
    $("#connect_btn").val("");
    if ($("#id_pseudo").val() == admin.pseudo && $("#mdp_co").val() == admin.password) {
        window.location = "list.html"
    } else {
        $("#error_co").show();
    }
});

function reset() {
    $("#error_co").hide();
    $("#id_pseudo").val("");
    $("#mdp_co").val("");
}