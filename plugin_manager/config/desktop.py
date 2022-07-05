# -*- coding: utf-8 -*-

from frappe import _


def get_data():
	return [
		{
			"module_name": "Plugin Manager",
			"color": "black",
			"icon": "fa fa-gamepad",
			"type": "module",
			"label": _("Plugin Manager"),
			"link": "Form/Bench Settings",
		}
	]
