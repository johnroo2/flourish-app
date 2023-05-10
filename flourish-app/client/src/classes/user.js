import Goal from "./goal";

export default class User{
    constructor(username="", password="", firstname="", lastname="", goals=[], goalcount=0, subgoalcount=0){
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;

        this.goals = goals;
        this.goalcount = goalcount;
        this.subgoalcount = subgoalcount; 
    }

    static stringify(user){
        return JSON.stringify({username:user.username, password:user.password,
            firstname:user.firstname, lastname:user.lastname, goalcount:user.goalcount,
            subgoalcount: user.subgoalcount,
            goals:user.goals.map((item, key) => {
                return Goal.stringify(item)
            })
        })
    }

    static reverseStringify(data){
        let parsedData = JSON.parse(data);
        return new User(parsedData.username, parsedData.password, 
            parsedData.firstname, parsedData.lastname, parsedData.goals?
            parsedData.goals.map((item, key) => {
                return Goal.reverseStringify(item)}):[],
            parsedData.goalcount, parsedData.subgoalcount);
    }
    
    static getReverseGoals(user){
        let out = [];
        for(let i = user.goals.length-1; i >= 0; i--){
            out.push(user.goals[i]);
        }
        return out;
    }
}