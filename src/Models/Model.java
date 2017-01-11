package Models;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.google.gson.*;

public class Model {
	public Object data;
	
	public Model() {
		Gson gson = new Gson();
		String contents = getModelFile();
		try {
			this.data = gson.fromJson(contents, Class.forName("Models." + getModelName() + "Data"));
		} catch (JsonSyntaxException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	protected String getModelFile() {
		try {
			String json = readFile("src/Models/" + this.getClass().getSimpleName() + ".json", Charset.forName("UTF-8"));
			return json;
		} catch (IOException e) {
    		System.out.println(e);
    	}
		return "";
	}
	
	private String getModelName() {
		String className = this.getClass().getSimpleName();
		return className.replaceAll("Model$", "");
	}
	
	public String readFile(String path, Charset encoding) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	public Object getData() {
		return this.data;
	}
}
