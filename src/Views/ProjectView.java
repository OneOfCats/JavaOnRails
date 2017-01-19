package Views;

import java.io.IOException;
import java.nio.charset.Charset;

import Models.ProjectData;
import Models.ProjectData.*;

public class ProjectView extends View {
	public String page;
	public ProjectData content;
	
	/**
	 * Creates new ProjectView object
	 * @param content ProjectData object
	 * @param currentAction is a string with the current action name
	 */
	public ProjectView(Object content, String currentAction) {
		super(content, currentAction);
		this.content = (ProjectData) content;
		generateView(currentAction);
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
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
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String add() {
		this.page = "";
		this.page += 
				h2("Project index page") +
				a("/", "back") +
				div(
						form("/project/add", 
							span("Names: ") + input("text", "names") + br() +
							span("Year: ") + input("text", "year") + br() +
							span("Project: ") + input("text", "title") + br() +
							span("Source: ") + input("text", "source") + br() +
							input("submit", "projectTitle")
						)
				);
		return page;
	}
	
	/**
	 * Parses all projects from ProjectData
	 * @return String with parsed projects in HTML
	 */
	private String loopProjects() {
		String result = "";
		for (ProjectDataItem item : this.content.projects) {
			result += 
			div(
					span("First Name: ") + span(item.names) + br() +
					span("Second Name: ") + span(item.source) + br() +
					span("Second Name: ") + span(item.year) + br() +
					span("Project: ") + span(item.title) + br() + br()
			);
		}
		
		return result;
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page01() {
		try {
			return readFile("src/Views/Project/" + "page01" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page01_2() {
		try {
			return readFile("src/Views/Project/" + "page01-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page02() {
		try {
			return readFile("src/Views/Project/" + "page02" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page03() {
		try {
			return readFile("src/Views/Project/" + "page03" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page03_2() {
		try {
			return readFile("src/Views/Project/" + "page03-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page04() {
		try {
			return readFile("src/Views/Project/" + "page04" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page04_2() {
		try {
			return readFile("src/Views/Project/" + "page04-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page05() {
		try {
			String page = readFile("src/Views/Project/" + "page05" + ".html", Charset.forName("UTF-8"));
			return page.replaceAll("<java-data>", searchResults());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	private String searchResults() {
		String result = "";
		String template = "<java-data-title><java-data-names><java-data-year><java-data-source>";
		try {
			template = readFile("src/Views/Project/" + "page05_lineitem" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < this.content.projects.size(); i++) {
			String inner = template;
			inner = inner.replaceAll("<java-data-title>", a("", this.content.projects.get(i).title));
			inner = inner.replaceAll("<java-data-names>", a("", this.content.projects.get(i).names));
			inner = inner.replaceAll("<java-data-year>", this.content.projects.get(i).year);
			inner = inner.replaceAll("<java-data-source>", a("", this.content.projects.get(i).source));
			inner = inner.replaceAll("<java-data-iteration>", Integer.toString(i + 1));
			result += inner;
		}
		
		return result;
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page06() {
		try {
			return readFile("src/Views/Project/" + "page06" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page07() {
		try {
			return readFile("src/Views/Project/" + "page07" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page07_2() {
		try {
			return readFile("src/Views/Project/" + "page07-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page07_3() {
		try {
			return readFile("src/Views/Project/" + "page07-3" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page08() {
		try {
			return readFile("src/Views/Project/" + "page08" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page08_2() {
		try {
			return readFile("src/Views/Project/" + "page08-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page09() {
		try {
			return readFile("src/Views/Project/" + "page09" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page09_2() {
		try {
			return readFile("src/Views/Project/" + "page09-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page10() {
		try {
			return readFile("src/Views/Project/" + "page10" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	/**
	 * Action method
	 * @return String with a page
	 */
	public String page10_2() {
		try {
			return readFile("src/Views/Project/" + "page10-2" + ".html", Charset.forName("UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}
}
