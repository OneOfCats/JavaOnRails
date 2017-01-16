package Models;

public class ProjectModel extends Model {
	public ProjectData modelData;
	
	public ProjectModel() {
		super();
		this.modelData = (ProjectData) this.data;
	}
	
	public boolean addProject(String title, String firstName, String lastName) {
		ProjectData.ProjectDataItem pdi = this.modelData.new ProjectDataItem();
		pdi.title = title;
		pdi.firstName = firstName;
		pdi.lastName = lastName;
		return this.modelData.projects.add(pdi);
	}
	
}