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
}

document.addEventListener("DOMContentLoaded", UpdateUI.displayRoutine);

const inputAddbtn = document.getElementById("addbtn");

inputAddbtn.addEventListener("click", (e) => {
  const inputWorkout = document.querySelector(".workout").value;
  const inputExercise = document.querySelector(".exercise").value;
  const inputSet = document.querySelector(".set").value;
  const inputRep = document.querySelector(".rep").value;

  //Instatiate routine
  const plan = new Routine(inputWorkout, inputExercise, inputSet, inputRep);
  console.log(plan);
  //Add plan to table
  UpdateUI.addPlanToList(plan);
  //Clear inputs
  UpdateUI.clearUserInputs();
});

document.querySelector("#plan-list").addEventListener("click", (e) => {
  UpdateUI.removePlan(e.target);
});
