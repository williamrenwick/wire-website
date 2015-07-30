
	//Main Nav Building
	var MainNav = React.createClass({
		render: function() {
			return (
				<nav className="fixed-nav">
		          <div id="menu-button">   
		              <span className="menu-line"></span>
		          </div>
		          <span className="site-title">Lorem Ipsum</span>
		        </nav>
			)
		}
	})


	//Side Nav Building

	var LiProjItem = React.createClass({
		render: function() {
			return (
				<li className="proj-link projLi" style={{'background-image': 'url(' + this.props.project.bgImg + ')' }}>
					<h1>this.props.project.title</h1>
				</li>
			)
		}
	});

	var ProjectSide = React.createClass({

		render: function() {
			var liItems = [];

			this.props.projects.forEach(function(project) {
				liItems.push(<LiProjItem project={project} />)
			})
			return (
				<ul>
					<li className="proj-all-title projLi"></li>
					{liItems}
				</ul>
			)
		}
	})

	var MainSide = React.createClass({
		render: function() {
			return (
				<ul>
                  <li id="homeLi">
                      <span className="number-wrap">
                          <span className="page-number">1</span>/<span className="total-number">3</span>
                      </span>
                      <span className="page-title">Home</span>
                  </li>
                  <li id="projLi">
                      <span className="number-wrap">
                          <span className="page-number">2</span>/<span className="total-number">3</span>
                      </span>
                      <span className="page-title">Projects</span>
                      <div id="view-all-btn"></div>
                  </li>
                  <li id="contactLi">
                      <span className="number-wrap">
                          <span className="page-number">3</span>/<span className="total-number">3</span>
                      </span>
                      <span className="page-title">Contact</span>
                  </li>
                </ul>
			)
		}
	});

	var SideNav = React.createClass({
		render: function() {
			return (
				<nav id="side-nav">
					<MainSide />
					<ProjectSide projects={this.props.projects}/>
				</nav>
			)
		}
	});






	//Homepage Building
	var ViewBtn = React.createClass({
		render: function() {
			return (
				<div data-url="project.html" className="view-proj">
				  <div className="view-plus"></div>
				  <p>View Project</p>
				</div>
			)
		}
	});
	var Contact = React.createClass({
		render: function() {
			return (
				<section id="contact">
				    <div id="contact-wrap">
				        <div id="contact-left">
				            <h3>Telephone</h3>
				            <h2>+44 (0)7850083174</h2>
				            <h3>Email</h3>
				            <h2>william.r.renwick@gmail.com</h2>
				            <h3>Connect With Me</h3>
				            <ul>
				                <li>LinkedIn</li>
				                <li>Facebook</li>
				                <li>Google+</li>
				            </ul>
				        </div>
				        <div id="contact-right">
				            <h1>"Let's Talk"</h1>
				            <p>© William Renwick. All rights reserved.</p>
				        </div>
				    </div>
				</section>
			)
		}
	})
	var HpWorkItem = React.createClass({
		render: function() {
			return (
				<section className="hp-work-item" style={{'background-image': 'url(' + this.props.project.bgImg + ')' }}>
				  <div className="work-info">
					  <div className="work-text js-fade-text">
						  <div className="worktext-appear-wrap">
							<ViewBtn />
					  	    <h1>{this.props.project.title}</h1>
                            <h3>Client</h3>
                            <h2>{this.props.project.client}</h2>
                            <h3>Fields</h3>
                            <h2>{this.props.project.fields}</h2>
						  </div>
					  </div>
				  </div>
				</section>
			)
		}
	});
	var WorkItems = React.createClass({
		render: function() {
			var hpWorkItems = [];
					
			this.props.projects.forEach(function(project) {
				hpWorkItems.push(<HpWorkItem project={project} />);
			})

			return (
				<div id="workItems">
					{hpWorkItems}
				</div>
			)
		}
	});
	var Intro = React.createClass({
		render: function() {
			return (
				<section id="intro">
                    <div id="intro-text" className="js-fade-text">
                    	<h1>{introText}</h1>
                    </div>
                    <div id="intro-arrow" className="down-arrow"></div>
            	</section>
            )
		}
	});
	var Wrap = React.createClass({
		render: function() {
			return (
				<div data-page='hp' id="wrap">
					<Intro />
					<WorkItems projects={this.props.projects}/>
					<Contact />
				</div>
			)
		}
	});

	var ReactWrap = React.createClass({
		componentDidMount: function() {
			
		},
		render: function() {
			return (
				<div id="reactWrap">
					<MainNav />
					<SideNav projects={this.props.projects} />
					<Wrap projects={this.props.projects} />
				</div>
			)
		}
	})

	React.render( <ReactWrap projects={PROJECTS}/>, document.body);



