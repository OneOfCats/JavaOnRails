package Views;

import Models.ProjectData;
import Models.ProjectData.*;

public class ProjectView extends View {
	public String page;
	public ProjectData content;
	
	public ProjectView(Object content, String currentAction) {
		super(content, currentAction);
		this.content = (ProjectData) content;
		generateView(currentAction);
	}
	
	public String index() {
		this.page = "";
		this.page += 
				h2("Project index page") +
				a("/project/add", "add project") +
				div(
						loopProjects()
				);
		return page;
	}
	
	public String add() {
		this.page = "";
		this.page += 
				h2("Project index page") +
				a("/", "back") +
				div(
						form("/project/new", 
							span("Имя: ") + input("text", "firstName") + br() +
							span("Фамилия: ") + input("text", "secondName") + br() +
							span("Тема: ") + input("text", "projectTitle") + br() +
							input("submit", "projectTitle")
						)
				);
		return page;
	}
	
	private String loopProjects() {
		String result = "";
		for (ProjectDataItem item : this.content.projects) {
			result += 
			div(
					span("Имя: ") + span(item.firstName) + br() +
					span("Фамилия: ") + span(item.lastName) + br() +
					span("Тема: ") + span(item.title) + br() + br()
			);
		}
		
		return result;
	}
}
