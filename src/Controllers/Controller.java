package Controllers;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.lang.reflect.*;

public class Controller {
	protected String currentAction;
	protected String route;
	protected String response;
	protected String headers;
	protected Object model;
	
	/**
	 * Controller constructor
	 * @param route proper route from the routes file
	 * @param headers headers from a request
	 */
	public Controller(String route, String headers) {
		this.route = route;
		this.headers = headers;
		this.currentAction = route.split("=>")[2].split("#")[1];

		try {
			Class modelClass;
			modelClass = Class.forName("Models." + getControllerName() + "Model");
			Constructor modelConstructor = modelClass.getConstructor();
			this.model = modelConstructor.newInstance();
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | SecurityException | NoSuchMethodException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	protected Object getModelData() {
		try {
			Method getData = this.model.getClass().getMethod("getData");
			Object data = (Object) getData.invoke(this.model);
			return data;
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	protected Object getModelContents(){
		try {
			Method getModelContents;
			getModelContents = this.model.getClass().getMethod("getModelContents");
			Object data = (Object) getModelContents.invoke(this.model);
			return data;
		} catch (SecurityException | NoSuchMethodException | IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
        	System.out.println(e);
        }
		return null;
	}
	
	/**
	 * This method reads a file
	 * @param path path to a file
	 * @param encoding encoding of a file
	 * @return String string with a content from a file
	 */
	public String readFile(String path, Charset encoding) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	/**
	 * This method returns a controller name
	 * @return String controller name
	 */
	public String getControllerName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("Controller$", "");
	}
	
	/**
	 * This method generates a view, attaching a content and the base layout
	 * @param contents content for a view
	 * @return String generated view
	 */
	public String generateView(String contents) {
		try {
			String layout = readFile("src/Views/" + "layout" + ".html", Charset.forName("UTF-8"));
			String file = readFile("src/Views/" + getControllerName() + "/" + this.currentAction + ".html", Charset.forName("UTF-8"));
			String page = layout.replaceAll("<java-content>", file);
			return page;
		} catch (IOException e) {
    		System.out.println(e);
    	}
		return "";
	}
}
