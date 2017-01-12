package Helpers;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class CommonHelpers {
	
	/**
	 * Invokes a method on a target object
	 * @param methodName a name of the method
	 * @param target a target object
	 * @return Object returns a result of the invoked method
	 */
	public static Object invokeMethod(String methodName, Object target) {
		try {
			Method getModelContents;
			getModelContents = target.getClass().getMethod(methodName);
			Object data = (Object) getModelContents.invoke(target);
			return data;
		} catch (SecurityException | NoSuchMethodException | IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
        	System.out.println(e);
        }
		return null;
	}
}
