package Views;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class View {
	protected String generatedView;
	
	public View(Object content, String currentAction) {
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
	 * This method generates a view, attaching a content and the base layout
	 * @param contents content for a view
	 * @return String generated view
	 */
	public String generateView(String currentAction) {
		try {
			String layout = readFile("src/Views/" + "layout" + ".html", Charset.forName("UTF-8"));
			Method action;
			String page;
			try {
				Class<?> viewClass = this.getClass();
				action = viewClass.getMethod(currentAction);
				page = (String) action.invoke(this);
				this.generatedView = layout.replaceAll("<java-content>", page);
			} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return this.generatedView;
		} catch (IOException e) {
    		System.out.println(e);
    	}
		return "";
	}
	
	public String getGeneratedView() {
		return this.generatedView;
	}
	
	public String getViewName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("View$", "");
	}
	
	protected String wrapInTag(String content, String tag, String className, String idName) {
		return "<" + tag + " class=\"" + className + "\" id=\"" + idName + "\">" + content + "</" + tag + ">";
	}
	
	protected String wrapInTag(String content, String tag, String className) {
		return wrapInTag(content, tag, className, "");
	}
	
	protected String wrapInTag(String content, String tag) {
		return wrapInTag(content, tag, "", "");
	}
	
	protected String p(String content, String className, String idName) {
		return "<p class=\"" + className + "\" id=\"" + idName + "\">" + content + "</p>";
	}
	
	protected String p(String content, String className) {
		return p(content, className, "");
	}
	
	protected String p(String content) {
		return p(content, "", "");
	}
	
	protected String h1(String content, String className, String idName) {
		return "<h1 class=\"" + className + "\" id=\"" + idName + "\">" + content + "</h1>";
	}
	
	protected String h1(String content, String className) {
		return h1(content, className, "");
	}
	
	protected String h1(String content) {
		return h1(content, "", "");
	}
	
	protected String h2(String content, String className, String idName) {
		return "<h2 class=\"" + className + "\" id=\"" + idName + "\">" + content + "</h2>";
	}
	
	protected String h2(String content, String className) {
		return h2(content, className, "");
	}
	
	protected String h2(String content) {
		return h2(content, "", "");
	}
	
	protected String h3(String content, String className, String idName) {
		return "<h3 class=\"" + className + "\" id=\"" + idName + "\">" + content + "</h3>";
	}
	
	protected String h3(String content, String className) {
		return h3(content, className, "");
	}
	
	protected String h3(String content) {
		return h3(content, "", "");
	}
	
	protected String span(String content, String className, String idName) {
		return "<span class=\"" + className + "\" id=\"" + idName + "\">" + content + "</span>";
	}
	
	protected String span(String content, String className) {
		return span(content, className, "");
	}
	
	protected String span(String content) {
		return span(content, "", "");
	}
	
	protected String div(String content, String className, String idName) {
		return "<div class=\"" + className + "\" id=\"" + idName + "\">" + content + "</div>";
	}
	
	protected String div(String content, String className) {
		return div(content, className, "");
	}
	
	protected String div(String content) {
		return div(content, "", "");
	}
	
	protected String br() {
		return "<br>";
	}
	
	protected String input(String type, String name) {
		return "<input type=\"" + type + "\" name=\"" + name + "\">";
	}
	
	protected String a(String href, String content) {
		return "<a href=\"" + href + "\">"  + content + "</a>";
	}
	
	protected String form(String action, String content) {
		return "<form action=\"" + action + "\">"  + content + "</form>";
	}
}
