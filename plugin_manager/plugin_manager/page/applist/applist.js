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
        this.make(this.page);
    },
    make: function(frm) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("applist").innerHTML = "";
				const res = JSON.parse(this.responseText);
				res.apps.forEach(app => {
					var branch = "";
					app.branch.forEach(brnch =>  { 
						for (const [key, value] of Object.entries(brnch)) {
							branch += '<a href="#" class="btn btn-primary install" style="margin:5px" data-name="' + app.name + '" data-branch="' + `${value}` + '" data-giturl="' + app.giturl + '">Install ' + `${key}` + '</a>'
						  }
					})
					document.getElementById("applist").innerHTML += '<div class="col"><div class="card mb-3"><div class="card-body"><h5 class="card-title">' + app.name + '</h5>' +
					'<p class="card-text"><ul>' + (app.giturl? "<li>Git: <a href='"+app.giturl +"' target='_blank'>" + app.giturl + "</a></li>":"") + 
					(app.weburl?"<li>Web: <a href='"+app.weburl +"' target='_blank'>" + app.weburl + "</a></li>":"") +
					(app.maintainer?"<li>Maintainer: <b>"+app.maintainer +"</b></li>":"") + '</ul></p>' + branch +
					'</div></div></div>';
				});
				$(".install").on('click',function(){
					let key = frappe.datetime.get_datetime_as_string();
					console_dialog(key);
					frappe.call({
						method: "plugin_manager.plugin_manager.doctype.bench_settings.bench_settings.console_command",
						args: { self: { doctype:"applist", name: "Downloadapp" }, key: key, caller: 'get-app', app_name: this.dataset.name, git_url: this.dataset.giturl, branch_name: this.dataset.branch },
					})
				});
			}
		  };
		  xhttp.open("GET", "https://raw.githubusercontent.com/gluecks-it/frappe-apps/main/apps.json", true);
		  xhttp.send();
        $(frappe.render_template("applist", this)).appendTo(this.page.main);
		
    }
})