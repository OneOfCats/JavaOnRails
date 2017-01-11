import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by year 09.09.2009
 */
public class HttpServer {

    public static void main(String[] args) throws Throwable {
        ServerSocket ss = new ServerSocket(8080);
        while (true) {
            Socket s = ss.accept();
            System.err.println("Client accepted");
            new Thread(new RequestHandler(s)).start();
        }
    }

}