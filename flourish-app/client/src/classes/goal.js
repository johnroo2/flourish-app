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

    static sortSubs(goal, method){
        goal.subgoals.sort(Subgoal.getComparator(method));
    }

    static streakmapping(goal){
        let mapping = {"Days":"Daily", "Weeks":"Weekly", "Months":"Monthly"};
        return mapping[goal.streak];
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

    static getReverseSubgoals(goal){
        let out = [];
        for(let i = goal.subgoals.length-1; i >= 0; i--){
            out.push(goal.subgoals[i]);
        }
        return out;
    }
}