document.addEventListener("DOMContentLoaded", () => {
	const getValidateForms = document.querySelectorAll("form[novalidate]");
	getValidateForms.forEach((form, i) => {
		// get submit button in form
		const submitButton = form.querySelector("button[type=submit]");
		submitButton &&
			submitButton.addEventListener("click", (e) => {
				const inputs = form.querySelectorAll("[required]");
				inputs.forEach((getinput) => {
					if (
						getinput.value === "" ||
						(getinput.getAttribute("type") === "checkbox" && !getinput.checked)
					) {
						getinput.style.borderColor = "red";
						e.preventDefault();
					} else {
						submitButton.innerText = "loading ...";
						getinput.style.borderColor = "green";
					}
				});
			});
	});
});

//link

const Links = document.querySelectorAll("[link]");

Links.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		console.log(link);
		const href = link.getAttribute("href");
		const method = link.getAttribute("method");
		const data = link.getAttribute("data") ?? {};
		if (String(method).toLocaleLowerCase() !== "get") {
			console.log(data);
			fetch(href, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: link.hasAttribute("data") ? JSON.stringify(data) : {},
			})
				.then(async (r) => {
					if (r.ok && link.hasAttribute("redirect")) {
						location.href = `${link.getAttribute("redirect")}`;
					} //else location.reload();
					console.log(await r.json());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			fetch(href, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(async (r) => {
					if (r.ok && link.hasAttribute("redirect")) {
						location.href = `${link.getAttribute("redirect")}`;
					} else location.reload();
					console.log(await r.json());
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
});

const confirmLinks = document.querySelectorAll("[confirm]");

confirmLinks.forEach((confirmLink) => {
	confirmLink.addEventListener("click", (e) => {
		const getConfirm = confirm(confirmLink.getAttribute("confirm-msg"));
		if (!getConfirm) {
			e.preventDefault();
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[table-sort]").forEach((table) => {
		new DataTable(table, {
			autoFill: false,
			info: true,
			ordering: table.hasAttribute("order"),
			responsive: table.hasAttribute("responsive"),
			buttuns: ["print", "pdf"],
		});
	});
});

const multiInputs = document.querySelectorAll("[multi-input]");

multiInputs.forEach((multiInput) => {
	multiInput
		.querySelector("button[type='button']")
		.addEventListener("click", (e) => {
			e.preventDefault();
			const cloneForm = multiInput.children[0].cloneNode(true);
			cloneForm.querySelector("button").remove();
			const rmBtn = document.createElement("button");
			const rmIcon = document.createElement("i");
			[
				...cloneForm.querySelectorAll("input"),
				...cloneForm.querySelectorAll("select"),
			].forEach((input) => {
				if (input.name !== "quantite") {
					input.value = "";
				}
			});
			rmIcon.classList.add("fas", 'fa-minus');
			rmBtn.classList.add("btn", "btn-danger");
			rmBtn.append(rmIcon);
			rmBtn.setAttribute("rmbtn", true);
			cloneForm.append(rmBtn);
			multiInput.append(cloneForm);
			document.dispatchEvent(
				new CustomEvent("multi-input-add", {
					detail: cloneForm,
				}),
			);
			multiInput.querySelectorAll("[rmbtn]").forEach((removeBtn) => {
				removeBtn.addEventListener("click", (e) => {
					document.dispatchEvent(
						new CustomEvent("multi-input-remove", {
							detail: removeBtn.parentElement,
						}),
					);
					removeBtn.parentElement.remove();
				});
			});
		});
});

const dataTables = document.querySelectorAll("table[sorted]");

dataTables.forEach((dataTable) => {
	try {
		new DataTable(dataTable, {
			buttons: ["print", "colvis"],
			responsive: !!dataTable.hasAttribute("responsive"),
			order: !!dataTable.hasAttribute("order"),
			autoFill: !!dataTable.hasAttribute("autoFill"),
		});
	} catch (error) {
		console.log(error);
	}
});

document.querySelectorAll(".alert").forEach((alert) => {
	setTimeout(() => {
		alert.style.display = "none";
	}, 5000);
});
