// Main Add button
const inputAddbtn = document.getElementById("addbtn");

//Template for creating new workout plans
class Routine {
  constructor(workoutType, exercise, set, rep, id) {
    this.workoutType = workoutType;
    this.exercise = exercise;
    this.set = set;
    this.rep = rep;
    this.id = id;
  }
}

// UI updates
class UpdateUI {
  static displayPlans() {
    const plans = StoreData.getData();
    plans.forEach((plan) => UpdateUI.addPlanToList(plan));
  }

  static addPlanToList(plan) {
    const list = document.querySelector("#plan-list");
    const row = document.createElement("tr");

    row.innerHTML = `<td>${plan.workoutType}</td>
    <td>${plan.exercise}</td>
    <td>${plan.set}</td>
    <td>${plan.rep}</td>
    <td hidden>${plan.id}</td>
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

//Store data to local storage
class StoreData {
  static getData() {
    let plans;
    if (localStorage.getItem("plans") === null) {
      plans = [];
    } else {
      plans = JSON.parse(localStorage.getItem("plans"));
    }

    return plans;
  }

  static addData(plan) {
    const plans = StoreData.getData();
    plans.push(plan);
    localStorage.setItem("plans", JSON.stringify(plans));
  }

  static removeData(el) {
    const plans = StoreData.getData();

    plans.forEach((plan, index) => {
      if (plan.id == el) {
        console.log(plan.id, el, index);
        plans.splice(index, 1);
      }
    });
    localStorage.setItem("plans", JSON.stringify(plans));
  }
}

// User inputs and UI functions
document.addEventListener("DOMContentLoaded", UpdateUI.displayPlans);
document.querySelector("#addbtn").addEventListener("click", (e) => {
  e.preventDefault();

  const inputWorkout = document.querySelector(".workout").value;
  const inputExercise = document.querySelector(".exercise").value;
  const inputSet = document.querySelector(".set").value;
  const inputRep = document.querySelector(".rep").value;
  const id = Date.now();

  //Validation
  if (inputWorkout == "" || inputExercise == "" || inputRep == "" || inputSet == "") {
    UpdateUI.showMsg("Please fill in all fields", "danger");
  } else {
    UpdateUI.showMsg("Added", "success");

    //Instantiate
    const plan = new Routine(inputWorkout, inputExercise, inputSet, inputRep, id);

    //Add plan to UI
    UpdateUI.addPlanToList(plan);

    //Add plan to localStorge
    StoreData.addData(plan);

    //Clear inputs
    UpdateUI.clearUserInputs();

    //remove plan
  }
});

document.querySelector("#plan-list").addEventListener("click", (e) => {
  UpdateUI.removePlan(e.target);
  StoreData.removeData(e.target.parentElement.previousElementSibling.textContent);
  UpdateUI.showMsg("Removed", "success");
});
