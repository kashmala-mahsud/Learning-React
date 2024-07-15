import { User as User1 } from "../components/home/User";
import { Button } from "../components/ui/Button";
import { User as User2} from "../components/user/User";
const UserData={
    id: 1,
    name: "Steve Waugh",
    roll: "Software Engineer",
    age: 21
};
export function HomePage() {
    return(
        <div>
            <User1 Data={UserData}/>
            <Button>MUI Button</Button>
            <User2 />
        </div>
    )
}