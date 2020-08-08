// Main Add button
const inputAddbtn = document.getElementById("addbtn");

//Template for creating new workout plans
class Routine {
  constructor(workoutType, exercise, set, rep) {
    this.workoutType = workoutType;
    this.exercise = exercise;
    this.set = set;
    this.rep = rep;
  }
}

class UpdateUI {
  static displayRoutine() {}

  static addPlanToList(plan) {
    const list = document.querySelector("#plan-list");
    const row = document.createElement("tr");

    row.innerHTML = `<td>${plan.workoutType}</td>
    <td>${plan.exercise}</td>
    <td>${plan.set}</td>
    <td>${plan.rep}</td>
    <td><a href="#" class="btn  btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static clearUserInputs() {
    document.querySelector(".workout").value = "";
    document.querySelector(".exercise").value = "";
    document.querySelector(".set").value = "";
    document.querySelector(".rep").value = "";
  }

  //Remove plan from tabel
  static removePlan(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showMsg(msg, className) {
    const msgContainer = document.createElement("div");
    msgContainer.innerText = msg;
    msgContainer.classList.add("showMsg");
    setTimeout(() => msgContainer.classList.add("slide"), 5);
    msgContainer.classList.add(className);
    document.body.appendChild(msgContainer);
    setTimeout(() => msgContainer.remove(), 3000);
    inputAddbtn.addEventListener("click", () => msgContainer.remove());
  }
}

// document.addEventListener("DOMContentLoaded", UpdateUI.displayRoutine);

inputAddbtn.addEventListener("click", (e) => {
  const inputWorkout = document.querySelector(".workout").value;
  const inputExercise = document.querySelector(".exercise").value;
  const inputSet = document.querySelector(".set").value;
  const inputRep = document.querySelector(".rep").value;

  //Validation
  if (inputWorkout == "" || inputExercise == "" || inputRep == "" || inputSet == "") {
    UpdateUI.showMsg("Please fill in all fields", "danger");
  } else {
    UpdateUI.showMsg("Added", "success");

    const plan = new Routine(inputWorkout, inputExercise, inputSet, inputRep);
    //Add plan to table
    UpdateUI.addPlanToList(plan);
    //Clear inputs
    UpdateUI.clearUserInputs();
  }
  //Instatiate routine
});

document.querySelector("#plan-list").addEventListener("click", (e) => {
  UpdateUI.removePlan(e.target);
  UpdateUI.showMsg("Removed", "success");
});
