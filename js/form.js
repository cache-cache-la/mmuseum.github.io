document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contant-form");
  new Form(contactForm);
});

function Form(form) {
  this.form = form;
  this.inputElement = this.form.querySelectorAll("input,select,textarea");
  this.textareaComponent = this.form.querySelectorAll(".js-flexible-textarea");
  this.inputFileComponent = this.form.querySelectorAll(".js-flie-select");
  this.zipButton = this.form.querySelector(".js-address-search");
  this.inputDate = this.form.querySelectorAll('[type="date"]');
  this.submit = this.form.querySelector('[type="submit"]');

  this.init();
  this.handleEvent();
}

Form.prototype.init = function () {
  this.validateSubmit();
  this.inputDate.forEach(this.initInputDate);
  this.textareaComponent.forEach(this.flexTextarea);
  this.inputFileComponent.forEach(this.displaySelectedFilename);
};

.prototype.handleEvent = function () {
  this.handleValidation(this.inputElement);
  this.handleZipSearch(this.zipButton);
  this.handleSubmit(this.submit);
};


Form.prototype.handleValidation = function (input) {
  input.forEach((currentInput) => {
    currentInput.addEventListener("change", this.displayValidation.bind(this));

    currentInput.addEventListener("change", this.validateSubmit.bind(this));
  });
};

Form.prototype.handleZipSearch = function (searchButton) {
  searchButton.addEventListener("click", this.searchAddress.bind(this));
};


Form.prototype.handleSubmit = function (submit) {
  submit.addEventListener("click", this.pressSubmit.bind(this));
};


Form.prototype.displayValidation = function (event) {
  const targetInput = event.target;
  const targetName = targetInput.getAttribute("name");
  const invalidMessage = targetInput.getAttribute("title");
  const messageArea = this.form.querySelector(
    `[data-validation="${targetName}"]`
  );
  const hasValidateMessage =
    messageArea !== null && targetInput.hasAttribute("title");
  const isValid = targetInput.validity.valid;

  targetInput.setAttribute("data-is-valid", isValid);

  if (hasValidateMessage) {
    messageArea.innerHTML = isValid ? "" : invalidMessage;
  }

  return;
};

Form.prototype.validateSubmit = function () {
  const isValid = this.form.checkValidity();
  const submitButton = this.submit;
  const messageArea = this.form.querySelector('[data-validation="submit"]');

  submitButton.setAttribute("aria-disabled", !isValid);
  messageArea.innerHTML = isValid ? "" : "必須項目がすべて入力されていません";

  return;
};

Form.prototype.initInputDate = function (input) {
  const min = moment().add(1, "days").format("YYYY-MM-DD");
  const max = moment().add(14, "days").format("YYYY-MM-DD");

  input.value = min;
  input.setAttribute("min", min);
  input.setAttribute("max", max);
};

Form.prototype.flexTextarea = function (component) {
  const textarea = component.querySelector("textarea");
  const dummyBox = document.createElement("div");
  dummyBox.className = "_dummy-box";
  dummyBox.setAttribute("aria-hidden", true);
  component.insertBefore(dummyBox, null);

  textarea.addEventListener("input", (event) => {
    dummyBox.textContent = event.target.value + "\u200b";
  });
};

Form.prototype.displaySelectedFilename = function (component) {
  const input = component.querySelector('input[type="file"]');
  const nameBox = document.createElement("p");
  nameBox.className = "_selected-file";
  component.insertBefore(nameBox, null);

  input.addEventListener("input", (event) => {
    nameBox.innerHTML = event.target.files[0].name;
  });
};

Form.prototype.searchAddress = function (event) {
  const zip = "postal-code";
  const address1 = "address-level1";
  const address2 = "address-level2";

  const zipInput = this.form.querySelector(`[name="${zip}"]`);
  const address1Input = this.form.querySelector(`[name="${address1}"]`);
  const address2Input = this.form.querySelector(`[name="${address2}"]`);

  AjaxZip3.zip2addr(zip, "", address1, address2);

  AjaxZip3.onSuccess = () => {
    address1Input.setAttribute("data-is-valid", true);
    address2Input.setAttribute("data-is-valid", true);
    address2Input.focus();
  };

  AjaxZip3.onFailure = () => {
    const messageArea = this.form.querySelector(`[data-validation="${zip}"]`);
    zipInput.setAttribute("data-is-valid", false);
    messageArea.innerHTML = "郵便番号に該当する住所が見つかりません";
  };

  return;
};

Form.prototype.pressSubmit = function (event) {
  const isValid = this.form.checkValidity();

  if (isValid) {
    console.log("送信に成功しました！");
  }

  event.preventDefault();

  return;
};

!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function adjustViewport() {
    const value =
      window.outerWidth > 360
        ? "width=device-width,initial-scale=1"
        : "width=360";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", adjustViewport, false);
  adjustViewport();
})();