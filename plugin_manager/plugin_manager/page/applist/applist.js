frappe.pages['applist'].on_page_load = function(wrapper) {
    new Applist(wrapper);
}

Applist = Class.extend({
    init: function(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            title: 'List of all known Frappe Apps',
            single_column: true
        });
        this.make();
    },
    make: function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("applist").innerHTML = "";
				const res = JSON.parse(this.responseText);
				res.apps.forEach(app => {
					var branch = "";
					app.branch.forEach(brnch =>  { 
						for (const [key, value] of Object.entries(brnch)) {
							branch += '<a href="#" class="btn btn-primary" style="margin:5px" data-branch="' + `${value}` + '" data-giturl="' + app.giturl + '">Install ' + `${key}` + '</a>'
						  }
					})
					document.getElementById("applist").innerHTML += '<div class="col"><div class="card mb-3"><div class="card-body"><h5 class="card-title">' + app.name + '</h5>' +
					'<p class="card-text"><ul>' + (app.giturl? "<li>Git: <a href='"+app.giturl +"'>" + app.giturl + "</a></li>":"") + (app.weburl?"<li>Web: <a href='"+app.weburl +"'>" + app.weburl + "</a></li>":"") + '</ul></p>' + branch +
					'</div></div></div>';
				});
			}
		  };
		  xhttp.open("GET", "https://raw.githubusercontent.com/gluecks-it/frappe-apps/main/apps.json", true);
		  xhttp.send();
        $(frappe.render_template("applist", this)).appendTo(this.page.main);
    }
})