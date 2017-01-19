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
	public boolean addProject(String title, String names, String year, String source) {
		ProjectData.ProjectDataItem pdi = this.modelData.new ProjectDataItem();
		pdi.title = title;
		pdi.names = names;
		pdi.year = year;
		pdi.source = source;
		return this.modelData.projects.add(pdi);
	}
	
}