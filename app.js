//Template for creating new workout plans
class Routine {
  constructor(workoutType, exercise, set, rep) {
    this.workoutType = workoutType;
    this.exercise = exercise;
    this.set = set;
    this.rep = rep;
  }
}

//
class UpdateUI {
  static displayRoutine() {
    const storedPlan = [
      {
        workoutType: "Upper body",
        exercise: "Upper body",
        set: "3",
        rep: "12",
      },
      {
        workoutType: "Lower body",
        exercise: "Sit-ups",
        set: "4",
        rep: "8",
      },
    ];

    const plans = storedPlan;
    plans.forEach((plan) => UpdateUI.addPlanToList(plan));
  }

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
}

document.addEventListener("DOMContentLoaded", UpdateUI.displayRoutine);
// const inputAddbtn = document.getElementById("addbtn");

// inputAddbtn.addEventListener("click", (e) => {
//   const inputWorkout = document.querySelector(".workout").value;
//   const inputExercise = document.querySelector(".exercise").value;
//   const inputSet = document.querySelector(".set").value;
//   const inputRep = document.querySelector(".rep").value;

//   const plan = new Routine(inputWorkout, inputExercise, inputSet, inputRep);
// });
