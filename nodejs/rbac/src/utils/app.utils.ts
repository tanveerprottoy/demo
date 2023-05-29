import { RouteNames } from "./constants";
import StringUtils from "./string.utils";

export default class AppUtils {

    static getRouteName(path: string, method: string): string {
        try {
            const keys = StringUtils.split(path, "/");
            let key = `${keys[keys.length - 1]}.${method}`;
            // fetch route name for key
            let name = RouteNames[key];
            if(!name) {
                // try again with the previous value
                // if succeeds consider this as a
                // path param endpoint, add p to the key
                key = `${keys[keys.length - 2]}.p.${method}`;
                console.log(key)
                name = RouteNames[key];
            }
            return name;
        }
        catch(e) {
            return null;
        }
    }
}