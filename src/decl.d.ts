import { Subject } from "rxjs";
import { BdwExternalMessage } from "./app/bdw-external-message";

declare global{
    interface Window{
        bdwToken?: string;
        bdwLang?: string;
        bdwData?: any;
        bdwTokenSubject?: Subject<BdwExternalMessage>
    }
}