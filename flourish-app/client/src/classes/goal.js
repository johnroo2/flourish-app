import Subgoal from "./subgoal";

export default class Goal{
    constructor(title="", from="", streak="", iden_goal=0, subgoals=[]){
        this.title= title;
        this.from = from;
        this.current = 0;
        this.streak = streak;
        this.subgoals = subgoals;

        this.iden_goal = iden_goal;
    }

    static stringify(goal){
        return JSON.stringify({title:goal.title, from:goal.from, current:goal.current, 
            streak:goal.streak, iden_goal: goal.iden_goal,
            subgoals:goal.subgoals.map((item, key) => {return Subgoal.stringify(item)})});
    }

    static reverseStringify(data){
        let parsedData = JSON.parse(data);
        return new Goal(parsedData.title, parsedData.from, parsedData.streak,
            parsedData.iden_goal, parsedData.subgoals?
            parsedData.subgoals.map((item, key) => {
                return Subgoal.reverseStringify(item)}):[]);
    }
}