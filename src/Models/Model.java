package Models;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.gson.*;

public class Model {
	public Object data;
	
	/**
	 * Creates a Model
	 */
	public Model() {
		Gson gson = new Gson();
		String contents = getModelFile();
		try {
			String className = "Models." + getModelName() + "Data";
			this.data = gson.fromJson(contents, Class.forName(className));
		} catch (JsonSyntaxException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Gets a JSON file with a content for a current model
	 * @return String JSON file with a content
	 */
	protected String getModelFile() {
		try {
			String json = readFile("src/Models/" + this.getClass().getSimpleName() + ".json", Charset.forName("UTF-8"));
			return json;
		} catch (IOException e) {
    		System.out.println(e);
    	}
		return "";
	}
	
	/**
	 * Generates this model's name
	 * @return String model name
	 */
	private String getModelName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("Model$", "");
	}
	
	/**
	 * Reads a requested file
	 * @param path String path to a file
	 * @param encoding Charset of the file
	 * @return String requested file in a string
	 */
	public String readFile(String path, Charset encoding) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	/**
	 * Data getter
	 * @return Object model Data
	 */
	public Object getData() {
		return this.data;
	}
	
	/**
	 * Saves current model state to a database (JSON)
	 * @return boolean a result of saving
	 */
	public boolean save() {
		Gson gson = new Gson();
		String contents = gson.toJson(data);
		return writeToModelFile(contents);
	}
	
	/**
	 * Writes a data to a model file
	 * @param contents String with a data
	 * @return boolean result of writing
	 */
	protected boolean writeToModelFile(String contents) {
		try {
			File json = new File("src/Models/" + this.getClass().getSimpleName() + ".json");
			FileWriter writer = new FileWriter(json);
			writer.write(contents);
			writer.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
}
