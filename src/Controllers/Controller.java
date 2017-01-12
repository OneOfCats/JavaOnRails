package Controllers;
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

		this.model = CommonHelpers.createClassInstance("Models." + getControllerName() + "Model");
		this.modelData = getModelData();
		
		initializeView(this.currentAction);
	}
	
	protected String redirectTo(String action) {
		initializeView(action);
		return getGeneratedView();
	}
	
	private void initializeView(String action) {
		try {
			Class viewClass = Class.forName("Views." + getControllerName() + "View");
			Constructor viewConstructor = viewClass.getConstructor(Object.class, String.class);
			this.view = viewConstructor.newInstance(new Object[] { this.modelData, action });
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | SecurityException | NoSuchMethodException | ClassNotFoundException e) {
			e.printStackTrace();
		}
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
