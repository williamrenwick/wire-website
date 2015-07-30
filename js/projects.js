var PROJECTS = [];
var introText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet mi eleifend, vestibulum nunc eget, cursus urna. Maecenas elementum mauris et lorem congue, ut rhoncus lacus ullamcorper. Nulla sed ipsum sed tortor facilisis tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function addProject(title, client, fields, bgImage) {
	PROJECTS.push({
		title: title,
		client: client,
		fields: fields,
		bgImg: bgImage
	})
}

function addAll() {
	addProject('Quisque Sit Amet Mi Eleifend', 'Client Name', 'UX, Design', 'img/work1.jpg');
	addProject('Lorem Ipsum Dolor', 'Client Name', 'UX, Design', 'img/work2.jpg');
	addProject('Consectetur Adipiscing Elit', 'Client Name', 'UX, Design', 'img/work3.jpg');
}

addAll();