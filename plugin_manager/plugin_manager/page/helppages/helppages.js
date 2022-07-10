frappe.pages['helppages'].on_page_load = function(wrapper) {
    new HelpPages(wrapper);
}

HelpPages = Class.extend({
    init: function(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'List of some Helppages',
            single_column: true
        });
        this.make();
    },
    make: function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("helpsites").innerHTML = "";
				const res = JSON.parse(this.responseText);
				res.helpsites.forEach(element => {
					document.getElementById("helpsites").innerHTML = document.getElementById("helpsites").innerHTML +
					'    <div class="col"><div class="card mb-3"><div class="card-body"><h5 class="card-title">' + element.name + '</h5>' +
					'<p class="card-text"><ul><li>' + (element.giturl?element.giturl:"") + '</li><li>' + (element.weburl?element.weburl:"") + '</li></ul></p><a href="#" class="btn btn-primary">Install</a>' +
					'</div></div></div>';
				});
			}
		  };
		  xhttp.open("GET", "https://raw.githubusercontent.com/gluecks-it/frappe-apps/main/apps.json", true);
		  xhttp.send();
        $(frappe.render_template("helppages", this)).appendTo(this.page.main);
    }
})