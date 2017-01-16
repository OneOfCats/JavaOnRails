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
		this.projectModel.addProject(this.postData[2][1], this.postData[0][1], this.postData[1][1]);
		this.projectModel.save();
		return this.response = redirectTo("index");
	}
	
	public String page03() {
		return this.response = getGeneratedView();
	}
	
	public String page03post() {
		for(String[] data : this.postData) {
			System.out.println(data[0] + ": " + data[1] + '\n');
		}
		return this.response = redirectTo("page03");
	}
}