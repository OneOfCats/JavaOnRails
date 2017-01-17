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
	
	public String page01() {
		try {
			return readFile("src/Views/Project/" + "page01" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page01_2() {
		try {
			return readFile("src/Views/Project/" + "page01-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page02() {
		try {
			return readFile("src/Views/Project/" + "page02" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page03() {
		try {
			return readFile("src/Views/Project/" + "page03" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page03_2() {
		try {
			return readFile("src/Views/Project/" + "page03-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page04() {
		try {
			return readFile("src/Views/Project/" + "page04" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page04_2() {
		try {
			return readFile("src/Views/Project/" + "page04-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page05() {
		try {
			return readFile("src/Views/Project/" + "page05" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page06() {
		try {
			return readFile("src/Views/Project/" + "page06" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page07() {
		try {
			return readFile("src/Views/Project/" + "page07" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page07_2() {
		try {
			return readFile("src/Views/Project/" + "page07-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page07_3() {
		try {
			return readFile("src/Views/Project/" + "page07-3" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page08() {
		try {
			return readFile("src/Views/Project/" + "page08" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page08_2() {
		try {
			return readFile("src/Views/Project/" + "page08-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page09() {
		try {
			return readFile("src/Views/Project/" + "page09" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page09_2() {
		try {
			return readFile("src/Views/Project/" + "page09-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page10() {
		try {
			return readFile("src/Views/Project/" + "page10" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	public String page10_2() {
		try {
			return readFile("src/Views/Project/" + "page10-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
}
