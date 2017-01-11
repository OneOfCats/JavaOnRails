package Controllers;
import java.lang.reflect.*;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Paths;

public class ProjectController extends Controller {
	
	public ProjectController(String route, String headers) {
		super(route, headers);
	}
	
	public String index() {
		Object data = getModelData();
		return this.response = generateView("");
	}
}