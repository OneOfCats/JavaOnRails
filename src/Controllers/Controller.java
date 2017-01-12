package Controllers;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.lang.reflect.*;
import Helpers.CommonHelpers;

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
	
	protected String redirectTo(String action) {
		try {
			Class viewClass;
			viewClass = Class.forName("Views." + getControllerName() + "View");
			Constructor viewConstructor = viewClass.getConstructor(Object.class, String.class);
			this.view = viewConstructor.newInstance(new Object[] { this.modelData, action });
			return getGeneratedView();
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | SecurityException | NoSuchMethodException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return "";
	}
	
	protected Object getModelData() {
		try {
			Object data = (Object) CommonHelpers.invokeMethod("getData", this.model);
			return data;
		} catch (SecurityException | IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	protected Object getModelContents(){
		try {
			Object data = (Object) CommonHelpers.invokeMethod("getModelContents", this.model);
			return data;
		} catch (SecurityException | IllegalArgumentException e) {
        	System.out.println(e);
        }
		return null;
	}
	
	protected void addModelContents(String content) {
		try {
			Object data = (Object) CommonHelpers.invokeMethod("getModelContents", this.model);
		} catch (SecurityException | IllegalArgumentException e) {
        	System.out.println(e);
        }
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
			String page = (String) CommonHelpers.invokeMethod("getGeneratedView", this.view);
			return page;
		} catch (SecurityException | IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
}
