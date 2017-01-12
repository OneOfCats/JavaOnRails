package Models;

import java.io.BufferedWriter;
import java.io.FileWriter;
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
			String className = "Models." + getModelName() + "Data";
			this.data = gson.fromJson(contents, Class.forName(className));
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
	
	public boolean save() {
		Gson gson = new Gson();
		String contents = gson.toJson(data);
		writeToModelFile(contents);
		return true;
	}
	
	protected boolean writeToModelFile(String contents) {
		try {
			BufferedWriter bw = new BufferedWriter(new FileWriter("src/Models/" + this.getClass().getSimpleName() + ".json"));
			bw.write(contents);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
}
