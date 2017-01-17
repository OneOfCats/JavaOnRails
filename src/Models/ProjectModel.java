package Models;

public class ProjectModel extends Model {
	public ProjectData modelData;
	
	/**
	 * Creates a ProjectModel
	 */
	public ProjectModel() {
		super();
		this.modelData = (ProjectData) this.data;
	}
	
	/**
	 * Creates a new record for ProjectData
	 * @param title String with a title
	 * @param firstName String with a first name
	 * @param lastName String with a last name
	 * @return boolean a result of adding the record to the ProjectData
	 */
	public boolean addProject(String title, String firstName, String lastName) {
		ProjectData.ProjectDataItem pdi = this.modelData.new ProjectDataItem();
		pdi.title = title;
		pdi.firstName = firstName;
		pdi.lastName = lastName;
		return this.modelData.projects.add(pdi);
	}
	
}