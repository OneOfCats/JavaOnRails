import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import Controllers.*;

import java.lang.reflect.*;

public class RequestHandler implements Runnable {

    private Socket s;
    private InputStream is;
    private OutputStream os;
    private String method;
    private String routesFile;

    /**
     * RequestHandler constructor
     * @param s socket
     */
    public RequestHandler(Socket s) throws Throwable {
        this.s = s;
        this.is = s.getInputStream();
        this.os = s.getOutputStream();
        this.routesFile = "routes";
    }

    /**
    * This method runs a new stream to response on a request
    */
    public void run() {
        try {
            String headers = readInputHeaders();
            String route = findProperRoute(headers);
            String controller = route.split("=>")[2].split("#")[0];
            String action = route.split("=>")[2].split("#")[1];
            
            Class controllerClass = Class.forName("Controllers." + controller + "Controller");
            Constructor controllerConstructor = controllerClass.getConstructor(String.class, String.class);
            Object controllerInstance = controllerConstructor.newInstance(route, headers);
            
            Method method;
            try {
            	method = controllerInstance.getClass().getMethod(action);
            	String response = (String) method.invoke(controllerInstance);
            	writeResponse(response);
            } catch (SecurityException | NoSuchMethodException | IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
            	System.out.println(e);
            }
        } catch (Throwable e) {
        	System.out.println(e);
        } finally {
            try {
                s.close();
            } catch (Throwable e) {
            	System.out.println(e);
            }
        }
        System.err.println("Client processing finished");
    }
    
    /**
     * This method makes a response to a user
     * @param s a response content
     */
    private void writeResponse(String s) throws Throwable {
        String response = "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html\r\n" +
                "Content-Length: " + s.length() + "\r\n" +
                "Connection: close\r\n\r\n";
        String result = response + s;
        os.write(result.getBytes());
        os.flush();
    }
    
    /**
    * This method reads a headers from an HTTP request
    * @return String returns all headers in one string
    */
    private String readInputHeaders() throws Throwable {
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String var = "";
        this.method = "GET";
    	try{
            while(true) {
                String s = br.readLine();
                System.out.println(s);
                var += s + "\n";
                if(s == null || s.trim().length() == 0) {
                    break;
                }
            }
    	}
    	catch(Exception e){ 
    		System.err.println("Headers cannot be read"); 
    	}
    	if(var.substring(0, 4).equals("POST")){
    		this.method = "POST";
    	}
    	return var;
    }
    
    /**
    * This method is used for getting a route string from header.
    * If a route in a header is empty, this method will return a route to root
    * @param headers HTTP request header
    * @return String returns a route string
    */
    private String getRouteString(String headers) {
    	String route = headers.split(" ")[1];
    	route = route.replaceAll("^/+", "").replaceAll("/+$", "");
    	if(route.length() == 0){
    		route = "root";
    	}
    	return route;
    }

    /**
    * This method is used to find the required route from the routes list for a request
    * @param headers HTTP request header
    * @return String returns a route from the routes list (file routes)
    */
    private String findProperRoute(String headers) {
    	String routeString = getRouteString(headers);
    	try {
    		List<String> lines = Files.readAllLines(Paths.get("src/" + this.routesFile), Charset.forName("UTF-8"));
        	for (String line : lines) {
        		String[] routeParts = line.split("=>");
        		if(!routeParts[1].equals(this.method)) continue;
        		if(routeString.matches(routeParts[0])) return line;
        	}
    	} catch (IOException e) {
    		System.out.println(e);
    	}
    	return findProperRoute("GET root");
    }
}