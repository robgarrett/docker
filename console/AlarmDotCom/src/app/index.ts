import Config from "./config";

abstract class App {
    public static main() {
        console.log("Hello World! " + Config.Instance.Username);
    }
}

App.main();
