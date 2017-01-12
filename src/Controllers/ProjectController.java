package Controllers;
import Models.ProjectData;

public class ProjectController extends Controller {
	
	public ProjectController(String route, String headers) {
		super(route, headers);
		this.modelData = (ProjectData) this.modelData;
	}
	
	public String index() {
		return this.response = getGeneratedView();
	}
	
	public String add() {
		return this.response = getGeneratedView();
	}
	
	public String create() {
		return this.response = redirectTo("index");
	}
}