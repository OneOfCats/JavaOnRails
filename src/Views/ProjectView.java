package Views;

public class ProjectView extends View {
	public String page;
	
	public ProjectView(Object content, String currentAction) {
		super(content, currentAction);
	}
	
	protected String index() {
		this.page = "";
		this.page += 
				h2("Project index page") +
				div(
					span("bla-bla")
					)
				;
		return page;
	}
}
