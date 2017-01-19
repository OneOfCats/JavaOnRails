package Models;

import java.util.List;

public class ProjectData {
	public List<ProjectDataItem> projects;
	
	public class ProjectDataItem {
		public String title;
		public String names;
		public String year;
		public String source;
	}
}