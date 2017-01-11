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
	protected Object view;
	protected Object modelData;
	
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
			this.modelData = getModelData();
			
			Class viewClass;
			viewClass = Class.forName("Views." + getControllerName() + "View");
			Constructor viewConstructor = viewClass.getConstructor(Object.class, String.class);
			this.view = viewConstructor.newInstance(new Object[] { this.modelData, this.currentAction });
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
	 * This method returns a controller name
	 * @return String controller name
	 */
	public String getControllerName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("Controller$", "");
	}
	
	protected String getGeneratedView() {
		try {
			Method getGeneratedViewMethod = this.view.getClass().getMethod("getGeneratedView");
			String page = (String) getGeneratedViewMethod.invoke(this.model);
			return page;
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
}
