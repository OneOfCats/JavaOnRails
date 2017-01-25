package Helpers;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class CommonHelpers {
	
	/**
	 * Invokes a method on a target object
	 * @param methodName a name of the method
	 * @param target a target object
	 * @return Object returns a result of the invoked method
	 */
	public static Object invokeMethod(String methodName, Object target) {
		try {
			 Method getModelContents = target.getClass().getMethod(methodName);
			Object data = (Object) getModelContents.invoke(target);
			return data;
		} catch (SecurityException | NoSuchMethodException | IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
        	System.out.println(e);
        }
		return null;
	}
	
	/**
	 * Creates an instance of the specified class
	 * @param className a name of the class
	 * @return Object of this class
	 */
	public static Object createClassInstance(String className) {
		try {
			Class requestedClass = Class.forName(className);
			Constructor requestedConstructor = requestedClass.getConstructor();
			return requestedConstructor.newInstance();
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | SecurityException | NoSuchMethodException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String readFile(String path, Charset encoding) throws IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
}
