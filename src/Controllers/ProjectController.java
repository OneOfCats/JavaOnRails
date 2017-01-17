package Controllers;
import Models.ProjectData;
import Models.ProjectModel;

public class ProjectController extends Controller {
	private ProjectModel projectModel;
	private ProjectData projectData;
	
	/**
	 * Creates a new ProjectController
	 * @param route String with the current route
	 * @param headers String HTTP headers
	 */
	public ProjectController(String route, String headers) {
		super(route, headers);
		//this.model = (ProjectModel) this.model;
		this.projectModel = (ProjectModel) this.model;
		this.projectData = (ProjectData) this.modelData;
	}
	
	/**
	 * Writes a POST data to a console
	 */
	public void postDataToConsole() {
		for(String[] data : this.postData) {
			System.out.println(data[0] + ": " + data[1] + '\n');
		}
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String index() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String add() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String create() {
		this.projectModel.addProject(this.postData[2][1], this.postData[0][1], this.postData[1][1]);
		this.projectModel.save();
		return this.response = redirectTo("index");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page01() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page01post() {
		postDataToConsole();
		return this.response = redirectTo("page01");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page01_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page01_2post() {
		postDataToConsole();
		return this.response = redirectTo("page01_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page02() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page02post() {
		postDataToConsole();
		return this.response = redirectTo("page02");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page03() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page03post() {
		postDataToConsole();
		return this.response = redirectTo("page03");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page03_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page03_2post() {
		postDataToConsole();
		return this.response = redirectTo("page03_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page04() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page04post() {
		postDataToConsole();
		return this.response = redirectTo("page04");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page04_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page04_2post() {
		postDataToConsole();
		return this.response = redirectTo("page04_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page05() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page05post() {
		postDataToConsole();
		return this.response = redirectTo("page05");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page06() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page06post() {
		postDataToConsole();
		return this.response = redirectTo("page06");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07post() {
		postDataToConsole();
		return this.response = redirectTo("page07");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07_2post() {
		postDataToConsole();
		return this.response = redirectTo("page07_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07_3() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page07_3post() {
		postDataToConsole();
		return this.response = redirectTo("page07_3");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page08() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page08post() {
		postDataToConsole();
		return this.response = redirectTo("page08");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page08_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page08_2post() {
		postDataToConsole();
		return this.response = redirectTo("page08_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page09() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page09post() {
		postDataToConsole();
		return this.response = redirectTo("page09");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page09_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page09_2post() {
		postDataToConsole();
		return this.response = redirectTo("page09_2");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page10() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page10post() {
		postDataToConsole();
		return this.response = redirectTo("page10");
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page10_2() {
		return this.response = getGeneratedView();
	}
	
	/**
	 * Action method
	 * @return String with a generated view
	 */
	public String page10_2post() {
		postDataToConsole();
		return this.response = redirectTo("page10_2");
	}
}