package Controllers;
import Models.ProjectData;
import Models.ProjectModel;

public class ProjectController extends Controller {
	private ProjectModel projectModel;
	private ProjectData projectData;
	
	public ProjectController(String route, String headers) {
		super(route, headers);
		//this.model = (ProjectModel) this.model;
		this.projectModel = (ProjectModel) this.model;
		this.projectData = (ProjectData) this.modelData;
	}
	
	public String index() {
		return this.response = getGeneratedView();
	}
	
	public String add() {
		return this.response = getGeneratedView();
	}
	
	public String create() {
		this.projectModel.addProject("blabla", "asdasd", "fgrg");
		this.projectModel.save();
		return this.response = redirectTo("index");
	}
}