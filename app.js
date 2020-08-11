//  Add and remove button
const inputAddbtn = document.getElementById("addbtn");
const inputRemovebtn = document.getElementById("plan-list");

/*
/------------------------------------------------------------
/   Routine Class
/------------------------------------------------------------
/   Template for creating new workout plans
/
*/
class Routine {
  constructor(workoutType, exercise, set, rep, id) {
    this.workoutType = workoutType;
    this.exercise = exercise;
    this.set = set;
    this.rep = rep;
    this.id = id;
  }
}
/*
/------------------------------------------------------------
/   UI Class
/------------------------------------------------------------
/   Updates the UI basic on user inputs
/   displayPlans() method run when DOM loads.
/
*/
class UpdateUI {
  static displayPlans() {
    const plans = StoreData.getData(); // Get array from local Storage. IF no data in Local storage = <empty array>
    plans.forEach((plan) => UpdateUI.addPlanToList(plan)); //IF data is present in Local storage = pass it to addBookToList method
  }

  static addPlanToList(plan) {
    const list = document.querySelector("#plan-list"); // Select tbody from HTML
    const row = document.createElement("tr");

    row.innerHTML = `<td>${plan.workoutType}</td>
    <td>${plan.exercise}</td>
    <td>${plan.set}</td>
    <td>${plan.rep}</td>
    <td hidden>${plan.id}</td> 
    <td><a href="javascript:void(0)" class="btn  btn-sm delete">X</a></td> 
    `; // plan.id is hidden from users. used for adding unique id to each plans

    list.appendChild(row); // Append row to tbody
  }

  static clearUserInputs() {
    // Clear input field after button click
    document.querySelector(".workout").value = "";
    document.querySelector(".exercise").value = "";
    document.querySelector(".set").value = "";
    document.querySelector(".rep").value = "";
  }

  //Remove plan from UI and DOM but not from the local storage.
  static removePlan(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      UpdateUI.showMsg("Removed", "success");
    }
  }

  // dipslay alerts when user click certian buttons
  static showMsg(msg, className) {
    const msgContainer = document.createElement("div");

    msgContainer.innerText = msg;
    msgContainer.classList.add("showMsg");

    setTimeout(() => msgContainer.classList.add("slide"), 5);
    msgContainer.classList.add(className);
    document.body.appendChild(msgContainer);
    setTimeout(() => msgContainer.remove(), 3000);
    inputAddbtn.addEventListener("click", () => msgContainer.remove()); // remove previous alert before showing next alert. Prevent spamming alerts
    inputRemovebtn.addEventListener("click", () => msgContainer.remove());
  }
}

/*
/------------------------------------------------------------
/   Store Class
/------------------------------------------------------------
/   Store data from user input to the LocalStorage
/   Retrieve data on reload
/
*/
class StoreData {
  static getData() {
    let plans;
    if (localStorage.getItem("plans") === null) {
      // create local storage array called "plans" and set it = []
      plans = [];
    } else {
      plans = JSON.parse(localStorage.getItem("plans")); // if "plans" array exists return it to addData()
    }

    return plans;
  }

  static addData(plan) {
    // plan parameter is coming from user input
    const plans = StoreData.getData(); //array from local storage
    plans.push(plan);
    localStorage.setItem("plans", JSON.stringify(plans)); //push new data from user to local storage
  }

  static removeData(el) {
    // el parameter is coming remove button Onclick
    const plans = StoreData.getData(); //array from local storage
    plans.forEach((plan, index) => {
      // loops iterate over each item in  local storage array
      if (plan.id == el) {
        // if local storage array = to button e.target remove it from array
        plans.splice(index, 1);
      }
    });
    localStorage.setItem("plans", JSON.stringify(plans)); //push new data from user to local storage
  }
}

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   Add button instantiate plans and call UI class and store class
/
*/

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
  }
});

//Remove Button Event
inputRemovebtn.addEventListener("click", (e) => {
  UpdateUI.removePlan(e.target);
  StoreData.removeData(e.target.parentElement.previousElementSibling.textContent);
});
