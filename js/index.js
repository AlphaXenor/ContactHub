function insertTwoColors(firstColor, secondColor) {
  return `style="background-image: linear-gradient(var(--gradient-position-br), ${firstColor}, ${secondColor}) !important;"`;
}

function generateRandom() {
  return Math.floor(Math.random() * 4);
}

var colorsArr = [
  insertTwoColors("#00bc7d", "#009689"),
  insertTwoColors(`#ff2056`, `#e60076`),
  insertTwoColors(`#fe9a00`, `#f54a00`),
  insertTwoColors(`#8e51ff`, `#9810fa`),
];

var elementsColors = [];

// OPEN MODAL PART
var openModal = document.getElementById("openModal");
var addNewContact = document.getElementById("addNewContact");

openModal.addEventListener("click", function () {
  addNewContact.classList.remove("d-none");
});
// OPEN MODAL PART

// ===============================

// CLOSE MODAL PART

function cancel(btn) {
  btn.addEventListener("click", function () {
    addNewContact.classList.add("d-none");
    clearContact();
    if (!nameRegex.test(contactName.value) && contactName.value.length != 0) {
      wrongNameMessage.classList.remove("d-none");
      contactName.classList.add("border-red-50");
    } else {
      wrongNameMessage.classList.add("d-none");
      contactName.classList.remove("border-red-50");
    }
    if (
      !phoneRegex.test(contactPhone.value) &&
      contactPhone.value.length != 0
    ) {
      wrongPhoneMessage.classList.remove("d-none");
      contactPhone.classList.add("border-red-50");
    } else {
      wrongPhoneMessage.classList.add("d-none");
      contactPhone.classList.remove("border-red-50");
    }
    if (
      !emailRegex.test(contactEmail.value) &&
      contactEmail.value.length != 0
    ) {
      wrongEmailMessage.classList.remove("d-none");
      contactEmail.classList.add("border-red-50");
    } else {
      wrongEmailMessage.classList.add("d-none");
      contactEmail.classList.remove("border-red-50");
    }
  });
}

var cancelBtns = document.querySelectorAll(".cancel");
for (var i = 0; i < cancelBtns.length; i++) cancel(cancelBtns[i]);

// CLOSE MODAL PART

// ===========================================

var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var group = document.getElementById("group");
var contactTextArea = document.getElementById("contactTextArea");
var favorite = document.getElementById("favorite");
var emergency = document.getElementById("emergency");
var currentIndex;

var contactList = localStorage.getItem("contactList")
  ? JSON.parse(localStorage.getItem("contactList"))
  : [];

displayContact();

// PREVENT REFRESHING FROM THE FORM
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
// PREVENT REFRESHING FROM THE FORM

// HANDLE VALUE OF FAVORITE AND EMERGENCY
favorite.addEventListener("click", function (e) {
  e.target.value = e.target.value ? "" : "favorite";
});

emergency.addEventListener("click", function (e) {
  e.target.value = e.target.value ? "" : "emergency";
});
// HANDLE VALUE OF FAVORITE AND EMERGENCY

function addContact() {
  if (
    !wrongNameMessage.classList.contains("d-none") ||
    contactName.value.length === 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
    return;
  }

  if (contactPhone.value.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
    return;
  }

  if (!wrongPhoneMessage.classList.contains("d-none")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return;
  }

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].phone === contactPhone.value) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${contactName.value}`,
      });

      return;
    }
  }

  if (!wrongEmailMessage.classList.contains("d-none")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  contactList.push(contact);

  elementsColors.push(colorsArr[generateRandom()]);

  localStorage.setItem("contactList", JSON.stringify(contactList));

  displayContact();

  clearContact();

  addNewContact.classList.add("d-none");

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 2000,
  });
}

function clearContact() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  group.value = "";
  contactTextArea.value = "";
  favorite.value = "";
  emergency.value = "";
  document.getElementById("favorite").checked = false;
  document.getElementById("emergency").checked = false;
}

function displayContact() {
  if (contactList.length === 0) {
    document.getElementById(
      "cardInfo"
    ).innerHTML = `<div class="w-100" style="padding-block: 5rem">
                        <div
                          class="icon-holder mx-auto mb-3"
                          style="
                            width: 80px;
                            height: 80px;
                            border-radius: 1rem;
                            background-color: #f6f3f4;
                            color: #d1d5dc;
                            font-size: 1.875rem;
                          "
                        >
                          <i class="fa-solid fa-address-book"></i>
                        </div>
                        <p
                          class="fw-500 text-center mb-0"
                          style="color: #6a7282"
                        >
                          No contacts found
                        </p>
                        <p
                          class="mt-1 fs-14 mb-0 text-center"
                          style="color: #99a1af"
                        >
                          Click "Add Contact" to get started
                        </p>
                      </div>`;

    document.getElementById(
      "pesonsFavoriteInfo"
    ).innerHTML = `<div style="padding-block: 2rem">
                      <p class="fs-14 text-center mb-0" style="color: #99a1af">
                        No favorites yet
                      </p>
                    </div>`;

    document.getElementById(
      "pesonsEmergencyInfo"
    ).innerHTML = `<div style="padding-block: 2rem">
                      <p class="fs-14 text-center mb-0" style="color: #99a1af">
                        No emergency contacts
                      </p>
                    </div>`;

    document.getElementById("totalNum").innerHTML = 0;
    document.getElementById("totalFavorites").innerHTML = 0;
    document.getElementById("totalEmergency").innerHTML = 0;

    return;
  }

  var box = "";
  var containerContactsFavorites = "";
  var containerContactsEmergencies = "";
  var totalContacts = 0;
  var totalEmergencies = 0;
  var totalFavorites = 0;

  for (var i = 0; i < contactList.length; i++) {
    var mt = `mt-0`;
    if (i !== 0) {
      mt = `mt-12`;
    }
    document.getElementById("cardInfo").innerHTML = `<div class="col-md-6">
                        <div class="inner card-info">
                          <div class="contact-info px-3 pt-3 pb-12">
                            <div
                              class="d-flex flex-wrap align-items-center gap-14"
                            >
                              <div class="position-relative holder" ${
                                elementsColors[i]
                              }>
                                <span id="shortHandName" class="short-hand-name"
                                  >${getShortName(contactList[i].name)}</span
                                >
                                <div
                                  class="position-absolute top--2 end--2 d-none"
                                  style="background-color: #ffb900"
                                  id="favo"
                                >
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <div
                                  class="position-absolute bottom--2 end--2 emer d-none"
                                  style="background-color: #ff2056"
                                  id="emer"
                                >
                                  <i class="fa-solid fa-heart-pulse"></i>
                                </div>
                              </div>
                              <div class="pt-1">
                                <h3 class="text-gray-900 fw-600 fs-16">
                                  ${contactList[i].name}
                                </h3>
                                <div
                                  class="d-flex flex-wrap align-items-center gap-2 mt-1"
                                >
                                  <div class="icon-holder">
                                    <i class="fa-solid fa-phone"></i>
                                  </div>
                                  <span class="fs-14 text-gray-500"
                                    >${contactList[i].phone}</span
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="mt-12">
                              <div
                                class="d-flex flex-wrap align-items-center gap-10 mb-2"
                              >
                                <div
                                  class="icon-holder"
                                  id="emailArea"
                                  style="
                                    background-color: #ede9fe;
                                    color: #7f22fe;
                                  "
                                >
                                  <i class="fa-solid fa-envelope"></i>
                                </div>
                                <span class="text-gray-600 fs-14"
                                  >${contactList[i].email}</span
                                >
                              </div>
                              <div
                                class="d-flex flex-wrap align-items-center gap-10"
                              >
                                <div
                                  class="icon-holder"
                                  id="location"
                                  style="
                                    background-color: #d0fae5;
                                    color: #009966;
                                  "
                                >
                                  <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <span class="text-gray-600 fs-14"
                                  >${contactList[i].address}</span
                                >
                              </div>
                            </div>

                            <div class="mt-12">
                              <div
                                class="d-flex flex-wrap align-items-center gap-6"
                                id="eleGroup"
                              >
                                <span
                                  class="d-none"
                                  id="work"
                                  style="
                                    color: #8200db;
                                    background-color: #f3e8ff;
                                  "
                                  >work</span
                                >
                                <span
                                  class="d-none"
                                  id="friends"
                                  style="
                                    color: #008236;
                                    background-color: #dcfce7;
                                  "
                                  >friends</span
                                >
                                <span
                                  class="d-none"
                                  id="family"
                                  style="
                                    background-color: #dbeafe;
                                    color: #1447e6;
                                  "
                                  >family</span
                                >
                                <span
                                  class="d-none"
                                  id="school"
                                  style="
                                    background-color: #fef3c6;
                                    color: #bb4d00;
                                  "
                                  >school</span
                                >
                                <span
                                  class="d-none"
                                  id="other"
                                  style="
                                    background-color: #f6f3f4;
                                    color: #364153;
                                  "
                                  >other</span
                                >
                                <span
                                  class="d-none"
                                  id="Emergency"
                                  class="d-flex flex-wrap align-items-center gap-1 emer"
                                  style="
                                    background-color: #fff1f2;
                                    color: #ec003f;
                                  "
                                >
                                  <i class="fa-solid fa-heart-pulse"></i>
                                  Emergency
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            class="lower d-flex flex-wrap align-items-center justify-content-between px-3 py-10"
                          >
                            <div
                              class="communication d-flex flex-wrap align-items-center gap-6"
                            >
                              <a
                                class="icon-holder"
                                href="tel:${contactList[i].phone}"
                                id="phone"
                              >
                                <i class="fa-solid fa-phone"></i>
                              </a>
                              <a
                                class="icon-holder"
                                href="mailto:${contactList[i].email}"
                                id="mail"
                              >
                                <i class="fa-solid fa-envelope"></i>
                              </a>
                            </div>
                            <div
                              class="status d-flex flex-wrap align-items-center gap-6"
                            >
                              <div class="icon-holder d-none" id="hollowStar" onclick="hollowStarBtn(${i})">
                                <i class="fa-regular fa-star"></i>
                              </div>
                              <div class="icon-holder d-none" id="filledStar" onclick="starBtn(${i})">
                                <i class="fa-solid fa-star"></i>
                              </div>
                              <div class="icon-holder d-none hollow" id="hollowHeart" onclick="hollowEmergencyBtn(${i})">
                                <i class="fa-regular fa-heart"></i>
                              </div>
                              <div
                                class="icon-holder emer filled d-none"
                                id="filledHeart"
                                onclick="emergencyBtn(${i})"
                              >
                                <i class="fa-solid fa-heart-pulse"></i>
                              </div>
                              <div class="icon-holder" id="pen" onclick="updateContact(${i})">
                                <i class="fa-solid fa-pen"></i>
                              </div>
                              <div class="icon-holder trash" onclick="deleteContact(${i})" id="trash">
                                <i class="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;

    if (contactList[i].email.length === 0) {
      document.getElementById("mail").classList.add("d-none");
      document.getElementById("emailArea").classList.add("d-none");
    }

    if (contactList[i].address.length === 0)
      document.getElementById("location").classList.add("d-none");

    // CHECKING FOR GROUP IF EXIST
    switch (contactList[i].list) {
      case "Work":
        document.getElementById("work").classList.remove("d-none");
        break;

      case "Friends":
        document.getElementById("friends").classList.remove("d-none");
        break;

      case "Family":
        document.getElementById("family").classList.remove("d-none");
        break;

      case "School":
        document.getElementById("school").classList.remove("d-none");
        break;

      case "Other":
        document.getElementById("other").classList.remove("d-none");
        break;
    }

    document.getElementById("pesonsFavoriteInfo").innerHTML = `<div
                      class="person-contact d-flex flex-wrap align-items-center gap-12 p-10 ${mt}"
                      
                    >
                      <div
                        class="icon-holder user-short-hand-name fw-600 fs-14"
                        style="
                          width: 40px;
                          height: 40px;
                          border-radius: 0.5rem;
                          background-image: linear-gradient(
                            var(--gradient-position-br),
                            #fe9a00,
                            #f54a00
                          );
                          color: white;
                        "
                      >
                        ${getShortName(contactList[i].name)}
                      </div>
                      <div>
                        <h4 class="mb-0 text-gray-900 fw-500 fs-14">
                          ${contactList[i].name}
                        </h4>
                        <p class="mb-0 fs-12 text-gray-500">${
                          contactList[i].phone
                        }</p>
                      </div>
                      <a class="telephone icon-holder" href="tel:${
                        contactList[i].phone
                      }">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>`;

    document.getElementById("pesonsEmergencyInfo").innerHTML = `<div
                      class="person-contact d-flex flex-wrap align-items-center gap-12 p-10 ${mt}"
                    >
                      <div
                        class="icon-holder user-short-hand-name fw-600 fs-14"
                        style="
                          width: 40px;
                          height: 40px;
                          border-radius: 0.5rem;
                          background-image: linear-gradient(
                            var(--gradient-position-br),
                            #fe9a00,
                            #f54a00
                          );
                          color: white;
                        "
                      >
                        ${getShortName(contactList[i].name)}
                      </div>
                      <div>
                        <h4 class="mb-0 text-gray-900 fw-500 fs-14">
                          ${contactList[i].name}
                        </h4>
                        <p class="mb-0 fs-12 text-gray-500">${
                          contactList[i].phone
                        }</p>
                      </div>
                      <a class="telephone icon-holder" href="tel:${
                        contactList[i].phone
                      }">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>`;

    // CHECKING FOR EMERGENCY IF EXIST
    if (contactList[i].emer) {
      document.getElementById("emer").classList.remove("d-none");
      document.getElementById("filledHeart").classList.remove("d-none");
      document.getElementById("Emergency").classList.remove("d-none");
      totalEmergencies++;
      containerContactsEmergencies += document.getElementById(
        "pesonsEmergencyInfo"
      ).innerHTML;
    } else {
      document.getElementById("hollowHeart").classList.remove("d-none");
    }

    // CHECKING FOR FAVORITE IF EXIST
    if (contactList[i].favo) {
      document.getElementById("favo").classList.remove("d-none");
      document.getElementById("filledStar").classList.remove("d-none");
      totalFavorites++;
      containerContactsFavorites +=
        document.getElementById("pesonsFavoriteInfo").innerHTML;
    } else {
      document.getElementById("hollowStar").classList.remove("d-none");
    }

    box += document.getElementById("cardInfo").innerHTML;
    totalContacts++;
  }

  document.getElementById("cardInfo").innerHTML = box;

  if (totalContacts === 0) {
    document.getElementById(
      "cardInfo"
    ).innerHTML = `<div class="w-100" style="padding-block: 5rem">
                        <div
                          class="icon-holder mx-auto mb-3"
                          style="
                            width: 80px;
                            height: 80px;
                            border-radius: 1rem;
                            background-color: #f6f3f4;
                            color: #d1d5dc;
                            font-size: 1.875rem;
                          "
                        >
                          <i class="fa-solid fa-address-book"></i>
                        </div>
                        <p
                          class="fw-500 text-center mb-0"
                          style="color: #6a7282"
                        >
                          No contacts found
                        </p>
                        <p
                          class="mt-1 fs-14 mb-0 text-center"
                          style="color: #99a1af"
                        >
                          Click "Add Contact" to get started
                        </p>
                      </div>`;
  } else {
    document.getElementById("totalNum").innerHTML = totalContacts;
  }

  if (totalFavorites === 0) {
    document.getElementById(
      "pesonsFavoriteInfo"
    ).innerHTML = `<div style="padding-block: 2rem">
                      <p class="fs-14 text-center mb-0" style="color: #99a1af">
                        No favorites yet
                      </p>
                    </div>`;
  } else {
    document.getElementById("pesonsFavoriteInfo").innerHTML =
      containerContactsFavorites;
  }

  document.getElementById("totalFavorites").innerHTML = totalFavorites;

  if (totalEmergencies === 0) {
    document.getElementById(
      "pesonsEmergencyInfo"
    ).innerHTML = `<div style="padding-block: 2rem">
                      <p class="fs-14 text-center mb-0" style="color: #99a1af">
                        No emergency contacts
                      </p>
                    </div>`;
  } else {
    document.getElementById("pesonsEmergencyInfo").innerHTML =
      containerContactsEmergencies;
  }
  document.getElementById("totalEmergency").innerHTML = totalEmergencies;
}

// SAVE BUTTON
document.getElementById("saveContact").addEventListener("click", function (e) {
  addContact();
});

// UPDATE BUTTON
document.getElementById("updateContact").addEventListener("click", function () {
  updateData();
});

function getShortName(name) {
  if (name === undefined) return null;

  var res = name[0];
  return name.lastIndexOf(" ") + 1 === 0
    ? res
    : res + name[name.lastIndexOf(" ") + 1];
}

function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete ahmed osama? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });

      contactList.splice(index, 1);

      elementsColors.splice(index, 1);

      localStorage.setItem("contactList", JSON.stringify(contactList));

      displayContact();
    }
  });
}

function updateContact(index) {
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  group.value = contactList[index].list;
  contactTextArea.value = contactList[index].textArea;
  favorite.value = contactList[index].favo;
  emergency.value = contactList[index].emer;

  if (favorite.value) document.getElementById("favorite").checked = true;

  if (emergency.value) document.getElementById("emergency").checked = true;

  addNewContact.classList.remove("d-none");
  document.getElementById("saveContact").classList.add("d-none");
  document.getElementById("updateContact").classList.remove("d-none");

  currentIndex = index;
}

function updateData() {
  if (
    !wrongNameMessage.classList.contains("d-none") ||
    contactName.value.length === 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
    return;
  }

  if (contactPhone.value.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
    return;
  }

  if (!wrongPhoneMessage.classList.contains("d-none")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return;
  }

  for (var i = 0; i < contactList.length; i++) {
    if (i == currentIndex) continue;
    if (contactList[i].phone === contactPhone.value) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${contactName.value}`,
      });

      return;
    }
  }

  if (!wrongEmailMessage.classList.contains("d-none")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  document.getElementById("addNewContact").classList.add("d-none");

  document.getElementById("updateContact").classList.add("d-none");
  document.getElementById("saveContact").classList.remove("d-none");

  contactList.splice(currentIndex, 1, contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();

  clearContact();

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been updated",
    showConfirmButton: false,
    timer: 2000,
  });
}

var searchInput = document.getElementById("search");

// SEARCH BUTTON
searchInput.addEventListener("input", function () {
  searchData();
});

function searchData() {
  var input = searchInput.value;

  var box = "";
  var totalContacts = 0;

  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(input.toLowerCase()) ||
      contactList[i].phone.includes(input) ||
      contactList[i].email.toLowerCase().includes(input.toLowerCase())
    ) {
      document.getElementById("cardInfo").innerHTML = `<div class="col-md-6">
                        <div class="inner card-info">
                          <div class="contact-info px-3 pt-3 pb-12">
                            <div
                              class="d-flex flex-wrap align-items-center gap-14"
                            >
                              <div class="position-relative holder" ${
                                elementsColors[i]
                              }>
                                <span id="shortHandName" class="short-hand-name"
                                  >${getShortName(contactList[i].name)}</span
                                >
                                <div
                                  class="position-absolute top--2 end--2 d-none"
                                  style="background-color: #ffb900"
                                  id="favo"
                                >
                                  <i class="fa-solid fa-star"></i>
                                </div>
                                <div
                                  class="position-absolute bottom--2 end--2 emer d-none"
                                  style="background-color: #ff2056"
                                  id="emer"
                                >
                                  <i class="fa-solid fa-heart-pulse"></i>
                                </div>
                              </div>
                              <div class="pt-1">
                                <h3 class="text-gray-900 fw-600 fs-16">
                                  ${contactList[i].name}
                                </h3>
                                <div
                                  class="d-flex flex-wrap align-items-center gap-2 mt-1"
                                >
                                  <div class="icon-holder">
                                    <i class="fa-solid fa-phone"></i>
                                  </div>
                                  <span class="fs-14 text-gray-500"
                                    >${contactList[i].phone}</span
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="mt-12">
                              <div
                                class="d-flex flex-wrap align-items-center gap-10 mb-2"
                                id="emailArea"
                              >
                                <div
                                  class="icon-holder"
                                  style="
                                    background-color: #ede9fe;
                                    color: #7f22fe;
                                  "
                                >
                                  <i class="fa-solid fa-envelope"></i>
                                </div>
                                <span class="text-gray-600 fs-14"
                                  >${contactList[i].email}</span
                                >
                              </div>
                              <div
                                class="d-flex flex-wrap align-items-center gap-10"
                              >
                                <div
                                  class="icon-holder"
                                  id="location"
                                  style="
                                    background-color: #d0fae5;
                                    color: #009966;
                                  "
                                >
                                  <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <span class="text-gray-600 fs-14"
                                  >${contactList[i].address}</span
                                >
                              </div>
                            </div>

                            <div class="mt-12">
                              <div
                                class="d-flex flex-wrap align-items-center gap-6"
                                id="eleGroup"
                              >
                                <span
                                  class="d-none"
                                  id="work"
                                  style="
                                    color: #8200db;
                                    background-color: #f3e8ff;
                                  "
                                  >work</span
                                >
                                <span
                                  class="d-none"
                                  id="friends"
                                  style="
                                    color: #008236;
                                    background-color: #dcfce7;
                                  "
                                  >friends</span
                                >
                                <span
                                  class="d-none"
                                  id="family"
                                  style="
                                    background-color: #dbeafe;
                                    color: #1447e6;
                                  "
                                  >family</span
                                >
                                <span
                                  class="d-none"
                                  id="school"
                                  style="
                                    background-color: #fef3c6;
                                    color: #bb4d00;
                                  "
                                  >school</span
                                >
                                <span
                                  class="d-none"
                                  id="other"
                                  style="
                                    background-color: #f6f3f4;
                                    color: #364153;
                                  "
                                  >other</span
                                >
                                <span
                                  class="d-none"
                                  id="Emergency"
                                  class="d-flex flex-wrap align-items-center gap-1 emer"
                                  style="
                                    background-color: #fff1f2;
                                    color: #ec003f;
                                  "
                                >
                                  <i class="fa-solid fa-heart-pulse"></i>
                                  Emergency
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            class="lower d-flex flex-wrap align-items-center justify-content-between px-3 py-10"
                          >
                            <div
                              class="communication d-flex flex-wrap align-items-center gap-6"
                            >
                              <a
                                class="icon-holder"
                                href="tel:${contactList[i].phone}"
                                id="phone"
                              >
                                <i class="fa-solid fa-phone"></i>
                              </a>
                              <a
                                class="icon-holder"
                                href="mailto:${contactList[i].email}"
                                id="mail"
                              >
                                <i class="fa-solid fa-envelope"></i>
                              </a>
                            </div>
                            <div
                              class="status d-flex flex-wrap align-items-center gap-6"
                            >
                              <div class="icon-holder d-none" id="hollowStar" onclick="hollowStarBtn(${i})">
                                <i class="fa-regular fa-star"></i>
                              </div>
                              <div class="icon-holder d-none" id="filledStar" onclick="starBtn(${i})">
                                <i class="fa-solid fa-star"></i>
                              </div>
                              <div class="icon-holder d-none hollow" id="hollowHeart" onclick="hollowEmergencyBtn(${i})">
                                <i class="fa-regular fa-heart"></i>
                              </div>
                              <div
                                class="icon-holder emer filled d-none"
                                id="filledHeart"
                                onclick="emergencyBtn(${i})"
                              >
                                <i class="fa-solid fa-heart-pulse"></i>
                              </div>
                              <div class="icon-holder" id="pen" onclick="updateContact(${i})">
                                <i class="fa-solid fa-pen"></i>
                              </div>
                              <div class="icon-holder trash" onclick="deleteContact(${i})" id="trash">
                                <i class="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;

      if (contactList[i].email.length === 0) {
        document.getElementById("mail").classList.add("d-none");
        document.getElementById("emailArea").classList.add("d-none");
      }

      if (contactList[i].address.length === 0)
        document.getElementById("location").classList.add("d-none");

      // CHECKING FOR GROUP IF EXIST
      switch (contactList[i].list) {
        case "Work":
          document.getElementById("work").classList.remove("d-none");
          break;

        case "Friends":
          document.getElementById("friends").classList.remove("d-none");
          break;

        case "Family":
          document.getElementById("family").classList.remove("d-none");
          break;

        case "School":
          document.getElementById("school").classList.remove("d-none");
          break;

        case "Other":
          document.getElementById("other").classList.remove("d-none");
          break;
      }

      // CHECKING FOR EMERGENCY IF EXIST
      if (contactList[i].emer) {
        document.getElementById("emer").classList.remove("d-none");
        document.getElementById("filledHeart").classList.remove("d-none");
        document.getElementById("Emergency").classList.remove("d-none");
      } else {
        document.getElementById("hollowHeart").classList.remove("d-none");
      }

      // CHECKING FOR FAVORITE IF EXIST
      if (contactList[i].favo) {
        document.getElementById("favo").classList.remove("d-none");
        document.getElementById("filledStar").classList.remove("d-none");
      } else {
        document.getElementById("hollowStar").classList.remove("d-none");
      }

      box += document.getElementById("cardInfo").innerHTML;
      totalContacts++;
    }
  }

  if (totalContacts === 0) {
    document.getElementById(
      "cardInfo"
    ).innerHTML = `<div class="w-100" style="padding-block: 5rem">
                        <div
                          class="icon-holder mx-auto mb-3"
                          style="
                            width: 80px;
                            height: 80px;
                            border-radius: 1rem;
                            background-color: #f6f3f4;
                            color: #d1d5dc;
                            font-size: 1.875rem;
                          "
                        >
                          <i class="fa-solid fa-address-book"></i>
                        </div>
                        <p
                          class="fw-500 text-center mb-0"
                          style="color: #6a7282"
                        >
                          No contacts found
                        </p>
                        <p
                          class="mt-1 fs-14 mb-0 text-center"
                          style="color: #99a1af"
                        >
                          Click "Add Contact" to get started
                        </p>
                      </div>`;

    return;
  }

  document.getElementById("cardInfo").innerHTML = box;
}

function emergencyBtn(index) {
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  group.value = contactList[index].list;
  contactTextArea.value = contactList[index].textArea;
  favorite.value = contactList[index].favo;
  emergency.value = "";

  document.getElementById("emergency").checked = false;
  if (favorite.value) document.getElementById("favorite").checked = true;

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  contactList.splice(index, 1, contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();

  clearContact();
}

function hollowEmergencyBtn(index) {
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  group.value = contactList[index].list;
  contactTextArea.value = contactList[index].textArea;
  favorite.value = contactList[index].favo;
  emergency.value = "emergency";

  document.getElementById("emergency").checked = true;
  if (favorite.value) document.getElementById("favorite").checked = true;

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  contactList.splice(index, 1, contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();

  clearContact();
}

function starBtn(index) {
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  group.value = contactList[index].list;
  contactTextArea.value = contactList[index].textArea;
  favorite.value = "";
  emergency.value = contactList[index].emer;

  document.getElementById("favorite").checked = false;

  if (emergency.value) document.getElementById("emergency").checked = true;

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  contactList.splice(index, 1, contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();

  clearContact();
}

function hollowStarBtn(index) {
  contactName.value = contactList[index].name;
  contactPhone.value = contactList[index].phone;
  contactEmail.value = contactList[index].email;
  contactAddress.value = contactList[index].address;
  group.value = contactList[index].list;
  contactTextArea.value = contactList[index].textArea;
  favorite.value = "favorite";
  emergency.value = contactList[index].emer;

  document.getElementById("favorite").checked = true;

  if (emergency.value) document.getElementById("emergency").checked = true;

  var contact = {
    name: contactName.value,
    phone: contactPhone.value,
    email: contactEmail.value,
    address: contactAddress.value,
    list: group.value,
    textArea: contactTextArea.value,
    favo: favorite.value,
    emer: emergency.value,
  };

  contactList.splice(index, 1, contact);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  displayContact();

  clearContact();
}

// VALIDATION PART
var emailRegex = /^[a-zA-Z0-9]{1,}@gmail\.com$/;
var phoneRegex = /^01[025][0-9]{8}$/;
var nameRegex = /[a-zA-Z ]{2,50}$/;

var wrongNameMessage = document.getElementById("wrongNameMessage");
var wrongPhoneMessage = document.getElementById("wrongPhoneMessage");
var wrongEmailMessage = document.getElementById("wrongEmailMessage");

contactName.addEventListener("input", function () {
  if (!nameRegex.test(contactName.value) && contactName.value.length != 0) {
    wrongNameMessage.classList.remove("d-none");
    contactName.classList.add("border-red-50");
  } else {
    wrongNameMessage.classList.add("d-none");
    contactName.classList.remove("border-red-50");
  }
});

contactPhone.addEventListener("input", function () {
  if (!phoneRegex.test(contactPhone.value) && contactPhone.value.length != 0) {
    wrongPhoneMessage.classList.remove("d-none");
    contactPhone.classList.add("border-red-50");
  } else {
    wrongPhoneMessage.classList.add("d-none");
    contactPhone.classList.remove("border-red-50");
  }
});

contactEmail.addEventListener("input", function () {
  if (!emailRegex.test(contactEmail.value) && contactEmail.value.length != 0) {
    wrongEmailMessage.classList.remove("d-none");
    contactEmail.classList.add("border-red-50");
  } else {
    wrongEmailMessage.classList.add("d-none");
    contactEmail.classList.remove("border-red-50");
  }
});

// ====================================

// SUCCESS MESSAGE
// Swal.fire({
//   position: "center-center",
//   icon: "success",
//   title: "Your work has been saved",
//   showConfirmButton: false,
//   timer: 2000,
// });

// ERROR MESSAGE
// Swal.fire({
//   icon: "error",
//   title: "Oops...",
//   text: "Something went wrong!",
// });

// CONFIRM MESSAGE
// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#dc2626",
//   cancelButtonColor: "#6b7280",
//   confirmButtonText: "Yes, delete it!"
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     });
//   }
// });
