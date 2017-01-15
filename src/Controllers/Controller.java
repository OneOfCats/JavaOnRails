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
	protected String[][] postData;
	
	/**
	 * Controller constructor
	 * @param route proper route from the routes file
	 * @param headers headers from a request
	 */
	public Controller(String route, String headers) {
		this.route = route;
		this.headers = headers;
		this.currentAction = route.split("=>")[2].split("#")[1];
		if(this.route.split("=>")[1].equals("POST")) this.postData = getPostInputData();

		this.model = CommonHelpers.createClassInstance("Models." + getControllerName() + "Model");
		this.modelData = getModelData();
		
		initializeView(this.currentAction);
	}
	
	/**
	 * Redirects a user to a specified action page
	 * @param action for a view
	 * @return String text of an HTML page
	 */
	protected String redirectTo(String action) {
		initializeView(action);
		return getGeneratedView();
	}
	
	/**
	 * Builds a view page string and saves it to a controller object
	 * @param action for a view
	 */
	private void initializeView(String action) {
		try {
			Class viewClass = Class.forName("Views." + getControllerName() + "View");
			Constructor viewConstructor = viewClass.getConstructor(Object.class, String.class);
			this.view = viewConstructor.newInstance(new Object[] { this.modelData, action });
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | SecurityException | NoSuchMethodException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Gets model content
	 * @return Object ModelData object
	 */
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
	
	/*
	protected Object getModelContents(){
		try {
			Object data = (Object) CommonHelpers.invokeMethod("getModelContents", this.model);
			return data;
		} catch (SecurityException | IllegalArgumentException e) {
        	System.out.println(e);
        }
		return null;
	}
	*/
	
	/*
	protected void addModelContents(String content) {
		try {
			Object data = (Object) CommonHelpers.invokeMethod("getModelContents", this.model);
		} catch (SecurityException | IllegalArgumentException e) {
        	System.out.println(e);
        }
	}
	*/
	
	/**
	 * This method returns a controller name
	 * @return String controller name
	 */
	public String getControllerName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("Controller$", "");
	}
	
	/**
	 * Invokes an action method for the current view
	 * @return String HTML page
	 */
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
	
	/**
	 * Parses POST data into an array
	 * @return String[][] array of post data (key - value)
	 */
	public String[][] getPostInputData() {
		int space = this.headers.indexOf("\n\n") + 2;
		String[] body = this.headers.substring(space).split("&");
		String[][] fracturedBody = new String[body.length - 1][2];
		for (int i = 0; i < body.length - 1; i++) {
			fracturedBody[i][0] = body[i].split("=")[0];
			fracturedBody[i][1] = body[i].split("=")[1];
		}
		return fracturedBody;
	}
}
