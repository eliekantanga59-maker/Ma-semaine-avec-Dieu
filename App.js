
// Afficher la date
document.getElementById("date").textContent =
    new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// Sauvegarde générale
function sauvegarder(cle, valeur) {
    localStorage.setItem(cle, valeur);
}

// Charger les textes enregistrés
function charger(id, cle) {
    document.getElementById(id).value =
        localStorage.getItem(cle) || "";
}

// Méditation
function sauverMeditation() {
    sauvegarder("meditation",
        document.getElementById("meditation").value);
    alert("Méditation enregistrée !");
}

// Prière
function sauverPriere() {
    sauvegarder("priere",
        document.getElementById("priere").value);
    alert("Sujet de prière enregistré !");
}

// Objectifs
function sauverObjectifs() {
    sauvegarder("objectifs",
        document.getElementById("objectifs").value);
    alert("Objectifs enregistrés !");
}

// Journal spirituel
function sauverJournal() {
    sauvegarder("journal",
        document.getElementById("journal").value);
    alert("Journal enregistré !");
}

// Ajouter une activité
function ajouterActivite() {
    const jour = document.getElementById("jour").value;
    const activite = document.getElementById("activite").value.trim();

    if (!jour || !activite) {
        alert("Choisis une date et écris une activité.");
        return;
    }

    let activites = JSON.parse(
        localStorage.getItem("activites") || "[]"
    );

    activites.push({
        jour: jour,
        nom: activite,
        faite: false
    });

    sauvegarder("activites", JSON.stringify(activites));

    document.getElementById("activite").value = "";
    afficherActivites();
}

// Afficher les activités
function afficherActivites() {
    const liste = document.getElementById("listeActivites");
    const activites = JSON.parse(
        localStorage.getItem("activites") || "[]"
    );

    liste.innerHTML = "";

    activites.forEach((a, index) => {
        const li = document.createElement("li");

        const texte = document.createElement("span");
        texte.textContent = a.jour + " : " + a.nom;

        const terminer = document.createElement("input");
        terminer.type = "checkbox";
        terminer.checked = a.faite;

        terminer.addEventListener("change", () => {
            activites[index].faite = terminer.checked;
            sauvegarder("activites", JSON.stringify(activites));
        });

        const supprimer = document.createElement("button");
        supprimer.textContent = "Supprimer";

        supprimer.addEventListener("click", () => {
            activites.splice(index, 1);
            sauvegarder("activites", JSON.stringify(activites));
            afficherActivites();
        });

        li.append(terminer, texte, supprimer);
        liste.appendChild(li);
    });
}

// Suivi des habitudes
function calculerProgression() {
    const habitudes = document.querySelectorAll(".habitude");
    const total = habitudes.length;

    const faites = [...habitudes].filter(
        h => h.checked
    ).length;

    const pourcentage = Math.round((faites / total) * 100);

    document.getElementById("progression").textContent =
        "Progression : " + pourcentage + "%";
    
    sauvegarder(
        "habitudes",
        JSON.stringify([...habitudes].map(h => h.checked))
    );
}

// Initialisation
window.addEventListener("DOMContentLoaded", () => {
    charger("meditation", "meditation");
    charger("priere", "priere");
    charger("objectifs", "objectifs");
    charger("journal", "journal");

    afficherActivites();

    const habitudes = document.querySelectorAll(".habitude");
    const anciennes = JSON.parse(
        localStorage.getItem("habitudes") || "[]"
    );

    habitudes.forEach((h, i) => {
        h.checked = anciennes[i] || false;
        h.addEventListener("change", calculerProgression);
    });

    calculerProgression();
});
