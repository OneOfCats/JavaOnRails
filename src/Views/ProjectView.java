package Views;

import java.io.IOException;
import java.nio.charset.Charset;

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
						form("/project/add", 
							span("First Name: ") + input("text", "firstName") + br() +
							span("Second Name: ") + input("text", "secondName") + br() +
							span("Project: ") + input("text", "projectTitle") + br() +
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
					span("First Name: ") + span(item.firstName) + br() +
					span("Second Name: ") + span(item.lastName) + br() +
					span("Project: ") + span(item.title) + br() + br()
			);
		}
		
		return result;
	}
	
	public String page03() {
		try {
			return readFile("src/Views/Project/" + "page03" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
}
